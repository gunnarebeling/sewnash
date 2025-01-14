using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class Employee
{
    public int Id { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
    [Required]
    public string PhoneNumber {get; set;}
    [Required]
    public string Email { get; set; }
    [Required]
    
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
    public List<Session> Sessions { get; set; }
}