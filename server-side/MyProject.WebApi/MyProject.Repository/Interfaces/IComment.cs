using MyProject.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Interfaces
{
    public interface IComment<T>:IRepository<Comment>
    {
        Task<List<T>> getAllByTrackIdAsync(int trackId);
    }
}
