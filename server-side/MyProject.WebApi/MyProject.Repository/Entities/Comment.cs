using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Entities
{
    public class Comment
    {
        public int Id { get; set; }
        public string Context { get; set; }
        public DateTime PostDate { get; set; }

        //public int UserId { get; set; }
        //[ForeignKey("UserId")]
        //public User User { get; set; }
        public int TrackId { get; set; }
        [ForeignKey("TrackId")]
        public Track Track { get; set; }
    }
}
