using SecondMind.Api.Models;

public class Category
{
    public Guid Id { get; set; }

    public string Name { get; set; } = string.Empty;

    public string? ColorHex { get; set; }
    public string? Icon { get; set; }

    public int OrderIndex { get; set; }

    // Owner
    public Guid UserId { get; set; }
    public User User { get; set; } = null!;

    // Optional: Referenz auf Template
    public Guid? TemplateId { get; set; }
    public CategoryTemplate? Template { get; set; }

    // Navigation
    public ICollection<TaskItem> Tasks { get; set; } = new List<TaskItem>();
}