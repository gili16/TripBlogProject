using MyProject.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Interfaces
{
    public interface ILogin<T> : IRepository<User>
    {
        Task<User> Login(string mail);
    }
}
