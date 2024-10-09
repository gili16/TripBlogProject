using Microsoft.EntityFrameworkCore;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository.Repositories
{
    public class UserRepository : IUserManageFavorite<User>
    {
        private readonly IContext _context;
        public UserRepository(IContext context)
        {
            _context = context;
            
        }
        public async Task<User> AddItemAsync(User item)
        {
            var user=await _context.Users.FirstOrDefaultAsync(x=>x.Mail==item.Mail);
            if (user is null)
            {
                await _context.Users.AddAsync(item);
                await _context.save();
                return item; 
            }
            throw new Exception("a user with the same mail address already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.Users.Remove( await _context.Users.FirstOrDefaultAsync(x=>x.Id==id));
            await _context.save();
        }

        public async Task<User> getAsync(int id)
        {
            return await _context.Users.Include(u => u.Favourites).Include(u => u.Tracks).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<User>> getAllAsync()
        {
            return await _context.Users.Include(u => u.Favourites).Include(u => u.Tracks).ToListAsync();
        }

        public async Task UpdateItem(int id,User item)
        {
            var user =await _context.Users.Include(u => u.Favourites).FirstOrDefaultAsync(x => x.Id == id);
            user.Name = item.Name;
            user.Mail = item.Mail;
            user.ProfilePicture = item.ProfilePicture;
            user.AdressX = item.AdressX;
            user.AdressY=item.AdressY;
            user.BirthDate=item.BirthDate;
            user.ExperienceId=item.ExperienceId;
            user.StatusId=item.StatusId;
            if(user.Favourites is null)
            {
                
                user.Favourites = new List<Track>();
            }
            user.Favourites.Clear();
            if (item.Favourites != null)
            {
                foreach (Track track in item.Favourites)
                {
                    Track favoriteTrack = await _context.Tracks.FirstOrDefaultAsync(x => x.Id == track.Id);
                    user.Favourites.Add(favoriteTrack);
                }
            }
            _context.Users.Update(user);
            await _context.save();
        }

        public async Task<User> Login(string mail)
        {
            if ((await _context.Users.CountAsync(x => x.Mail == mail)) > 1)
                throw new Exception("more than one user with the same email");
            return await _context.Users.FirstOrDefaultAsync(x => x.Mail.ToLower() == mail.ToLower());
        }

        public async Task DeleteFavorite(int userId, Track favorite)
        {
            var user=await _context.Users.Include(u => u.Favourites).FirstOrDefaultAsync(x => x.Id == userId);
            if(user != null)
            {
                var track = user.Favourites.FirstOrDefault(x => x.Id == favorite.Id);
                if (track != null)
                {
                    user.Favourites.Remove(track);
                    //_context.Users.Update(user);
                    await _context.save();
                }
                else
                {
                    throw new Exception("favorite not found");
                }
            }
            else
            {
                throw new Exception("user not found");
            }
        }

        public async Task AddFavorite(int userId, Track favorite)
        {
            var existingTrack = _context.Tracks.Local.FirstOrDefault(t => t.Id == favorite.Id);
            if (existingTrack == null)
            {
                _context.Tracks.Attach(favorite);
            }
            var user = await _context.Users.Include(u => u.Favourites).FirstOrDefaultAsync(x => x.Id == userId);
            if (user != null)
            {
                var track = await _context.Tracks.FirstOrDefaultAsync(x => x.Id == favorite.Id);
                if (track == null)
                {
                    throw new Exception("favorite already assigned");
                }
                else
                {
                    user.Favourites.Add(favorite);
                    //_context.Users.Update(user);
                    await _context.save();
                }
            }
            else
            {
                throw new Exception("user not found");
            }
        }
    }
}
