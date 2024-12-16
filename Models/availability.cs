using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class Availability
{
    public int Id { get; set; }
    [Required]
    public int SewClassId { get; set; }
    public SewClass SewClass { get; set; }
    [Required]
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<DayForAvailability> DaysAndTimes { get; set; }


}