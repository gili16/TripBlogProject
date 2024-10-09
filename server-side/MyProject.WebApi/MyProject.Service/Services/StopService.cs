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
    public class StopService:IService<StopDto>
    {
        private readonly IRepository<Stop> repository;
        private readonly IMapper mapper;
        public StopService(IRepository<Stop> repository, IMapper _mapper)
        {
            this.repository = repository;
            this.mapper = _mapper;
        }

        public async Task<StopDto> AddItemAsync(StopDto item)
        {
            return mapper.Map<StopDto>(await repository.AddItemAsync(mapper.Map<Stop>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<StopDto>> GetAllAsync()
        {
            return mapper.Map<List<StopDto>>(await repository.getAllAsync());
        }

        public async Task<StopDto> GetByIdAsync(int id)
        {
            return mapper.Map<StopDto>(await repository.getAsync(id));
        }

        public async Task UpdateItem(int id, StopDto item)
        {
            await repository.UpdateItem(id, mapper.Map<Stop>(item));
        }
    }
}
