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
        _dbContext.Bookings.Add(PostBooking);
        _dbContext.SaveChanges();
        return Created($"/booking/{PostBooking.Id}", PostBooking);
    }



    

}