using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.Repository.Entities
{
    public class User
    {
        //[Key]
        public int Id { get; set; }
        public string Name { get; set; }
        
        public string Mail { get; set; }
        public double AdressX { get; set; }
        public double AdressY { get; set; }
        public DateTime BirthDate { get; set; }
        public int StatusId { get; set; }
        [ForeignKey("StatusId")]
        public Status Status { get; set; }
        public int ExperienceId { get; set; }
        [ForeignKey("ExperienceId")]
        public Experience Experience { get; set; }
        public string ProfilePicture { get; set; }
        public virtual ICollection<Track> Tracks { get; set; }
        //[NotMapped]
        
        public virtual ICollection<Track> Favourites { get; set; }
        //public virtual ICollection<Comment> Comments { get; set; }
    }
}
