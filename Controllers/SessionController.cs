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
public class SessionController : ControllerBase
{
    private SewNashDbContext _dbContext;
    private IMapper _mapper;

    public SessionController(SewNashDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpGet]
    [Authorize]
    public IActionResult GetAll()
    {
       return Ok( _dbContext.Sessions.ProjectTo<SessionDTO>(_mapper.ConfigurationProvider));
        
    }

    [HttpGet("class/{classId}")]
    public IActionResult GetDetailsForClass(string classId)
    {
       return Ok(  _dbContext.Sessions.ProjectTo<SessionDTO>(_mapper.ConfigurationProvider).Where(s => s.SewClassId == int.Parse(classId)));
        
    }

    [HttpGet("{sessionId}")]
    public IActionResult GetSessionById(string sessionId)
    {
       return Ok(  _dbContext.Sessions.ProjectTo<SessionDTO>(_mapper.ConfigurationProvider).SingleOrDefault(s => s.Id == int.Parse(sessionId)));
        
    }

    [HttpDelete("{sessionId}")]
    public IActionResult Delete(string sessionId)
    {
       Session session = _dbContext.Sessions.SingleOrDefault(s => s.Id == int.Parse(sessionId));
       _dbContext.Sessions.Remove(session);
       _dbContext.SaveChanges();
       return NoContent();
    }
    [HttpPut("{sessionId}")]
    public IActionResult toggleOpen(string sessionId)
    {
       Session session = _dbContext.Sessions.SingleOrDefault(s => s.Id == int.Parse(sessionId));
       session.Open = !session.Open;
       _dbContext.SaveChanges();
       return NoContent();
    }

    [HttpGet("date")]
    public IActionResult GetSesionsByDate([FromQuery] DateTime date)
    {
      List<Session> sessions = _dbContext.Sessions.ToList();
      if (date != null)
      {
         sessions = sessions.Where(s => s.DateTime == date).ToList();
         
      }
         return Ok( _mapper.Map<SessionDTO>(sessions));
        
    }

    

}