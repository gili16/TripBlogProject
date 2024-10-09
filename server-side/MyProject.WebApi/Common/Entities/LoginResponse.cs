using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Common.Entities
{
    public class LoginResponse
    {
        public string Token { get; set; }
        public UserDto User { get; set; }
    }

}
