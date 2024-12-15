using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SewNash.Models;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Data;
public class SewNashDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    
    public DbSet<Employee> Employees { get; set; }
    

    public SewNashDbContext(DbContextOptions<SewNashDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<Employee>().HasData(new Employee
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Admina",
            LastName = "Strator",
            
        });
        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0", // Unique GUID for this user
            UserName = "JohnDoe",
            Email = "johndoe@example.com",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["JohnDoePassword"]) // Store password securely
        });

        // Seeding the Employee entity for the non-admin user
        modelBuilder.Entity<Employee>().HasData(new Employee
        {
            Id = 2, // Unique Employee ID
            IdentityUserId = "a4b9c99e-87ab-4c5a-9d53-1e3f5248a1b0", // Links to the IdentityUser ID
            FirstName = "John",
            LastName = "Doe"
        });

    }
}