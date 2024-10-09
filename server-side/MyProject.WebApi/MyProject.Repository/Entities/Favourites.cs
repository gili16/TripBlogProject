using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Entities
{
    [PrimaryKey(nameof(UserId), nameof(TrackId))]
    public class Favourites
    {
        
        public int UserId { get; set; }
        [ForeignKey("UserId")]
        public User User { get; set; }
        
        public int TrackId { get; set; }
        [ForeignKey("TrackId")]
        public Track Track { get; set; }

    }
}
