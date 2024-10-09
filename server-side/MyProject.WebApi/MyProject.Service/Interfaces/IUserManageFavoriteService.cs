using Common.Entities;
using MyProject.Repository.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service.Interfaces
{
    public interface IUserManageFavoriteService:ILoginService
    {
        Task DeleteFavorite(int userId, TrackDto favorite);
        Task AddFavorite(int userId, TrackDto favorite);
    }
}
