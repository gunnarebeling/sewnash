using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class BookingForSessionDTO
{
    public int Id { get; set; }
    public string Name { get; set; }
   
    public DateTime DateBooked {get; set;}
   
    public string PhoneNumber { get; set; }
  
    public int Occupancy { get; set; }
    
    
    
}
public class BookingForPostDTO
{
    [Required]
    public string Name { get; set; }
    [Required]
    public DateTime DateBooked {get; set;}
    [Required]
    public string PhoneNumber { get; set; }
    [Required]
    public int Occupancy { get; set; }
    [Required]
    public int SessionId { get; set; }
    
    
}