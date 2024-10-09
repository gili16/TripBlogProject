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
    public class OptionTypeService<T,V>:IService<V>
        where T : OptionType
        where V:OptionTypeDto
    {
        private readonly IRepository<T> repository;
        private readonly IMapper mapper;
        public OptionTypeService(IRepository<T> repository, IMapper _mapper)
        {
            this.repository = repository;
            this.mapper = _mapper;
        }

        public async Task<V> AddItemAsync(V item)
        {
           return mapper.Map<V>(await repository.AddItemAsync(mapper.Map<T>(item)));
        }

        public async Task DeleteItem(int id)
        {
            await repository.DeleteItem(id);
        }

        public async Task<List<V>> GetAllAsync()
        {
            return mapper.Map<List<V>>(await repository.getAllAsync());
        }

        

        public async Task<V> GetByIdAsync(int id)
        {
            return mapper.Map<V>(await repository.getAsync(id));
        }
        
        public async Task UpdateItem(int id, V item)
        {
            await repository.UpdateItem(id, mapper.Map<T>(item));
        }
    }
}
