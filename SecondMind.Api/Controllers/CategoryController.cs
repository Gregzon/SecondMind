using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SecondMind.Api.Models;
using SecondMind.Api.Services;

[ApiController]
[Route("api/[controller]")]
[Authorize]
public class CategoryController : ControllerBase
{
    private readonly CategoryService _categoryService;

    public CategoryController(CategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    private Guid GetUserId()
    {
        var userIdStr = User.FindFirst(System.Security.Claims.ClaimTypes.NameIdentifier)?.Value;
        return Guid.Parse(userIdStr!);
    }

    [HttpGet]
    public async Task<ActionResult<List<CategoryResponse>>> GetCategories()
    {
        var userId = GetUserId();
        var categories = await _categoryService.GetCategoriesForUser(userId);
        return Ok(categories);
    }

    [HttpPost]
    public async Task<ActionResult<CategoryResponse>> CreateCategory([FromBody] CreateCategoryRequest request)
    {
        var userId = GetUserId();
        var category = await _categoryService.CreateCategory(request, userId);
        return Ok(category);
    }

    [HttpPut("{id}")]
    public async Task<ActionResult<CategoryResponse>> UpdateCategory(Guid id, [FromBody] UpdateCategoryRequest request)
    {
        var userId = GetUserId();
        var updated = await _categoryService.UpdateCategory(id, request, userId);
        if (updated == null) return NotFound();
        return Ok(updated);
    }

    [HttpDelete("{id}")]
    public async Task<ActionResult> DeleteCategory(Guid id)
    {
        var userId = GetUserId();
        var success = await _categoryService.DeleteCategory(id, userId);
        if (!success) return NotFound();
        return NoContent();
    }
}
