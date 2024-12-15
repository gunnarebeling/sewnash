using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models.DTOs;

public class EmployeeDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName 
    { 
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
    public string UserName { get; set; }
    public List<string> Roles { get; set; }

    public string IdentityUserId { get; set; }
    public string Email {get; set;}
    public string PhoneNumber { get; set; }


}

public class SimpleEmployeeDTO
{
    public int Id { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string FullName 
    { 
        get
        {
            return $"{FirstName} {LastName}";
        }
    }
}

