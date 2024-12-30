using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SewNash.Data;
using Microsoft.EntityFrameworkCore;
using SewNash.Models;
using SewNash.Models.DTOs;
using AutoMapper.QueryableExtensions;
using AutoMapper;

namespace SewNash.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BookingController : ControllerBase
{
    private SewNashDbContext _dbContext;
    private IMapper _mapper;

    public BookingController(SewNashDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpPost]
    public IActionResult PostBooking([FromBody] BookingForPostDTO booking)
    {
        Booking PostBooking = _mapper.Map<Booking>(booking);
        PostBooking.DateBooked = DateTime.Now;
        _dbContext.Bookings.Add(PostBooking);
        _dbContext.SaveChanges();
        return Created($"/booking/{PostBooking.Id}", PostBooking);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(string id)
    {
        Booking booking = _dbContext.Bookings.SingleOrDefault(b => b.Id == int.Parse(id));
        if (booking == default)
        {
            return NotFound();
            
        }
        _dbContext.Bookings.Remove(booking);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(string id, BookingUpdateDTO bookingUpdate)
    {
        Booking booking = _dbContext.Bookings.SingleOrDefault(b => b.Id == int.Parse(id));

        if (booking == default)
        {
            return NotFound();
            
        }
        booking.Name = bookingUpdate.Name;
        booking.PhoneNumber = bookingUpdate.PhoneNumber;
        booking.Occupancy = bookingUpdate.Occupancy;
        _dbContext.SaveChanges();
        return NoContent();
    }


    

}