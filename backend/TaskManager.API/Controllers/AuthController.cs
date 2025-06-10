using Microsoft.AspNetCore.Mvc;
using TaskManager.API.DTOs;
using TaskManager.API.Services;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IAuthService _authService;
        private readonly ILogger<AuthController> _logger;

        public AuthController(IAuthService authService, ILogger<AuthController> logger)
        {
            _authService = authService;
            _logger = logger;
        }

        [HttpPost("signup")]
        public async Task<IActionResult> Register([FromBody] RegisterDto registerDto)
        {
            try
            {
                _logger.LogInformation($"Registration attempt for email: {registerDto.Email}");
                
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning($"Invalid model state for registration: {registerDto.Email}");
                    return BadRequest(ModelState);
                }

                var token = await _authService.RegisterAsync(registerDto);
                
                if (token == null)
                {
                    _logger.LogWarning($"Registration failed - email already exists: {registerDto.Email}");
                    return BadRequest(new { message = "Email already exists" });
                }

                _logger.LogInformation($"Registration successful for email: {registerDto.Email}");
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Registration error for email: {registerDto.Email}");
                return StatusCode(500, new { message = "An error occurred during registration" });
            }
        }

        [HttpPost("signin")]
        public async Task<IActionResult> Login([FromBody] LoginDto loginDto)
        {
            try
            {
                _logger.LogInformation($"Login attempt for email: {loginDto.Email}");
                
                if (!ModelState.IsValid)
                {
                    _logger.LogWarning($"Invalid model state for login: {loginDto.Email}");
                    return BadRequest(ModelState);
                }

                var token = await _authService.LoginAsync(loginDto);
                
                if (token == null)
                {
                    _logger.LogWarning($"Login failed - invalid credentials: {loginDto.Email}");
                    return Unauthorized(new { message = "Invalid credentials" });
                }

                _logger.LogInformation($"Login successful for email: {loginDto.Email}");
                return Ok(new { token });
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Login error for email: {loginDto.Email}");
                return StatusCode(500, new { message = "An error occurred during login" });
            }
        }

        [HttpPost("signout")]
        public IActionResult Logout()
        {
            // For stateless JWT, logout is handled client-side
            return Ok(new { message = "Logged out successfully" });
        }
    }
}