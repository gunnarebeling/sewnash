using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models.DTOs;

public class DayDTO
{
    public int Id { get; set; }
    public string DayOfWeek { get; set; }

}
public class DayForAvailabilityPostDTO
{
    public int Id { get; set; }
    public string DayOfWeek { get; set; }
    public List<int> Times { get; set; }
}