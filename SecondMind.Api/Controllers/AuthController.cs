using Microsoft.AspNetCore.Mvc;
using SecondMind.Api.Services;

namespace SecondMind.Api.Controllers;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    private readonly AuthService _authService;
    private readonly JwtService _jwtService;

    public AuthController(AuthService authService, JwtService jwtService)
    {
        _authService = authService;
        _jwtService = jwtService;
    }

    [HttpPost("register")]
    public IActionResult Register([FromBody] RegisterRequest request)
    {
        var result = _authService.Register(request.Email, request.Password);

        if (result == null)
            return BadRequest("Email already in use");

        return Ok(result);
    }


    [HttpPost("login")]
    public IActionResult Login(LoginRequest request)
    {
        var result = _authService.Login(request.Email, request.Password);

        if (result == null)
            return Unauthorized();

        return Ok(result);
    }

}