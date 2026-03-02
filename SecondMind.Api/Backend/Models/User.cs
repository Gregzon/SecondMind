using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace SecondMind.Api.Models;

public class User
{
    [Key]
    public Guid Id { get; set; }

    [EmailAddress]
    [MaxLength(50)]
    public string Email { get; set; } = string.Empty;

    public string PasswordHash { get; set; } = string.Empty;

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    public ICollection<Category> Categories { get; set; } = new List<Category>();
}