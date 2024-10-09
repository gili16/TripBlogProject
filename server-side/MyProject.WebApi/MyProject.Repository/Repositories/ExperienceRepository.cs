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
    public class ExperienceRepository : IRepository<Experience>
    {
        private readonly IContext _context;
        public ExperienceRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Experience> AddItemAsync(Experience item)
        {
            var optionItem = await _context.Experience.FirstOrDefaultAsync(x => x.Description == item.Description);
            if (optionItem is null)
            {
                await _context.Experience.AddAsync(item);
                await _context.save();
                return item;
            }
            throw new Exception("option already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.Experience.Remove(await _context.Experience.FirstOrDefaultAsync(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Experience>> getAllAsync()
        {
            return await _context.Experience.ToListAsync();
        }

        public async Task<Experience> getAsync(int id)
        {
            return await _context.Experience.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id,Experience item)
        {
            var optionItem = await _context.Experience.FirstOrDefaultAsync(x => x.Id == id);
            if (optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            _context.Experience.Update(optionItem);
            await _context.save();
        }
    }
}
