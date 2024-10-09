using AutoMapper;
using Common.Entities;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using MyProject.Service.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service.Services
{
    public class CommentService:ICommentService
    {
        private readonly IComment<Comment> repository;
        private readonly IMapper mapper;
        public CommentService(IComment<Comment> repository, IMapper _mapper)
        {
            this.repository = repository;
            this.mapper = _mapper;
        }

        public async Task<CommentDto> AddItemAsync(CommentDto item)
        {
           return mapper.Map<CommentDto>(await repository.AddItemAsync(mapper.Map<Comment>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<CommentDto>> GetAllAsync()
        {
            return mapper.Map<List<CommentDto>>(await repository.getAllAsync());
        }

        public async Task<List<CommentDto>> GetAllByTrackId(int trackId)
        {
            return mapper.Map<List<CommentDto>>(await repository.getAllByTrackIdAsync(trackId));
        }

        public async Task<CommentDto> GetByIdAsync(int id)
        {
            return mapper.Map<CommentDto>(await repository.getAsync(id));
        }
        
        public async Task UpdateItem(int id,CommentDto item)
        {
            await repository.UpdateItem(id,mapper.Map<Comment>(item));
        }
    }
}
