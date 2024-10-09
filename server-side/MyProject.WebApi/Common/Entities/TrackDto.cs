using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class TrackDto
    {
        public int? Id { get; set; }
        public double StartX { get; set; }
        public double StartY { get; set; }
        public double EndX { get; set; }
        public double EndY { get; set; }
        public Byte[]? PictureData { get; set; }
        public IFormFile? PictureForm { get; set; }
        public string? Picture { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime Created { get; set; }
        public int Length { get; set; }
        public int ViewId { get; set; }
        public int LevelId { get; set; }
        //public int CategoryId { get; set; }
        public int CompanyForTripId { get; set; }
        public int DayPartId { get; set; }
        public int UserId { get; set; }
        public int Favourites { get; set; }
        public List<int>? Categories { get; set;}
        public  List<StopDto>? Stops { get; set; }
        public List<CommentDto>? Comments { get; set; }
    }
}
