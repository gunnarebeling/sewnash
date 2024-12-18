using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models.DTOs;

public class SewClassDTO
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public int MaxPeople { get; set; }
    
    public decimal PricePerPerson { get; set; }
    public int Duration { get; set; }
    public List<AvailabilityForClassDTO> Availabilities { get; set; }
}
public class SewClassForSessionDTO
{
    public int Id { get; set; }
    
    public string Name { get; set; }
    
    public string Description { get; set; }
    
    public int MaxPeople { get; set; }
    
    public decimal PricePerPerson { get; set; }
    public int Duration { get; set; }
}