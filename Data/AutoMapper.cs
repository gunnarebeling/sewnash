using AutoMapper;
using SewNash.Models;
using SewNash.Models.DTOs;

public class AutoMapperProfiles : Profile
{
    public AutoMapperProfiles()
    {

        
        CreateMap<Employee, EmployeeDTO>();
        CreateMap<Employee, SimpleEmployeeDTO>();
        CreateMap<SewClass, SewClassDTO>();
        CreateMap<SewClass, SewClassForSessionDTO>();
        CreateMap<Availability, AvailabilityForClassDTO>();
        CreateMap<DayForAvailability, DayForAvailabilityDTO>();
        CreateMap<Time, TimeDTO>();
        CreateMap<Day, DayDTO>();
        CreateMap<Session, SessionForClassBookingDTO>();
        CreateMap<Session, SessionDTO>();
        CreateMap<Booking, BookingForSessionDTO>();
        CreateMap<BookingForPostDTO, Booking>();
        

    }
        
    
}