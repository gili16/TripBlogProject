using Microsoft.Extensions.DependencyInjection;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using MyProject.Repository.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Repository
{
    public static class ServiceCollectionExtension
    {
        //הגדרת התלויות
        public static IServiceCollection myAddRepositories(this IServiceCollection service) {

            //service.AddScoped<IRepository<Book>, BookRepository>();
            service.AddScoped<IUserManageFavorite<User>, UserRepository>();
            service.AddScoped<IRepository<Track>, TrackRepository>();
            service.AddScoped<IRepository<Stop>, StopRepository>();
            service.AddScoped<IComment<Comment>, CommentRepository>();
            service.AddScoped<ICategory, CategoryRepository>();
            service.AddScoped<IRepository<Category>, CategoryRepository>();
            service.AddScoped<IRepository<Company>, CompanyRepository>();
            service.AddScoped<IRepository<DayPart>, DayPartRepository>();
            service.AddScoped<IRepository<Experience>, ExperienceRepository>();
            service.AddScoped<IRepository<Level>, LevelRepository>();
            service.AddScoped<IRepository<View>, ViewRepository>();
            service.AddScoped<IRepository<Status>, StatusRepository>();
            //service.AddScoped(typeof(IRepository<Book>), typeof(BookRepository));
            //user
            //...
            return service;
        }
    }
}
