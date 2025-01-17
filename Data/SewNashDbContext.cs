using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using SewNash.Models;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Data;
public class SewNashDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    
    public DbSet<Employee> Employees { get; set; }
    public DbSet<Time> Times { get; set; }
    public DbSet<Day> Days { get; set; }
    public DbSet<DayForAvailability> DayForAvailabilities { get; set; }
    public DbSet<Availability> Availabilities { get; set; }
    public DbSet<Session> Sessions { get; set; }
    public DbSet<Booking> Bookings { get; set; }
    public DbSet<SewClass> SewClasses {get; set;}
    public DbSet<Photo> Photos { get; set; }
    

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
            PhoneNumber = "123-123-1234",
            Email = "admina@strator.comx"
            
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
            LastName = "Doe",
            PhoneNumber = "222-222-2222",
            Email = "johndoe@example.com"

        });
        modelBuilder.Entity<Time>().HasData(new Time[]
        {
            new Time { Id = 1, StartTime = "10:00 AM" },
            new Time { Id = 2, StartTime = "11:00 AM" },
            new Time { Id = 3, StartTime = "12:00 PM" },
            new Time { Id = 4, StartTime = "01:00 PM" },
            new Time { Id = 5, StartTime = "02:00 PM" },
            new Time { Id = 6, StartTime = "03:00 PM" },
            new Time { Id = 7, StartTime = "04:00 PM" },
            new Time { Id = 8, StartTime = "05:00 PM" },
            new Time { Id = 9, StartTime = "06:00 PM" },
            new Time { Id = 10, StartTime = "07:00 PM" },
            new Time { Id = 11, StartTime = "08:00 PM" }
        });
        modelBuilder.Entity<Day>().HasData(new Day[]
        {
            new Day { Id = 1, DayOfWeek = "Monday" },
            new Day { Id = 2, DayOfWeek = "Tuesday" },
            new Day { Id = 3, DayOfWeek = "Wednesday" },
            new Day { Id = 4, DayOfWeek = "Thursday" },
            new Day { Id = 5, DayOfWeek = "Friday" },
            new Day { Id = 6, DayOfWeek = "Saturday" },
            new Day { Id = 7, DayOfWeek = "Sunday" }
        });
        modelBuilder.Entity<SewClass>().HasData(new SewClass[]
        {
            new SewClass
            {
                Id = 1,
                Name = "Bag class",
                Description = "Learn to build a bag.",
                MaxPeople = 8,
                PricePerPerson = 50.00m,
                Duration = 2
            },
            new SewClass
            {
                Id = 2,
                Name = "Dog Bandana",
                Description = "Learn to build a Dog Bandana.",
                MaxPeople = 6,
                PricePerPerson = 75.00m,
                Duration = 2
            }
            
        });
        modelBuilder.Entity<Availability>().HasData(new Availability[]
        {
            new Availability
            {
                Id = 1,
                SewClassId = 1, // Beginner Sewing
                StartDate = new DateTime(2025, 1, 1), // Jan 1, 2024, 9:00 AM
                EndDate = new DateTime(2026, 1, 1) // Jun 30, 2024, 5:00 PM
            },
            new Availability
            {
                Id = 2,
                SewClassId = 2, // Intermediate Sewing
                StartDate = new DateTime(2025, 1, 1), // Feb 1, 2024, 10:00 AM
                EndDate = new DateTime(2026, 1, 1) // Jul 31, 2024, 6:00 PM
            },
            new Availability
            {
                Id = 3,
                SewClassId = 3, // Quilting Workshop
                StartDate = new DateTime(2025, 1, 1), // Mar 1, 2024, 11:00 AM
                EndDate = new DateTime(2026, 1, 1) // Aug 31, 2024, 4:00 PM
            }
            
        });
        modelBuilder.Entity<DayForAvailability>().HasData(new DayForAvailability[]
        {
            new DayForAvailability
            {
                Id = 1,
                AvailabilityId = 1, // For Availability 1
                DayId = 1, // Monday
            },
            new DayForAvailability
            {
                Id = 2,
                AvailabilityId = 1, // For Availability 1
                DayId = 3, // Wednesday
            },
            new DayForAvailability
            {
                Id = 3,
                AvailabilityId = 2, // For Availability 2
                DayId = 5, // Friday
            },
            new DayForAvailability
            {
                Id = 4,
                AvailabilityId = 3, // For Availability 3
                DayId = 6, // Saturday
            },
            new DayForAvailability
            {
                Id = 5,
                AvailabilityId = 3, // For Availability 3
                DayId = 7, // Sunday
            }
            
            
        });
        modelBuilder.Entity<Session>().HasData(new Session[]
        {
            new Session
            {
                Id = 1,
                SewClassId = 1, // Sewing Class 1
                DateTime = new DateTime(2025, 1, 15, 10, 0, 0, DateTimeKind.Local).ToUniversalTime(), // Jan 15, 2024, at 10:00 AM
                TimeId = 1, // Example Time reference (10:00 AM)
                DayId = 1, // Example Day reference (Monday)
                Open = true
            },
            new Session
            {
                Id = 2,
                SewClassId = 2, // Sewing Class 2
                DateTime = new DateTime(2025, 1, 16, 14, 0, 0, DateTimeKind.Local).ToUniversalTime(), // June 10, 2024, at 2:00 PM
                TimeId = 2, // Example Time reference (2:00 PM)
                DayId = 2, // Example Day reference (Tuesday)
                Open = true
            },
            new Session
            {
                Id = 3,
                SewClassId = 3, // Sewing Class 3
                DateTime = new DateTime(2025, 1, 15, 18, 0, 0, DateTimeKind.Local).ToUniversalTime(), // April 20, 2024, at 6:00 PM
                TimeId = 3, // Example Time reference (6:00 PM)
                DayId = 5, // Example Day reference (Saturday)
                Open = true
            }
            
        });
        modelBuilder.Entity<Booking>().HasData(new Booking[]
        {
            new Booking
            {
                Id = 1,
                Name = "Carly Olds",
                DateBooked = new DateTime(2025, 1, 1),
                PhoneNumber = "123-456-7890",
                Email = "test@test.com",
                Occupancy = 2,
                SessionId = 1
            },
            new Booking
            {
                Id = 2,
                Name = "Jane Smith",
                DateBooked = new DateTime(2024, 6, 5),
                PhoneNumber = "987-654-3210",
                Email = "test2@test.com",
                Occupancy = 3,
                SessionId = 2
            },
            new Booking
            {
                Id = 3,
                Name = "Alice Johnson",
                DateBooked = new DateTime(2024, 4, 10),
                PhoneNumber = "555-123-4567",
                Email = "test3@test.com",
                Occupancy = 1,
                SessionId = 3
            }
            
        });

        modelBuilder.Entity<Session>()
            .HasMany(s => s.Employees)
            .WithMany(e => e.Sessions)
            .UsingEntity(j => j.HasData(
                new { SessionsId = 1, EmployeesId = 1 },
                new { SessionsId = 2, EmployeesId = 2 },
                new { SessionsId = 3, EmployeesId = 1 },
                new { SessionsId = 2, EmployeesId = 1 }
                
        ));
        modelBuilder.Entity<DayForAvailability>()
            .HasMany(d => d.Times)
            .WithMany(t => t.DayForAvailabilities)
            .UsingEntity(j => j.HasData(
                // For Session 1 (Day 1: Monday, Time 10:00 AM)
                new { DayForAvailabilitiesId = 1, TimesId = 1 },
                new { DayForAvailabilitiesId = 2, TimesId = 1 }, // Session 1 on Wednesday, Time 10:00 AM

                // For Session 2 (Day 5: Friday, Time 2:00 PM)
                new { DayForAvailabilitiesId = 3, TimesId = 2 },

                // For Session 3 (Day 6: Saturday, Time 6:00 PM)
                new { DayForAvailabilitiesId = 4, TimesId = 3 },
                new { DayForAvailabilitiesId = 5, TimesId = 3 } // Session 3 on Sunday, Time 6:00 PM
        ));

        modelBuilder.Entity<Photo>()
        .HasOne(p => p.SewClass)
        .WithMany(s => s.Photos)
        .HasForeignKey(p => p.SewClassId)
        .OnDelete(DeleteBehavior.Cascade);

        modelBuilder.Entity<Session>()
        .HasOne(sc => sc.SewClass)
        .WithMany(s => s.Sessions)
        .HasForeignKey(sc => sc.SewClassId)
        .OnDelete(DeleteBehavior.Cascade); 


    }
}