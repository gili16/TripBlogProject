using Common.Entities;
using Microsoft.AspNetCore.Http;
using System.ComponentModel.DataAnnotations.Schema;

namespace Common.Entities
{
    public class UserDto
    {
        public int? Id { get; set; }
        public string Name { get; set; }
        //public string Password { get; set; }
        public string Mail { get; set; }
        public double AdressX { get; set; }
        public double AdressY { get; set; }
        public DateTime BirthDate { get; set; }
        public int StatusId { get; set; }
        
        public byte[]? PictureBytes { get; set; }
        public int ExperienceId { get; set; }
        public IFormFile PictureFile { get; set; }
        public string? ProfilePicture { get; set; }
        public  List<TrackDto>? Tracks { get; set; }
        public  List<TrackDto>? Favourites { get; set; }

    }
}
