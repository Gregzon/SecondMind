public class AuthResponse
{
    public string Token { get; set; } = default!;
    public DateTime ExpiresAt { get; set; }
    public UserResponse User { get; set; } = default!;
}
