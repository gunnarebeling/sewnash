using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using SewNash.Data;
using Microsoft.EntityFrameworkCore;
using SewNash.Models;
using SewNash.Models.DTOs;
using AutoMapper.QueryableExtensions;
using AutoMapper;
using Amazon.S3;
using Amazon.S3.Model;

namespace SewNash.Controllers;

[ApiController]
[Route("api/[controller]")]
public class PhotoController : ControllerBase
{
    private SewNashDbContext _dbContext;
    private IMapper _mapper;
    private IAmazonS3 _s3Client;
    private const string BucketName = "sewnash-photos--use2-az1--x-s3";

    public PhotoController(SewNashDbContext context, IMapper mapper, IAmazonS3 s3Client)
    {
        _dbContext = context;
        _mapper = mapper;
        _s3Client = s3Client;

    }

    [HttpPost("upload")]
    public async Task<IActionResult> UploadPhoto([FromForm] IFormFile file)
    {
        if (file == null || file.Length == 0)
        {
            return BadRequest("File is required");
        }
        var fileKey = Guid.NewGuid().ToString() + Path.GetExtension(file.FileName);
        using (var stream = file.OpenReadStream())
        {
            var putRequest = new PutObjectRequest
            {
                BucketName = BucketName,
                Key = fileKey,
                InputStream = stream,
                ContentType = file.ContentType,
                CannedACL = S3CannedACL.PublicRead
            
            };

            try
            {
                var response = await _s3Client.PutObjectAsync(putRequest);
                return Ok(new { FileUrl = $"https://{BucketName}.s3.amazonaws.com/{fileKey}" });
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }
    }

}