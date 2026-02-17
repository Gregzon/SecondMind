using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecondMind.Api.Models;
using SecondMind.Api.Services;
using System.Security.Claims;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class TaskController : ControllerBase
{
    private readonly TaskService _taskService;

    public TaskController(TaskService taskService)
    {
        _taskService = taskService;
    }

    // Hilfsmethode: Aktuellen User aus Token holen
    private Guid GetUserId()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);
        return Guid.Parse(userIdStr!);
    }

    [HttpGet]
    public async Task<ActionResult<List<TaskResponse>>> GetTasks()
    {
        var userId = GetUserId();
        var tasks = await _taskService.GetTasksForUser(userId);
        return Ok(tasks);
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<TaskResponse>> GetTask(Guid id)
    {
        var userId = GetUserId();
        var task = await _taskService.GetTaskById(id, userId);
        if (task == null) return NotFound();
        return Ok(task);
    }

    [HttpPost]
    public async Task<ActionResult<TaskResponse>> CreateTask([FromBody] CreateTaskRequest request)
    {
        var userId = GetUserId();

        var task = new TaskItem
        {
            Title = request.Title,
            Description = request.Description,
            Priority = (TaskPriority)request.Priority,
            CategoryId = request.CategoryId,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            IsCompleted = false
        };

        var response = await _taskService.CreateTask(task);
        return Ok(response);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<TaskResponse>> UpdateTask(Guid id, [FromBody] UpdateTaskRequest request)
    {
        var userId = GetUserId();

        var task = new TaskItem
        {
            Id = id,
            Title = request.Title,
            Description = request.Description,
            Priority = (TaskPriority)request.Priority,
            CategoryId = request.CategoryId,
            IsCompleted = request.IsCompleted
        };

        var updated = await _taskService.UpdateTask(task, userId);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteTask(Guid id)
    {
        var userId = GetUserId();
        var success = await _taskService.DeleteTask(id, userId);
        if (!success) return NotFound();
        return NoContent();
    }
}