namespace SecondMind.Api.Models;

public class TaskItem
{
    public Guid Id { get; set; }

    public string Title { get; set; } = string.Empty;
    public string? Description { get; set; } // Kontext / Notizen

    // Priorität
    public TaskPriority Priority { get; set; } = TaskPriority.Medium;

    // Kategorie
    public Guid CategoryId { get; set; }
    public Category Category { get; set; } = null!;

    // Benutzerzugehörigkeit
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public bool IsCompleted { get; set; } = false;

    // Optional: AI-Felder (noch leer, Phase 2)
    public string? AiSummary { get; set; }
    public string? AiSuggestions { get; set; }
}