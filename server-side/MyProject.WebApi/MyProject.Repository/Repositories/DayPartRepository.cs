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
    public class DayPartRepository:IRepository<DayPart>
    {
        private readonly IContext _context;
        public DayPartRepository(IContext context)
        {
            _context = context;

        }
        public async Task<DayPart> AddItemAsync(DayPart item)
        {
            var optionItem = await _context.DayParts.FirstOrDefaultAsync(x => x.Description == item.Description);
            if (optionItem is null)
            {
                await _context.DayParts.AddAsync(item);
                await _context.save();
                return item;
            }
            throw new Exception("option already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.DayParts.Remove(await _context.DayParts.FirstOrDefaultAsync(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<DayPart>> getAllAsync()
        {
            return await _context.DayParts.ToListAsync();
        }

        public async Task<DayPart> getAsync(int id)
        {
            return await _context.DayParts.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id,DayPart item)
        {
            var optionItem = await _context.DayParts.FirstOrDefaultAsync(x => x.Id == id);
            if (optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            _context.DayParts.Update(optionItem);
            await _context.save();
        }
    }
}
