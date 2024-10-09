using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service.Interfaces
{
    public interface ILoginService : IService<UserDto>
    {
        Task<UserDto> Login(string mail);
    }
}
