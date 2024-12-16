using System.ComponentModel.DataAnnotations;
using Microsoft.AspNetCore.Identity;

namespace SewNash.Models;

public class SewClass
{
    public int Id { get; set; }
    public string name { get; set; }
    public string Description { get; set; }
    public int MaxPeople { get; set; }
    public decimal PricePerPerson { get; set; }
    public List<Availability> MyProperty { get; set; }
}