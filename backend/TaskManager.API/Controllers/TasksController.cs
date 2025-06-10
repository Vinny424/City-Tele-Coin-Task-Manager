using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Authorization;
using TaskManager.API.DTOs;
using TaskManager.API.Services;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    [Authorize] // This ensures all endpoints require authentication
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;
        private readonly ILogger<TasksController> _logger;

        public TasksController(ITaskService taskService, ILogger<TasksController> logger)
        {
            _taskService = taskService;
            _logger = logger;
        }

        private int? GetUserId()
        {
            return HttpContext.Items["UserId"] as int?;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] string? category = null)
        {
            try
            {
                var userId = GetUserId();
                if (userId == null)
                {
                    _logger.LogWarning("Unauthorized access attempt to GetTasks");
                    return Unauthorized();
                }

                var tasks = await _taskService.GetTasksAsync(userId.Value, category);
                return Ok(tasks);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error retrieving tasks");
                return StatusCode(500, new { message = "An error occurred while retrieving tasks" });
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            try
            {
                var userId = GetUserId();
                if (userId == null)
                {
                    _logger.LogWarning($"Unauthorized access attempt to GetTask {id}");
                    return Unauthorized();
                }

                var task = await _taskService.GetTaskByIdAsync(id, userId.Value);
                
                if (task == null)
                    return NotFound();

                return Ok(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error retrieving task {id}");
                return StatusCode(500, new { message = "An error occurred while retrieving the task" });
            }
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            try
            {
                var userId = GetUserId();
                if (userId == null)
                {
                    _logger.LogWarning("Unauthorized access attempt to CreateTask");
                    return Unauthorized();
                }

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var task = await _taskService.CreateTaskAsync(createTaskDto, userId.Value);
                return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Error creating task");
                return StatusCode(500, new { message = "An error occurred while creating the task" });
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] CreateTaskDto updateTaskDto)
        {
            try
            {
                var userId = GetUserId();
                if (userId == null)
                {
                    _logger.LogWarning($"Unauthorized access attempt to UpdateTask {id}");
                    return Unauthorized();
                }

                if (!ModelState.IsValid)
                    return BadRequest(ModelState);

                var task = await _taskService.UpdateTaskAsync(id, updateTaskDto, userId.Value);
                
                if (task == null)
                    return NotFound();

                return Ok(task);
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error updating task {id}");
                return StatusCode(500, new { message = "An error occurred while updating the task" });
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            try
            {
                var userId = GetUserId();
                if (userId == null)
                {
                    _logger.LogWarning($"Unauthorized access attempt to DeleteTask {id}");
                    return Unauthorized();
                }

                var success = await _taskService.DeleteTaskAsync(id, userId.Value);
                
                if (!success)
                    return NotFound();

                return NoContent();
            }
            catch (Exception ex)
            {
                _logger.LogError(ex, $"Error deleting task {id}");
                return StatusCode(500, new { message = "An error occurred while deleting the task" });
            }
        }
    }
}