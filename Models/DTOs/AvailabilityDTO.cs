using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models.DTOs;

public class AvailabilityForClassDTO
{
    public int Id { get; set; }
   
    public DateTime StartDate { get; set; }
    public DateTime? EndDate { get; set; }
    public List<DayForAvailabilityDTO> DaysAndTimes { get; set; }


}