using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class CommentDto
    {
        public int? Id { get; set; }
        public string Context { get; set; }
        public DateTime PostDate { get; set; }
        //public int UserId { get; set; }
        
        public int TrackId { get; set; }
    }
}
