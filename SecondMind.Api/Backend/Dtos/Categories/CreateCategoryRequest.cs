namespace SecondMind.Api.Models
{
    public class CreateCategoryRequest
    {
        public string Name { get; set; } = null!;
        public string? ColorHex { get; set; }      // optional
        public string? Icon { get; set; }          // optional
        public int OrderIndex { get; set; } = 0;
    }
}
