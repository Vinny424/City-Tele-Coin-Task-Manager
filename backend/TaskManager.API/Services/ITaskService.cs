using TaskManager.API.DTOs;

namespace TaskManager.API.Services
{
    public interface ITaskService
    {
        Task<IEnumerable<TaskDto>> GetTasksAsync(int userId, string? category = null);
        Task<TaskDto?> GetTaskByIdAsync(int taskId, int userId);
        Task<TaskDto> CreateTaskAsync(CreateTaskDto createTaskDto, int userId);
        Task<TaskDto?> UpdateTaskAsync(int taskId, CreateTaskDto updateTaskDto, int userId);
        Task<bool> DeleteTaskAsync(int taskId, int userId);
    }
}