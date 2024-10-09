using Common.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProject.Service.Interfaces;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TrackController : ControllerBase
    {
        private readonly ITrackService service;
        public TrackController(ITrackService service)
        {
            this.service = service;
        }

        // GET: api/<RoleController>
        [HttpGet]
        
        public async Task<ActionResult<List<TrackDto>>> Get()
        {
            try 
            {
                List<TrackDto> tracks = await service.GetAllAsync();
                tracks.ForEach(x=>AttachPicture(x));
                return Ok(tracks);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        private TrackDto AttachPicture(TrackDto track)
        {
            if (track != null)
            {
                string path = track.Picture.Substring(track.Picture.LastIndexOf('/') + 1);
                var filePath = Path.Combine(Environment.CurrentDirectory, "Images/", path);

                // Check if the video file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return null;
                }

                // Read the video file as a byte array
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                track.PictureData = fileBytes;
                return track;
            }
            throw new Exception("user not found...");
        }
        // GET api/<RoleController>/5

        [HttpGet("{id}")]
        public async Task<ActionResult<TrackDto>> Get(int id)
        {
            try { 
            TrackDto track=await service.GetByIdAsync(id);
            
            AttachPicture(track);
            return Ok(track);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("TracksByOption/{option}")]
        public async Task<ActionResult<List<TrackDto>>> Get(string option)
        {
            try
            {
                List<TrackDto> tracks = await service.GetByOption(option);

                tracks.ForEach(x => AttachPicture(x));
                return Ok(tracks);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("MyTracks/{id}")]
        [Authorize]
        public async Task<ActionResult<List<TrackDto>>> GetByUserId(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null)
                {
                    return BadRequest("Hacker Alert!");
                }
                if (userId != id)
                {
                    return BadRequest("Hacker Alert!");
                }
                List<TrackDto> tracks = await service.GetByUserId(id);
                tracks.ForEach(x => AttachPicture(x));
                return Ok(tracks);
                
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("TracksByArea/{area}")]
        public async Task<ActionResult<List<TrackDto>>> GetByArea(string area)
        {
            try
            {
                List<TrackDto> tracks =await service.GetByArea(area);
                tracks.ForEach(x => AttachPicture(x));
                return Ok(tracks);
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("TracksByText/{text}")]
        public async Task<ActionResult<List<TrackDto>>> GetByText(string text)
        {
            try
            {
                List<TrackDto> tracks =await service.GetByText(text) ;
                tracks.ForEach(x => AttachPicture(x));
                return Ok(tracks);
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet("picture/{id}")]
        public async Task<FileContentResult> GetPicture(int id)
        {
            try
            {
                
                TrackDto track = await service.GetByIdAsync(id);
                string path = track.Picture.Substring(track.Picture.LastIndexOf('/') + 1);
                var filePath = Path.Combine(Environment.CurrentDirectory, "Images/", path);

                // Check if the video file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return null;
                }

                // Read the video file as a byte array
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                //track.PictureForm = System.IO.File.OpenRead(filePath);
                // Set the content type header based on the file extension
                var fileExtension = Path.GetExtension(track.Picture).ToLowerInvariant();
                var contentType = "application/octet-stream"; // Default content type for binary files
                if (fileExtension == ".mp4")
                {
                    contentType = "video/mp4";
                }
                else
                {
                    if (fileExtension == ".jpeg" || fileExtension == ".jpg" || fileExtension == "png")
                    {
                        contentType = "image/" + fileExtension.Substring(1);
                    }
                }
                // Add other supported video file extensions and corresponding content types here

                // Return the file as a download attachment
                return File(fileBytes, contentType, track.Picture);
            }
            catch (Exception e)
            {
                return null;
            }

        }

        // POST api/<RoleController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromForm] TrackDto trackDto)
        {
            try {
                var userId = GetCurrentUserId();
                if (userId == null)
                {
                    return BadRequest("Hacker Alert!");
                }
                if (userId != trackDto.UserId)
                {
                    return BadRequest("Hacker Alert!");
                }
                var path = Path.Combine(Environment.CurrentDirectory, "Images/", trackDto.PictureForm.FileName);

            using (FileStream stream = new FileStream(path, FileMode.Create))
            {
                await trackDto.PictureForm.CopyToAsync(stream);
                stream.Close();
            }
            trackDto.Picture = path;
                //Console.WriteLine("hello");
                //return Ok();
                TrackDto track = await service.AddItemAsync(trackDto);
                AttachPicture(track);
                return Ok(track);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromForm] TrackDto trackDto)
        {
            try 
            {
                var userId = GetCurrentUserId();
                if (userId == null)
                {
                    return BadRequest("Hacker Alert!");
                }
                if (userId != trackDto.UserId)
                {
                    return BadRequest("Hacker Alert!");
                }
                var path = Path.Combine(Environment.CurrentDirectory, "Images/", trackDto.PictureForm.FileName);

                using (FileStream stream = new FileStream(path, FileMode.Create))
                {
                    await trackDto.PictureForm.CopyToAsync(stream);
                    stream.Close();
                }
                trackDto.Picture = path;
            
                await service.UpdateItem(id, trackDto);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null )
                {
                    return BadRequest("Hacker Alert!");
                }
                TrackDto track=await service.GetByIdAsync(id);
                if (userId != track.UserId)
                {
                    return BadRequest("Hacker Alert!");
                }
                await service.DeleteItem(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        private int? GetCurrentUserId()
        {
            var identity = HttpContext.User.Identity as ClaimsIdentity;
            if (identity != null)
            {
                var UserClaim = identity.Claims;
                var user = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.NameIdentifier)?.Value;
                // GivenName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.GivenName)?.Value,
                //  SurName = UserClaim.FirstOrDefault(x => x.Type == ClaimTypes.Surname)?.Value

                return int.Parse(user);

            }
            return null;
        }
    }
}
