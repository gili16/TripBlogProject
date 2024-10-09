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
    public class LevelRepository : IRepository<Level>
    {
        private readonly IContext _context;
        public LevelRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Level> AddItemAsync(Level item)
        {
            var optionItem = await _context.Levels.FirstOrDefaultAsync(x => x.Description == item.Description);
            if (optionItem is null)
            {
                await _context.Levels.AddAsync(item);
                await _context.save();
                return item;
            }
            throw new Exception("option already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.Levels.Remove(await _context.Levels.FirstOrDefaultAsync(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Level>> getAllAsync()
        {
            return await _context.Levels.ToListAsync();
        }

        public async Task<Level> getAsync(int id)
        {
            return await _context.Levels.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id,Level item)
        {
            var optionItem = await _context.Levels.FirstOrDefaultAsync(x => x.Id == id);
            if (optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            _context.Levels.Update(optionItem);
            await _context.save();
        }
    }
}
