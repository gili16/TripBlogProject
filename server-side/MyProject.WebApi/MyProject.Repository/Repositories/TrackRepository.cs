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
    public class TrackRepository:IRepository<Track>
    {
        private readonly IContext _context;
        public TrackRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Track> AddItemAsync( Track item)
        {
            
            await _context.Tracks.AddAsync(item);
            await _context.save();
            return item;
        }
        
        public async Task DeleteItem(int id)
        {
            var stops = await _context.Stops.ToListAsync();
            foreach (var stop in stops)
            {
                if (stop.TrackId == id)
                {
                   _context.Stops.Remove(stop);
                }
            }
            var comments = await _context.Comments.ToListAsync();
            foreach (var comment in comments)
            {
                if (comment.TrackId == id)
                {
                    _context.Comments.Remove(comment);
                }
            }
            _context.Tracks.Remove(await _context.Tracks.FirstOrDefaultAsync(x=>x.Id==id));
            await _context.save();
        }

        public async Task<Track> getAsync(int id)
        {
            return await _context.Tracks.Include(t => t.Favorites).Include(t => t.Categories).FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Track>> getAllAsync()
        {
            return await _context.Tracks.Include(t => t.Favorites).Include(t => t.Categories).ToListAsync();
        }

        public async Task UpdateItem(int id,Track item)
        {
            var track = await _context.Tracks.Include(t => t.Categories).FirstOrDefaultAsync(x => x.Id == id);
            track.StartX = item.StartX;
            track.StartY = item.StartY;
            track.EndX = item.EndX;
            track.EndY = item.EndY;
            track.Picture = item.Picture;
            track.Description=item.Description;
            track.Created = item.Created;
            if(track.Categories is null)
                track.Categories = new List<Category>();
            foreach(var category in track.Categories)
            {
                track.Categories.Remove(category);
            }
            track.Categories.Clear();
            foreach (Category category in item.Categories)
            {
                track.Categories.Add(category);
            }
            //track.CategoryId = item.CategoryId;
            track.CompanyForTripId = item.CompanyForTripId;
            track.DayPartId=item.DayPartId;
            track.Length = item.Length;
            track.LevelId= item.LevelId;
            //track.UserId= item.UserId;
            track.Title = item.Title;
            track.ViewId = item.ViewId;
            //track.Favourites=item.Favourites;
            _context.Tracks.Update(track);
            await _context.save();
        }
    }
}
