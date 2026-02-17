public class CreateTaskRequest
{
    public string Title { get; set; } = default!;
    public string? Description { get; set; }
    public int Priority { get; set; }
    public Guid CategoryId { get; set; }
}
