using Microsoft.AspNetCore.Mvc;
using TaskManager.API.DTOs;
using TaskManager.API.Services;

namespace TaskManager.API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TasksController : ControllerBase
    {
        private readonly ITaskService _taskService;

        public TasksController(ITaskService taskService)
        {
            _taskService = taskService;
        }

        private int? GetUserId()
        {
            return HttpContext.Items["UserId"] as int?;
        }

        [HttpGet]
        public async Task<IActionResult> GetTasks([FromQuery] string? category = null)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            var tasks = await _taskService.GetTasksAsync(userId.Value, category);
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTask(int id)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            var task = await _taskService.GetTaskByIdAsync(id, userId.Value);
            
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTask([FromBody] CreateTaskDto createTaskDto)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = await _taskService.CreateTaskAsync(createTaskDto, userId.Value);
            return CreatedAtAction(nameof(GetTask), new { id = task.Id }, task);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTask(int id, [FromBody] CreateTaskDto updateTaskDto)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            if (!ModelState.IsValid)
                return BadRequest(ModelState);

            var task = await _taskService.UpdateTaskAsync(id, updateTaskDto, userId.Value);
            
            if (task == null)
                return NotFound();

            return Ok(task);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTask(int id)
        {
            var userId = GetUserId();
            if (userId == null)
                return Unauthorized();

            var success = await _taskService.DeleteTaskAsync(id, userId.Value);
            
            if (!success)
                return NotFound();

            return NoContent();
        }
    }
}