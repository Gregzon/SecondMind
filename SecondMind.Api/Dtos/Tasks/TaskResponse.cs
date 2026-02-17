public class TaskResponse
{
    public Guid Id { get; set; }
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public int Priority { get; set; }
    public Guid CategoryId { get; set; }
    public string? CategoryName { get; set; }
    public DateTime CreatedAt { get; set; }
    public bool IsCompleted { get; set; }
    public string? AiSummary { get; set; }
    public string? AiSuggestions { get; set; }
}
