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
    public class StatusRepository : IRepository<Status>
    {
        private readonly IContext _context;
        public StatusRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Status> AddItemAsync(Status item)
        {
            var optionItem = await _context.Statuses.FirstOrDefaultAsync(x => x.Description == item.Description);
            if (optionItem is null)
            {
                await _context.Statuses.AddAsync(item);
                await _context.save();
                return item;
            }
            throw new Exception("option already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.Statuses.Remove(await _context.Statuses.FirstOrDefaultAsync(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Status>> getAllAsync()
        {
            return await _context.Statuses.ToListAsync();
        }

        public async Task<Status> getAsync(int id)
        {
            return await _context.Statuses.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id,Status item)
        {
            var optionItem = await _context.Statuses.FirstOrDefaultAsync(x => x.Id == id);
            if (optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            _context.Statuses.Update(optionItem);
            await _context.save();
        }
    }
}
