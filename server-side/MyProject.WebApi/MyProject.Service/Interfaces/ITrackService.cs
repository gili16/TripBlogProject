using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service.Interfaces
{
    public interface ITrackService:IService<TrackDto>
    {   
        Task<List<TrackDto>> GetByUserId(int id);
        Task<List<TrackDto>> GetByArea(string area);
        Task<List<TrackDto>> GetByText(string text);
        Task<List<TrackDto>> GetByOption(string option);
    }
}
