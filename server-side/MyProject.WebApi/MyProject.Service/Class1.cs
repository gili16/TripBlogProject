using AutoMapper;
using Common.Entities;
using MyProject.Repository.Entities;
using MyProject.Repository.Interfaces;
using MyProject.Repository.Repositories;

namespace MyProject.Service
{
    public class MapperProfile:Profile
    {
        public MapperProfile()
        {
            //CreateMap<Book, BookDto>().ReverseMap();
            CreateMap<User, UserDto>().ReverseMap();
            //CreateMap<Track, TrackDto>().ReverseMap();
            CreateMap<OptionType, OptionTypeDto>().ReverseMap();
            CreateMap<Status, StatusDto>().ReverseMap();
            CreateMap<Category, CategoryDto>().ReverseMap();
            CreateMap<Level, LevelDto>().ReverseMap();
            CreateMap<View, ViewDto>().ReverseMap();
            CreateMap<Experience, ExperienceDto>().ReverseMap();
            CreateMap<DayPart, DayPartDto>().ReverseMap();
            CreateMap<Company, CompanyDto>().ReverseMap();
            CreateMap<Stop, StopDto>().ReverseMap();
            CreateMap<Comment, CommentDto>().ReverseMap();
            // CreateMap configuration in your AutoMapper profile
            CreateMap<TrackDto, Track>()
                .ForMember(dest => dest.Favorites, opt => opt.MapFrom(src => MapFavourites()))
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => MapIntToCategories(src.Categories)));

            CreateMap<Track, TrackDto>()
                .ForMember(dest => dest.Favourites, opt => opt.MapFrom(src => MapFavouriteUsers(src.Favorites)))
                .ForMember(dest => dest.Categories, opt => opt.MapFrom(src => MapCategoriesToInt(src.Categories)));

            // Custom method to map Favourites from TrackDto to Track
            

            //CreateMap<List<User>, List<UserDto>>().ReverseMap();
            //CreateMap<List<Track>, List<TrackDto>>().ReverseMap();
            // CreateMap<BookDto, Book>();
        }
        public ICollection<User> MapFavourites()
        {
            // Fetch User entities based on the provided user IDs
            //var favouriteUsers = userRepository.GetUsersByIds(favouriteUserIds);

            // Return the collection of fetched User entities
            return new List<User>();
        }

        // Custom method to map Favourites from Track to TrackDto
        public int MapFavouriteUsers(ICollection<User> favouriteUsers)
        {
            // Extract user IDs from the provided User entities
            var favouriteUserIds = favouriteUsers.Select(u => u.Id).ToList().Count();

            // Return the collection of user IDs
            return favouriteUserIds;
        }
        public List<int> MapCategoriesToInt(ICollection<Category> categories)
        {
            // Extract user IDs from the provided User entities
            var ints = categories.Select(c => c.Id).ToList();

            // Return the collection of user IDs
            return ints;
        }
        public List<Category> MapIntToCategories(ICollection<int> categories)
        {
            // Extract user IDs from the provided User entities
            //var ints = categories.Select(c => c.Id).ToList();

            // Return the collection of user IDs
            return new List<Category>();
        }

    }
}