using System.ComponentModel.DataAnnotations;

namespace SewNash.Models.DTOs;

public class RegistrationDTO
{
    [Required]
    [EmailAddress(ErrorMessage ="must be a valid email")]
    public string Email { get; set; }
    [Required]
    public string PhoneNumber { get; set; }
    [Required]
    [MinLength(8, ErrorMessage = "must be at least 8 characters")]
    public string Password { get; set; }
    [Required]
    public string UserName { get; set; }
    [Required]
    public string FirstName { get; set; }
    [Required]
    public string LastName { get; set; }
 
   
}