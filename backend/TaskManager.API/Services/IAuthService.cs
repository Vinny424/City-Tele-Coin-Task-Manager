using TaskManager.API.DTOs;

namespace TaskManager.API.Services
{
    public interface IAuthService
    {
        Task<string?> RegisterAsync(RegisterDto registerDto);
        Task<string?> LoginAsync(LoginDto loginDto);
        Task<int?> GetUserIdFromTokenAsync(string token);
    }
}