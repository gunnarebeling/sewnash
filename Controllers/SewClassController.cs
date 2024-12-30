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
public class SewClassController : ControllerBase
{
    private SewNashDbContext _dbContext;
    private IMapper _mapper;

    public SewClassController(SewNashDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpGet]
    public IActionResult Get()
    {
        return Ok( _dbContext.SewClasses.ProjectTo<SewClassDTO>(_mapper.ConfigurationProvider));
    }

    [HttpGet("{id}")]
    public IActionResult GetDetails(string id)
    {
        SewClassDTO sewClass = _dbContext.SewClasses.ProjectTo<SewClassDTO>(_mapper.ConfigurationProvider).Single(s => s.Id == int.Parse(id));
        return Ok(sewClass);
    }
    [HttpPost]
    [Authorize]
    public IActionResult Post([FromBody] PostClassDTO sewClass)
    {
        SewClass newClass = _mapper.Map<SewClass>(sewClass);
        _dbContext.SewClasses.Add(newClass);
        _dbContext.SaveChanges();
        return Created($"/api/sewClass/{newClass.Id}", newClass);
        
    }

    [HttpDelete("{id}")]
    [Authorize]
    public IActionResult Delete(string id)
    {
        SewClass sewClass = _dbContext.SewClasses.SingleOrDefault(c => c.Id == int.Parse(id));
        if (sewClass == default)
        {
            return NotFound();
        }
        bool hasBookings = _dbContext.Bookings
        .Include(b => b.Session) // Eager load Session
        .Any(b => b.Session.SewClassId == sewClass.Id && b.Session.DateTime >= DateTime.Now);
        if (hasBookings)
        {
            return BadRequest("there are bookings for this class");
        }
        _dbContext.Remove(sewClass);
        _dbContext.SaveChanges();
        return NoContent();
    }

    [HttpPut("{id}")]
    [Authorize]
    public IActionResult Update(string id, [FromBody] PostClassDTO classData)
    {
        SewClass sewClass = _dbContext.SewClasses.SingleOrDefault(c => c.Id == int.Parse(id));
        if (sewClass == default)
        {
            return NotFound();
        }
        sewClass.Name = classData.Name;
        sewClass.Description = classData.Description;
        sewClass.Duration = classData.Duration;
        sewClass.MaxPeople = classData.MaxPeople;
        sewClass.PricePerPerson = classData.PricePerPerson;
        _dbContext.SaveChanges();
        return NoContent();
    }
    

}