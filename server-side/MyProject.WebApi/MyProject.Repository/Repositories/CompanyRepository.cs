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
    public class CompanyRepository : IRepository<Company>
    {
        private readonly IContext _context;
        public CompanyRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Company> AddItemAsync(Company item)
        {
            var optionItem = await _context.Companies.FirstOrDefaultAsync(x => x.Description == item.Description);
            if (optionItem is null)
            {
                await _context.Companies.AddAsync(item);
                await _context.save();
                return item;
            }
            throw new Exception("option already exists");
        }

        public async Task DeleteItem(int id)
        {
            _context.Companies.Remove(await _context.Companies.FirstOrDefaultAsync(x => x.Id == id));
            await _context.save();
        }

        public async Task<List<Company>> getAllAsync()
        {
            return await _context.Companies.ToListAsync();
        }

        public async Task<Company> getAsync(int id)
        {
            return await _context.Companies.FirstOrDefaultAsync(x => x.Id == id);
        }

        public async Task UpdateItem(int id,Company item)
        {
            var optionItem = await _context.Companies.FirstOrDefaultAsync(x => x.Id == id);
            if (optionItem is null)
            {
                throw new Exception("item not found");
            }
            optionItem.Description = item.Description;
            _context.Companies.Update(optionItem);
            await _context.save();
        }
    }
}
