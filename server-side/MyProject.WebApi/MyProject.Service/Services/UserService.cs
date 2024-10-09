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
    public class UserService : IUserManageFavoriteService
    {
        private readonly IUserManageFavorite<User> repository;
        private readonly IMapper mapper;
        public UserService(IUserManageFavorite<User> repository,IMapper _mapper)
        {
            this.repository = repository;
            this.mapper = _mapper;
        }

        public async Task AddFavorite(int userId, TrackDto favorite)
        {
            await repository.AddFavorite(userId, mapper.Map<Track>(favorite));
        }

        public async Task<UserDto> AddItemAsync(UserDto item)
        {
           return mapper.Map<UserDto>(await repository.AddItemAsync(mapper.Map<User>(item)));
        }

        public async Task DeleteFavorite(int userId, TrackDto favorite)
        {
            await repository.DeleteFavorite(userId, mapper.Map<Track>(favorite));
        }

        public async Task DeleteItem(int id)
        {
          await  repository.DeleteItem(id);
        }

        public async Task<List<UserDto>> GetAllAsync()
        {
           return mapper.Map<List<UserDto>>( await repository.getAllAsync());
        }

        public async Task<UserDto> GetByIdAsync(int id)
        {
            return mapper.Map<UserDto>(await repository.getAsync(id));
        }

        public async Task<UserDto> Login(string mail)
        {
            return mapper.Map<UserDto>(await repository.Login(mail));
        }

        public  async Task UpdateItem(int id, UserDto item)
        {
             await repository.UpdateItem(id, mapper.Map<User>(item));
        }
    }
}
