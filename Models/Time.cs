using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class Time
{
    public int Id { get; set; }
    [Required]
    public string StartTime { get; set; }
    public List<DayForAvailability> DayForAvailabilities { get; set; }

}