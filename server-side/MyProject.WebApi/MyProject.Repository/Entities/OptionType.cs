using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Entities
{
    /*[NotMapped]*/
    public abstract class OptionType
    {
        public  int Id { get; set; }
        public string Description { get; set; }
    }
}
