using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManager.API.Data;
using TaskManager.API.Services;
using TaskManager.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Database with retry policy
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection"), 
        npgsqlOptions => npgsqlOptions.EnableRetryOnFailure(
            maxRetryCount: 5,
            maxRetryDelay: TimeSpan.FromSeconds(30),
            errorCodesToAdd: null)));

// Services
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITaskService, TaskService>();

// JWT Authentication
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidateIssuer = false,
            ValidateAudience = false,
            ClockSkew = TimeSpan.Zero
        };
    });

// CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// Configure pipeline
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
    app.UseDeveloperExceptionPage();
}

app.UseCors("AllowFrontend");
app.UseAuthentication();
app.UseMiddleware<JwtMiddleware>();
app.UseAuthorization();
app.MapControllers();

// Database initialization with proper error handling and retry logic
await InitializeDatabaseAsync(app);

app.Run();

static async Task InitializeDatabaseAsync(WebApplication app)
{
    using var scope = app.Services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<AppDbContext>();
    var logger = scope.ServiceProvider.GetRequiredService<ILogger<Program>>();
    var configuration = scope.ServiceProvider.GetRequiredService<IConfiguration>();
    
    // Check if we should reset the database (only in development and when explicitly configured)
    bool shouldResetDatabase = app.Environment.IsDevelopment() && 
                              configuration.GetValue<bool>("Database:ResetOnStartup", false);
    
    var maxRetries = 30;
    var retryDelay = TimeSpan.FromSeconds(2);
    
    for (int attempt = 1; attempt <= maxRetries; attempt++)
    {
        try
        {
            logger.LogInformation($"Database connection attempt {attempt}/{maxRetries}...");
            
            // Test database connection
            await context.Database.CanConnectAsync();
            logger.LogInformation("Database connection successful!");
            
            if (shouldResetDatabase)
            {
                logger.LogWarning("Database reset is enabled. Deleting and recreating database...");
                await context.Database.EnsureDeletedAsync();
                await context.Database.EnsureCreatedAsync();
                logger.LogInformation("Database recreated successfully");
            }
            else
            {
                // Use migrations for production-ready approach
                if (context.Database.IsRelational())
                {
                    // Check if there are any pending migrations
                    var pendingMigrations = await context.Database.GetPendingMigrationsAsync();
                    if (pendingMigrations.Any())
                    {
                        logger.LogInformation($"Found {pendingMigrations.Count()} pending migrations. Applying...");
                        await context.Database.MigrateAsync();
                        logger.LogInformation("Migrations applied successfully");
                    }
                    else
                    {
                        // If no migrations exist, ensure the database is created
                        var created = await context.Database.EnsureCreatedAsync();
                        if (created)
                        {
                            logger.LogInformation("Database created successfully");
                        }
                        else
                        {
                            logger.LogInformation("Database already exists");
                        }
                    }
                }
            }
            
            // Verify tables exist
            if (context.Database.IsRelational())
            {
                var connection = context.Database.GetDbConnection();
                await connection.OpenAsync();
                
                using var command = connection.CreateCommand();
                command.CommandText = "SELECT table_name FROM information_schema.tables WHERE table_schema = 'public'";
                using var reader = await command.ExecuteReaderAsync();
                
                var tables = new List<string>();
                while (await reader.ReadAsync())
                {
                    tables.Add(reader.GetString(0));
                }
                
                logger.LogInformation($"Available tables: {string.Join(", ", tables)}");
                
                // Verify required tables exist
                var requiredTables = new[] { "Users", "Tasks" };
                var missingTables = requiredTables.Where(t => !tables.Any(existing => 
                    string.Equals(existing, t, StringComparison.OrdinalIgnoreCase))).ToList();
                
                if (missingTables.Any())
                {
                    logger.LogWarning($"Missing required tables: {string.Join(", ", missingTables)}");
                    
                    // If tables are missing and we're not resetting, try to create them
                    if (!shouldResetDatabase)
                    {
                        logger.LogInformation("Attempting to create missing tables...");
                        await context.Database.EnsureCreatedAsync();
                    }
                }
            }
            
            return; // Success - exit the retry loop
        }
        catch (Exception ex)
        {
            logger.LogWarning($"Database connection attempt {attempt}/{maxRetries} failed: {ex.Message}");
            
            if (attempt == maxRetries)
            {
                logger.LogError(ex, "Failed to connect to database after {MaxRetries} attempts", maxRetries);
                throw new InvalidOperationException($"Could not connect to database after {maxRetries} attempts", ex);
            }
            
            logger.LogInformation($"Retrying in {retryDelay.TotalSeconds} seconds...");
            await Task.Delay(retryDelay);
        }
    }
}
app.Run();