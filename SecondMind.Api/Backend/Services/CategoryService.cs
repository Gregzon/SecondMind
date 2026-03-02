using Microsoft.EntityFrameworkCore;
using SecondMind.Api.Data;
using SecondMind.Api.Models;

public class CategoryService
{
    private readonly AppDbContext _db;

    public CategoryService(AppDbContext db)
    {
        _db = db;
    }

    // -------------------------
    // GET
    // -------------------------
    public async Task<List<CategoryResponse>> GetCategoriesForUser(Guid userId)
    {
        return await _db.Categories
            .Where(c => c.UserId == userId && !c.IsDeleted)
            .OrderBy(c => c.OrderIndex)
            .Select(c => MapToResponse(c))
            .ToListAsync();
    }

    // -------------------------
    // CREATE
    // -------------------------
    public async Task<CategoryResponse> CreateCategory(CreateCategoryRequest request, Guid userId)
    {
        var maxOrder = await _db.Categories
            .Where(c => c.UserId == userId && !c.IsDeleted)
            .MaxAsync(c => (int?)c.OrderIndex) ?? 0;

        var category = new Category
        {
            Id = Guid.NewGuid(),
            Name = request.Name,
            Color = request.ColorHex,
            Icon = request.Icon,
            OrderIndex = maxOrder + 1,
            UserId = userId,
            CreatedAt = DateTime.UtcNow,
            UpdatedAt = DateTime.UtcNow
        };

        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return MapToResponse(category);
    }

    // -------------------------
    // UPDATE
    // -------------------------
    public async Task<CategoryResponse?> UpdateCategory(Guid id, UpdateCategoryRequest request, Guid userId)
    {
        var category = await _db.Categories
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId && !c.IsDeleted);

        if (category == null)
            return null;

        category.Name = request.Name;
        category.Color = request.ColorHex;
        category.Icon = request.Icon;
        category.OrderIndex = request.OrderIndex;
        category.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return MapToResponse(category);
    }

    // -------------------------
    // DELETE (Soft Delete)
    // -------------------------
    public async Task<bool> DeleteCategory(Guid id, Guid userId)
    {
        var category = await _db.Categories
            .FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId && !c.IsDeleted);

        if (category == null)
            return false;

        var hasTasks = await _db.Tasks
            .AnyAsync(t => t.CategoryId == id && !t.isDeleted);

        if (hasTasks)
            throw new InvalidOperationException("Category contains tasks.");

        category.IsDeleted = true;
        category.UpdatedAt = DateTime.UtcNow;

        await _db.SaveChangesAsync();

        return true;
    }

    // -------------------------
    // Mapping Helper
    // -------------------------
    private static CategoryResponse MapToResponse(Category c)
    {
        return new CategoryResponse
        {
            Id = c.Id,
            Name = c.Name,
            ColorHex = c.Color,
            Icon = c.Icon,
            OrderIndex = c.OrderIndex
        };
    }
}