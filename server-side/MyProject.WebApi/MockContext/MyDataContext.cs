using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MockContext
{
    public class MyDataContext : DbContext, IContext
    {
      //  public DbSet<Book> Books { get; set ; }
        public DbSet<User> Users { get; set; }
       // public DbSet<Lend> lends { get ; set ; }
        public DbSet<Stop> Stops { get; set; }
        public DbSet<Track> Tracks { get; set; }
        public DbSet<Comment> Comments { get; set; }
        public DbSet<Company> Companies { get ; set ; }
        public DbSet<DayPart> DayParts { get ; set ; }
        public DbSet<Experience> Experience { get ; set ; }
        public DbSet<Category> Categories { get; set; }
        //public DbSet<Favourites> Favorites { get; set; }
        public DbSet<Level> Levels { get; set; }
        public DbSet<Status> Statuses { get; set; }
        public DbSet<View> Views { get; set ; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            optionsBuilder.UseSqlServer("server=(localdb)\\MSSQLLocaldb;database=FinalProjectDbV7;trusted_connection=true");
            //optionsBuilder.UseQueryTrackingBehavior(QueryTrackingBehavior.NoTracking);
        }
        public async Task save()
        {
          await SaveChangesAsync();
        }
        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Configure one-to-many relationship between User and Track
            modelBuilder.Entity<Track>()
                .HasOne(t => t.User)
                .WithMany(u => u.Tracks)
                .HasForeignKey(t => t.UserId)
                .IsRequired(false); // If a track may not have a user, else set to true

            // Configure many-to-many relationship between User and Track for favorites
            modelBuilder.Entity<User>()
                .HasMany(u => u.Favourites)
                .WithMany(t => t.Favorites)
                .UsingEntity<Dictionary<string, object>>(
                    "UserFavoriteTracks",
                    j => j.HasOne<Track>().WithMany().HasForeignKey("TrackId"),
                    j => j.HasOne<User>().WithMany().HasForeignKey("UserId"),
                    j =>
                    {
                        j.Property<int>("Id");
                        j.HasKey("Id");
                        j.HasIndex("UserId", "TrackId").IsUnique();
                    });

            // Any additional configurations...
        }

    }
}
