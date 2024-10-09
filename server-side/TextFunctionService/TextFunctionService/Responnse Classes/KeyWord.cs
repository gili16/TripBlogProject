using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service.Responnse_Classes
{
   
   

    // Define class to represent keyword
    public class KeyWord
    {
        public string Word { get; set; }
        public double DocumentFrequency { get; set; }
        public List<string> PosTags { get; set; }
        public double Score { get; set; }
    }
}
