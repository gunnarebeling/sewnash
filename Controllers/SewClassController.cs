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

    

}