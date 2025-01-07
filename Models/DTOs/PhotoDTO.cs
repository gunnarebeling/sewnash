using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models.DTOs;

public class PhotoDTO
{
    public int Id { get; set; }
    public string FileKey { get; set; }
    public bool MainPhoto { get; set; }

}