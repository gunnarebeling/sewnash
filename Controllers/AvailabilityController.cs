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
public class AvailabilityController : ControllerBase
{
    private SewNashDbContext _dbContext;
    private IMapper _mapper;

    public AvailabilityController(SewNashDbContext context, IMapper mapper)
    {
        _dbContext = context;
        _mapper = mapper;
    }

    [HttpPost]
    [Authorize]
    public IActionResult Get([FromBody] AvailabilityPostDTO availabilityPost)
    {
        return Ok(availabilityPost);
    }



    

}