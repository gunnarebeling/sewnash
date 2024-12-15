using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class Employee
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Email {get; set;}
    public string PhoneNumber {get; set;}
    
    public string IdentityUserId { get; set; }

    public IdentityUser IdentityUser { get; set; }
}