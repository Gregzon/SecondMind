namespace SecondMind.Api.Models
{
    public class CategoryResponse
    {
        public Guid Id { get; set; }
        public string Name { get; set; } = null!;
        public string? ColorHex { get; set; }
        public string? Icon { get; set; }
        public int OrderIndex { get; set; }
    }
}
