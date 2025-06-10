using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;
using TaskManager.API.Data;
using TaskManager.API.Services;
using TaskManager.API.Middleware;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// Configure the database connection.
// It uses the connection string from appsettings.json or environment variables.
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// Register custom services for dependency injection.
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITaskService, TaskService>();

// Configure JWT Authentication.
builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
    .AddJwtBearer(options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(Encoding.ASCII.GetBytes(builder.Configuration["Jwt:Secret"]!)),
            ValidateIssuer = false, // Not validating the issuer
            ValidateAudience = false, // Not validating the audience
            ClockSkew = TimeSpan.Zero // No tolerance for token expiration
        };
    });

// Configure Cross-Origin Resource Sharing (CORS) to allow the frontend to communicate with the backend.
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowFrontend",
        policy =>
        {
            // Allow requests from the frontend development server.
            policy.WithOrigins("http://localhost:3000", "http://localhost:3001")
                  .AllowAnyHeader()
                  .AllowAnyMethod()
                  .AllowCredentials();
        });
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    // Enable Swagger for API documentation in development.
    app.UseSwagger();
    app.UseSwaggerUI();
    // Use a more detailed exception page in development.
    app.UseDeveloperExceptionPage();
}

// Apply the CORS policy.
app.UseCors("AllowFrontend");

// Enable authentication and authorization.
app.UseAuthentication();
app.UseMiddleware<JwtMiddleware>(); // Custom middleware to handle JWT user extraction
app.UseAuthorization();

// Map controller routes.
app.MapControllers();

// Initialize the database.
// This function handles database creation and migrations.
InitializeDatabase(app);

// Run the application.
app.Run();


// --- Helper Function for Database Initialization ---

void InitializeDatabase(IApplicationBuilder app)
{
    // Create a new scope to resolve services
    using (var scope = app.ApplicationServices.CreateScope())
    {
        var services = scope.ServiceProvider;
        try
        {
            var context = services.GetRequiredService<AppDbContext>();
            var logger = services.GetRequiredService<ILogger<Program>>();

            // In a production environment, you would typically use migrations.
            // For this project, we ensure the database is created.
            
            // This will create the database and schema if they don't exist.
            // It will NOT delete the database if it already exists, thus preserving data.
            if (context.Database.EnsureCreated())
            {
                logger.LogInformation("Database created successfully.");
            }
            else
            {
                logger.LogInformation("Database already exists. No action taken.");
            }
        }
        catch (Exception ex)
        {
            var logger = services.GetRequiredService<ILogger<Program>>();
            logger.LogError(ex, "An error occurred while initializing the database.");
            throw; // Re-throw to fail fast if the database can't be set up.
        }
    }
}