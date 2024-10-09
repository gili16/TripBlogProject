using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class StopDto
    {
        public int? Id { get; set; }
        public double X { get; set; }
        public double Y { get; set; }
        public int TrackId { get; set; }
    }
}
