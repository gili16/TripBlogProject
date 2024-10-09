﻿using Common.Entities;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MyProject.Service.Interfaces
{
    public interface ICommentService:IService<CommentDto>
    {
        Task<List<CommentDto>> GetAllByTrackId(int trackId);
    }
}
