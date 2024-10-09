
using Microsoft.EntityFrameworkCore;
using MyProject.Repository.Entities;
using System.Collections.Generic;

namespace MyProject.Repository.Interfaces
{
    public interface IContext
    {
        public DbSet<Stop> Stops { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Category> Categories{ get; set; }
        public DbSet<Company> Companies { get; set; }
        public DbSet<DayPart> DayParts { get; set; }
        public DbSet<Experience> Experience { get; set; }   
        //public DbSet<Favourites> Favorites { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<View> Views { get; set; }
        public Task save();
    }
}
