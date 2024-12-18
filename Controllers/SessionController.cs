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

    [HttpGet("{classId}")]
    public IActionResult GetDetails(string classId)
    {
       return Ok(  _dbContext.Sessions.ProjectTo<SessionForClassBookingDTO>(_mapper.ConfigurationProvider).Where(s => s.SewClassId == int.Parse(classId)));
        
    }

    

}