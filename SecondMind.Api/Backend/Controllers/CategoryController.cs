using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
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

    // -------------------------
    // Helper
    // -------------------------
    private Guid GetUserId()
    {
        var userIdStr = User.FindFirstValue(ClaimTypes.NameIdentifier);

        if (string.IsNullOrWhiteSpace(userIdStr))
            throw new UnauthorizedAccessException("User ID claim missing.");

        return Guid.Parse(userIdStr);
    }

    // -------------------------
    // GET
    // -------------------------
    [HttpGet]
    public async Task<ActionResult<List<CategoryResponse>>> GetCategories()
    {
        var userId = GetUserId();
        var categories = await _categoryService.GetCategoriesForUser(userId);
        return Ok(categories);
    }

    // -------------------------
    // POST
    // -------------------------
    [HttpPost]
    public async Task<ActionResult<CategoryResponse>> CreateCategory([FromBody] CreateCategoryRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        var category = await _categoryService.CreateCategory(request, userId);

        return CreatedAtAction(
            nameof(GetCategories),
            new { id = category.Id },
            category
        );
    }

    // -------------------------
    // PUT
    // -------------------------
    [HttpPut("{id:guid}")]
    public async Task<ActionResult<CategoryResponse>> UpdateCategory(
        Guid id,
        [FromBody] UpdateCategoryRequest request)
    {
        if (!ModelState.IsValid)
            return BadRequest(ModelState);

        var userId = GetUserId();
        var updated = await _categoryService.UpdateCategory(id, request, userId);

        if (updated == null)
            return NotFound();

        return Ok(updated);
    }

    // -------------------------
    // DELETE
    // -------------------------
    [HttpDelete("{id:guid}")]
    public async Task<ActionResult> DeleteCategory(Guid id)
    {
        var userId = GetUserId();

        try
        {
            var success = await _categoryService.DeleteCategory(id, userId);

            if (!success)
                return NotFound();

            return NoContent();
        }
        catch (InvalidOperationException ex)
        {
            return Conflict(new { message = ex.Message });
        }
    }
}