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
using System.Net.Http;
using Newtonsoft.Json;
using MyProject.Service.Responnse_Classes;
using ServiceReference2;
using Newtonsoft.Json.Linq;
using ServiceReference2;

namespace MyProject.Service.Services
{
    public class TrackService : ITrackService
    {
        private readonly IRepository<Track> repository;
        private readonly IComment<Comment> repository1;
        private readonly IRepository<Stop> repository2;
        private readonly ICategory repository3;
        private readonly IRepository<Company> companyRepository;
        private readonly IRepository<Level> levelRepository;
        private readonly IRepository<DayPart> dayPartRepository;
        private readonly IRepository<View> viewRepository;
        private readonly IMapper mapper;
        public TrackService(IRepository<Track> repository, IComment<Comment> repository1, IMapper _mapper, IRepository<Stop> repository2, ICategory repository3, IRepository<Company> companyRepository, IRepository<Level> levelRepository, IRepository<DayPart> dayPartRepository, IRepository<View> viewRepository)
        {
            this.repository = repository;
            this.repository1 = repository1;
            this.mapper = _mapper;
            this.repository2 = repository2;
            this.repository3 = repository3;
            this.companyRepository = companyRepository;
            this.levelRepository = levelRepository;
            this.dayPartRepository = dayPartRepository;
            this.viewRepository = viewRepository;
        }

        public async Task<TrackDto> AddItemAsync(TrackDto item)
        {
            await AddCategory(item);
            List<int> lst = item.Categories;
            item.Categories = null;
            Track track = mapper.Map<Track>(item);
            track.Categories.Clear();
            foreach(int category in lst)
            {
                track.Categories.Add(await repository3.getAsync(category)); 
            }
            Track t2=new Track();
            track = await repository.AddItemAsync(track);
            t2.Picture=track.Picture;
            t2.Comments=track.Comments;
            t2.Stops=track.Stops;
            
            t2.CompanyForTripId = track.CompanyForTripId;
            t2.UserId = track.UserId;
            t2.Id = track.Id;
            t2.EndX = track.EndX;
            t2.EndY = track.EndY;
            t2.Created = track.Created;
            t2.Description = track.Description;
            
            t2.Length = track.Length;
            t2.LevelId = track.LevelId;
            t2.StartX = track.StartX;
            t2.StartY = track.StartY;
            t2.Title = track.Title;
            t2.ViewId = track.ViewId;
            
            t2.DayPartId = track.DayPartId;
            //List<int> lst2 = new List<int>();
            lst.Clear();
            foreach(Category category in track.Categories)
            {
                lst.Add(category.Id);
            }
            
            TrackDto t3=mapper.Map<TrackDto>(t2);
            t3.Categories = lst;
            return t3;
        }

        public async Task DeleteItem(int id)
        {
            
            await repository.DeleteItem(id);
        }

        public async Task<List<TrackDto>> GetAllAsync()
        {
            List<TrackDto> trackDtos = mapper.Map<List<TrackDto>>(await repository.getAllAsync());
            foreach (var trackDto in trackDtos)
            {
                List<CommentDto> commentDtos = mapper.Map<List<CommentDto>>(await repository1.getAllAsync());
                trackDto.Comments = new List<CommentDto>();
                trackDto.Comments = commentDtos.Where(x => x.TrackId == trackDto.Id).ToList();
                trackDto.Stops = new List<StopDto>();
                List<StopDto> stopDtos = mapper.Map<List<StopDto>>(await repository2.getAllAsync());
                trackDto.Stops = stopDtos.Where(x => x.TrackId == trackDto.Id).ToList();
                Track track = await repository.getAsync((int)trackDto.Id);
                trackDto.Categories = new List<int>();
                if (track.Categories != null)
                {
                    foreach (var category in track.Categories)
                    {
                        trackDto.Categories.Add(category.Id);

                    }
                }
                trackDto.Favourites = ((track.Favorites is not null)?track.Favorites.Count():0);
                //Track track = await repository.getAsync((int)trackDto.Id);
                //trackDto.Favourites = track.Users.Count();
            }
            return trackDtos;
        }
        

        public async Task<TrackDto> GetByIdAsync(int id)
        {
            TrackDto trackDto = mapper.Map<TrackDto>(await repository.getAsync(id));
            
            List<CommentDto> commentDtos = mapper.Map<List<CommentDto>>(await repository1.getAllAsync());
            trackDto.Comments = new List<CommentDto>();
            trackDto.Comments = commentDtos.Where(x => x.TrackId == trackDto.Id).ToList();
            List<StopDto> stopDtos = mapper.Map<List<StopDto>>(await repository2.getAllAsync());
            trackDto.Stops = new List<StopDto>();
            trackDto.Stops = stopDtos.Where(x => x.TrackId == trackDto.Id).ToList();
            Track track = await repository.getAsync((int)trackDto.Id);
            trackDto.Categories = new List<int>();
            foreach (var category in track.Categories)
            {
                trackDto.Categories.Add(category.Id);

            }
            trackDto.Favourites = ((track.Favorites is not null) ? track.Favorites.Count() : 0);
            //Track track = await repository.getAsync((int)trackDto.Id);
            //trackDto.Favourites = track.Users.Count();
            return trackDto;
        }

        public async Task UpdateItem(int id, TrackDto item)
        {
            await AddCategory(item);
            List<int> lst = item.Categories;
            item.Categories = null;
            Track track = mapper.Map<Track>(item);
            track.Categories.Clear();
            foreach (int category in lst)
            {
                track.Categories.Add(await repository3.getAsync(category));
            }
            await repository.UpdateItem(id, track);
        }
        public async Task AddCategory(TrackDto trackDto)
        {
            trackDto.Categories=new List<int>();
            
            List<Category> categories = await repository3.getAllAsync();
            Service1Client service1Client = new Service1Client();
            //string description = await service1Client.TranslateTextAsync(trackDto.Description);
            //string title = await service1Client.TranslateTextAsync(trackDto.Title);
            //string[] keywords = await service1Client.GetNounsAsync(trackDto.Description);
            string[] keywords = await service1Client.GetKeyWordsAsync(text);
            string[] titleKeywords = await service1Client.GetKeyWordsAsync(trackDto.Title);
            string[] words = keywords.Concat(titleKeywords).ToArray();
            int[] cat=new int[categories.Count];
            foreach (Category category in categories)
            {
                foreach(string keyword in words)
                {
                    double? score = await service1Client.GetSimilarityAsync(category.Description, keyword);
                    Console.WriteLine(score);
                    if (score is not null&& score>=0.5)
                    {

                        //trackDto.Categories.Add((int)category.Id);
                        cat[(int)category.Id - 1]++;
                    }
                }
            }
            for (int i = 0; i < cat.Length; i++)
            {
                if (cat[i] > 0)
                {
                    trackDto.Categories.Add(i + 1);
                }
            }
        }

        public async Task<List<TrackDto>> GetByUserId(int id)
        {
            List<TrackDto> tracks = await GetAllAsync();
            return tracks.FindAll(x => x.UserId == id);
        }

        public async Task<List<TrackDto>> GetByArea(string area)
        {
            List<TrackDto> trackDtos = await GetAllAsync();
            if (area == "north")
                return trackDtos.FindAll(x => x.StartX >= 32.42042714579943);
            else
            {
                if (area == "south")
                    return trackDtos.FindAll(x => x.StartX <= 31.823852989997487);
                else
                {
                    if (area == "center")
                        return trackDtos.FindAll(x => x.StartX >= 31.823852989997487 && x.StartX <= 32.42042714579943);
                    else
                        throw new Exception("no such area");
                }
            }
            
        }

        public async Task<List<TrackDto>> GetByText(string text)
        {
            Category [] categories=(await repository3.getAllAsync()).ToArray();
            Service1Client service1Client = new Service1Client();
            //string translatedText = await service1Client.TranslateTextAsync(text);
            //string[] keywords = await service1Client.GetNounsAsync(text);
            string[] keywords = await service1Client.GetKeyWordsAsync(text);
            List<TrackDto> trackDtos=await GetAllAsync();
            bool[] hasMatchCategory=new bool[categories.Length];
            //bool[] hasMatchKeyword = new bool[keywords.Length];
            double? score=null;
            for (int i = 0; i < categories.Length; i++)
            {
                if (!hasMatchCategory[i])
                {
                    for (int j = 0; j < keywords.Length; j++)
                    {
                        //if (!hasMatchKeyword[i])
                        //{
                            score =await service1Client.GetSimilarityAsync(categories[i].Description, keywords[j]);
                            if(score is not null && score >= 0.5)
                            {
                                hasMatchCategory[i] = true;
                                //hasMatchKeyword[j] = true;
                                break;
                            }
                        //}
                    }
                }
            }
            for (int i = 0; i < categories.Length; i++)
            {
                if (hasMatchCategory[i] && categories[i].ParentCategoryId is not null)
                {
                    List<Category> subCategories = await repository3.GetSubtreeList(categories[i]);
                    foreach (var category in subCategories)
                    {
                        int index = -1;
                        for (int j = 0; j < categories.Length; j++)
                        {
                            if (categories[j].Id == category.Id)
                            {
                                index = j;
                                break;
                            }
                        }
                        if (index != -1)
                        {
                            hasMatchCategory[index] = true;
                        }
                    }
                }
                else
                {
                    if (categories[i].ParentCategoryId is null)
                    {
                        hasMatchCategory[i] = false;
                    }
                }
            }
            bool flag = false;
            List<TrackDto> finalTracks=new List<TrackDto>();
            foreach(TrackDto trackDto in trackDtos)
            {
                for (int i = 0; i < categories.Length; i++)
                {
                    if (hasMatchCategory[i]&&trackDto.Categories.Exists(x => x == categories[i].Id))
                    {
                        finalTracks.Add(trackDto);
                        break;
                    }
                }
            }
            
            return finalTracks;
        }

        public async Task<List<TrackDto>> GetByOption(string option)
        {
            List<TrackDto> trackDtos = mapper.Map<List<TrackDto>>(await repository.getAllAsync());
            List<TrackDto> finalTracks = new List<TrackDto>();
            List<View> views =await viewRepository.getAllAsync();
            List<Company> companies=await companyRepository.getAllAsync();
            trackDtos.ForEach(async x => { 
                if (x.ViewId!=null&&x.CompanyForTripId!=null&&((views.Find(z=>z.Id==x.ViewId)).Description==option|| (companies.Find(z => z.Id == x.CompanyForTripId)).Description==option)) {
                    finalTracks.Add(x);
                }            
            });
            return finalTracks;
        }
        


    }
}

