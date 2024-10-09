using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace MyProject.Repository.Repositories
{
    public class CommentRepository:IComment<Comment>
    {
        private readonly IContext _context;
        public CommentRepository(IContext context)
        {
            _context = context;

        }
        public async Task<Comment> AddItemAsync(Comment item)
        {
            await _context.Comments.AddAsync(item);
            await _context.save();
            return item;

        }

        public async Task DeleteItem(int id)
        {
            _context.Comments.Remove(await getAsync(id));
            await _context.save();
        }

        public async Task<Comment> getAsync(int id)
        {
            return await _context.Comments.FirstOrDefaultAsync(x => x.Id == id);
        }
        public async Task<List<Comment>> getAllByTrackIdAsync(int trackId)
        {
            return await _context.Comments.Where(x => x.TrackId == trackId).ToListAsync();
        }
        public async Task<List<Comment>> getAllAsync()
        {
            return await _context.Comments.ToListAsync();
        }

        public async Task UpdateItem(int id,Comment item)
        {
            var comment = await getAsync(id);
            comment.PostDate = item.PostDate;
            //comment.UserId = item.UserId;
            comment.TrackId = item.TrackId;
            comment.Context = item.Context;
            _context.Comments.Update(comment);
            await _context.save();
        }

        
    }
}
