using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using SecondMind.Api.Models;

namespace SecondMind.Api.Data;

public class AppDbContext : DbContext
{
    public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }
    public DbSet<User> Users { get; set; }
    public DbSet<TaskItem> Tasks { get; set; }
    public DbSet<CategoryTemplate> CategoryTemplates { get; set; }
    public DbSet<Category> Categories { get; set; }
}