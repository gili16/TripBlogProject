using Common.Entities;
using Microsoft.Extensions.DependencyInjection;
using MyProject.Repository;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using MyProject.Repository.Repositories;
using MyProject.Service.Interfaces;
using MyProject.Service.Services;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service
{
    public static class ServiceCollectionExtension
    {
        //הגדרת התלויות
        public static IServiceCollection myAddServices(this IServiceCollection service) {

            service.myAddRepositories();
            //service.AddScoped<IService<BookDto>, BookService>();
            //service.AddScoped(typeof(IService<BookDto>),typeof(BookService));
            service.AddScoped<IUserManageFavoriteService, UserService>();
            service.AddScoped<ITrackService, TrackService>();
            service.AddScoped<IService<StopDto>, StopService>();
            service.AddScoped<ICommentService, CommentService>();
            service.AddScoped(typeof(OptionTypeService<,>));
            //user
            //...
            service.AddAutoMapper(typeof(MapperProfile));
            return service;
        }
    }
}
