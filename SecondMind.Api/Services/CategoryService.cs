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

    public async Task<List<CategoryResponse>> GetCategoriesForUser(Guid userId)
    {
        var categories = await _db.Categories
            .Where(c => c.UserId == userId)
            .OrderBy(c => c.OrderIndex)
            .ToListAsync();

        return categories.Select(c => new CategoryResponse
        {
            Id = c.Id,
            Name = c.Name,
            ColorHex = c.ColorHex,
            Icon = c.Icon,
            OrderIndex = c.OrderIndex
        }).ToList();
    }

    public async Task<CategoryResponse> CreateCategory(CreateCategoryRequest request, Guid userId)
    {
        var category = new Category
        {
            Name = request.Name,
            ColorHex = request.ColorHex,
            Icon = request.Icon,
            OrderIndex = request.OrderIndex,
            UserId = userId
        };

        _db.Categories.Add(category);
        await _db.SaveChangesAsync();

        return new CategoryResponse
        {
            Id = category.Id,
            Name = category.Name,
            ColorHex = category.ColorHex,
            Icon = category.Icon,
            OrderIndex = category.OrderIndex
        };
    }

    public async Task<CategoryResponse?> UpdateCategory(Guid id, UpdateCategoryRequest request, Guid userId)
    {
        var category = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (category == null) return null;

        category.Name = request.Name;
        category.ColorHex = request.ColorHex;
        category.Icon = request.Icon;
        category.OrderIndex = request.OrderIndex;

        await _db.SaveChangesAsync();

        return new CategoryResponse
        {
            Id = category.Id,
            Name = category.Name,
            ColorHex = category.ColorHex,
            Icon = category.Icon,
            OrderIndex = category.OrderIndex
        };
    }

    public async Task<bool> DeleteCategory(Guid id, Guid userId)
    {
        var category = await _db.Categories.FirstOrDefaultAsync(c => c.Id == id && c.UserId == userId);
        if (category == null) return false;

        // Optional: prüfen, ob Tasks existieren
        var hasTasks = await _db.Tasks.AnyAsync(t => t.CategoryId == id);
        if (hasTasks) throw new Exception("Category has tasks, cannot delete");

        _db.Categories.Remove(category);
        await _db.SaveChangesAsync();
        return true;
    }
}
