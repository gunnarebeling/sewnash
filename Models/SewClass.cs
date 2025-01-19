using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class SewClass
{
    public int Id { get; set; }
    [Required]
    public string Name { get; set; }
    [Required]
    public string Description { get; set; }
    [Required]
    public int MaxPeople { get; set; }
    [Required]
    public decimal PricePerPerson { get; set; }
   
    [Required]
    public int Duration { get; set; }
    public List<Availability> Availabilities { get; set; }
    public List<Photo> Photos { get; set; }
    public List<Session> Sessions {get; set;}
}