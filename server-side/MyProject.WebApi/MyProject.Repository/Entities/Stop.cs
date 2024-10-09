using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace MyProject.Repository.Entities
{
    public class Stop
    {
        //[Key]
        public int Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int TrackId { get; set; }
        [ForeignKey("TrackId")]
        public Track Track { get; set; }
    }
}
