using Microsoft.EntityFrameworkCore;
using SecondMind.Api.Data;
using SecondMind.Api.Models;

public class TaskService
{
    private readonly AppDbContext _db;

    public TaskService(AppDbContext db)
    {
        _db = db;
    }

    // Alle Tasks eines Users abrufen
    public async Task<List<TaskItem>> GetTasksForUser(Guid userId)
    {
        return await _db.Tasks
            .Include(t => t.Category) // gleich die Kategorie mitladen
            .Where(t => t.UserId == userId)
            .OrderByDescending(t => t.CreatedAt)
            .ToListAsync();
    }

    // Einzelnen Task abrufen
    public async Task<TaskItem?> GetTaskById(Guid taskId, Guid userId)
    {
        return await _db.Tasks
            .Include(t => t.Category)
            .FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
    }

    // Task erstellen
    public async Task<TaskResponse> CreateTask(TaskItem task)
    {
        _db.Tasks.Add(task);
        await _db.SaveChangesAsync();

        // Kategorie nachladen
        await _db.Entry(task).Reference(t => t.Category).LoadAsync();

        return new TaskResponse
        {
            Id = task.Id,
            Title = task.Title,
            Description = task.Description,
            Priority = (int)task.Priority,
            CategoryId = task.CategoryId,
            CategoryName = task.Category?.Name,
            CreatedAt = task.CreatedAt,
            IsCompleted = task.IsCompleted,
            AiSummary = task.AiSummary,
            AiSuggestions = task.AiSuggestions
        };
    }


    // Task aktualisieren
    public async Task<TaskItem?> UpdateTask(TaskItem task, Guid userId)
    {
        var existing = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == task.Id && t.UserId == userId);
        if (existing == null) return null;

        // Update Felder
        existing.Title = task.Title;
        existing.Description = task.Description;
        existing.Priority = task.Priority;
        existing.CategoryId = task.CategoryId;
        existing.IsCompleted = task.IsCompleted;

        await _db.SaveChangesAsync();
        return existing;
    }

    // Task löschen
    public async Task<bool> DeleteTask(Guid taskId, Guid userId)
    {
        var task = await _db.Tasks.FirstOrDefaultAsync(t => t.Id == taskId && t.UserId == userId);
        if (task == null) return false;

        _db.Tasks.Remove(task);
        await _db.SaveChangesAsync();
        return true;
    }
}