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
    public class StopRepository:IRepository<Stop>
    {
        private readonly IContext _context;
        public StopRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Stop> AddItemAsync(Stop item)
        {
            await _context.Stops.AddAsync(item);
            await _context.save();
            return item;
        }

        public async Task DeleteItem(int id)
        {
            _context.Stops.Remove(await getAsync(id));
            await _context.save();
        }

        public async Task<Stop> getAsync(int id)
        {
            return await _context.Stops.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task<List<Stop>> getAllAsync()
        {
            return await _context.Stops.ToListAsync();
        }

        public async Task UpdateItem(int id,Stop item)
        {
            var stop = await getAsync(id);
            stop.X = item.X;
            stop.Y = item.Y;
            stop.TrackId = item.TrackId;
            _context.Stops.Update(stop);
            await _context.save();
        }

       
    }
}
