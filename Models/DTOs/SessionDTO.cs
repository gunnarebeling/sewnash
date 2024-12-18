using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models.DTOs;

public class SessionForClassBookingDTO
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public int SewClassId { get; set; }
    public int TimeId { get; set; }
    public TimeDTO Time { get; set; }
    public int DayId { get; set; }
    
    public DayDTO Day { get; set; }
    public bool Open { get; set; }

}
public class SessionDTO
{
    public int Id { get; set; }
    public DateTime DateTime { get; set; }
    public int SewClassId { get; set; }
    public SewClassForSessionDTO SewClass { get; set; }
    public int TimeId { get; set; }
    public TimeDTO Time { get; set; }
    public int DayId { get; set; }
    
    public DayDTO Day { get; set; }
    public List<BookingForSessionDTO> Bookings { get; set; }
    public int TotalPeople 
    { 
        get 
        {
            int totalPeople = Bookings.Aggregate(0, (total, b) => {
                total += b.Occupancy;
                return total;
            });
            return totalPeople;
        }
    }
    public bool Open 
    { 
        get
        {
            
            return TotalPeople < SewClass.MaxPeople;

        }
    }

    

}