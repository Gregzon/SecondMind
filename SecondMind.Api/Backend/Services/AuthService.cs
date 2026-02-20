using SecondMind.Api.Data;
using SecondMind.Api.Models;
using BCrypt.Net;
using Microsoft.IdentityModel.Tokens;
using System.Security.Claims;
using System.Text;
using System.IdentityModel.Tokens.Jwt;

namespace SecondMind.Api.Services;

public class AuthService
{
    private readonly AppDbContext _context;
    private readonly IConfiguration _configuration;
    private readonly JwtService _jwt;

    public AuthService(AppDbContext context, IConfiguration configuration, JwtService jwt)
    {
        _context = context;
        _configuration = configuration;
        _jwt = jwt;
    }

    public AuthResponse? Register(string email, string password)
    {
        if (_context.Users.Any(u => u.Email == email))
            return null;

        var user = new User
        {
            Email = email,
            PasswordHash = BCrypt.Net.BCrypt.HashPassword(password),
            CreatedAt = DateTime.UtcNow
        };

        _context.Users.Add(user);
        _context.SaveChanges();

        // Direkt Login-Flow verwenden
        return Login(email, password);
    }


    // Login
    public AuthResponse? Login(string email, string password)
    {
        var user = _context.Users.SingleOrDefault(u => u.Email == email);
        if (user == null) return null;

        bool verified = BCrypt.Net.BCrypt.Verify(password, user.PasswordHash);
        if (!verified) return null;

        var expiresAt = DateTime.UtcNow.AddHours(1);

        var claims = new[]
        {
        new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
        new Claim(ClaimTypes.Email, user.Email)
    };

        var key = new SymmetricSecurityKey(
            Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]!)
        );

        var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);

        var token = new JwtSecurityToken(
            issuer: _configuration["Jwt:Issuer"],
            audience: _configuration["Jwt:Audience"],
            claims: claims,
            expires: expiresAt,
            signingCredentials: creds
        );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);

        return new AuthResponse
        {
            Token = jwt,
            ExpiresAt = expiresAt,
            User = new UserResponse
            {
                Id = user.Id,
                Email = user.Email,
                CreatedAt = user.CreatedAt
            }
        };
    }
}