using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.Diagnostics;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Http;

namespace MyProject.Repository.Entities
{
    public class Track
    {
        //[Key]
        public int Id { get; set; }
        public double StartX { get; set; }
        public double StartY { get; set; }
        public double EndX { get; set; }
        public double EndY { get; set; }
        
        public string Picture { get; set; }
        public int Length { get; set; }
        public int ViewId { get; set; }
        [ForeignKey("ViewId")]
        public View View { get; set; }
        public int DayPartId { get; set; }
        [ForeignKey("DayPartId")]
        public DayPart DayPart{get; set;}
        public int LevelId { get; set; }
        [ForeignKey("LevelId")]
        public Level Level{get; set;}
        //public int CategoryId { get; set; }
        //[ForeignKey("CategoryId")]
        //public Category Category { get; set; }
        public int CompanyForTripId { get; set; }
        [ForeignKey("CompanyForTripId")]
        public Company Company { get; set; }
        
        public virtual ICollection<Category> Categories { get; set; }
        public string Title { get; set; }
        public string Description { get; set; } 
        public DateTime Created { get; set; }
        public virtual ICollection<Stop> Stops { get; set; }
        
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        //public int Favourites{ get; set; }
        public virtual ICollection<Comment> Comments { get; set; }
        //[NotMapped]
        public virtual ICollection<User> Favorites { get; set; }
    }
}
