using MyProject.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Interfaces
{
    public interface IUserManageFavorite<T>:ILogin<User>
    {
        Task DeleteFavorite(int userId, Track favorite);
        Task AddFavorite(int userId, Track favorite);
    }
}
