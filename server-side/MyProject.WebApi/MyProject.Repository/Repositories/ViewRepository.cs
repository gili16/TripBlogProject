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
    public class ViewRepository : IRepository<View>
    {
        private readonly IContext _context;
        public ViewRepository(IContext context)
        {
            _context = context;

        }
        public async Task<View> AddItemAsync(View item)
        {
            var optionItem = await _context.Views.FirstOrDefaultAsync(x => x.Description == item.Description);
            if (optionItem is null)
            {
                await _context.Views.AddAsync(item);
                await _context.save();
                return item;
            }
            throw new Exception("option already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.Views.Remove(await _context.Views.FirstOrDefaultAsync(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<View>> getAllAsync()
        {
            return await _context.Views.ToListAsync();
        }

        public async Task<View> getAsync(int id)
        {
            return await _context.Views.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id, View item)
        {
            var optionItem =await _context.Views.FirstOrDefaultAsync(x => x.Id == id);
            if(optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            _context.Views.Update(optionItem);
            await _context.save();
        }
    }
}
