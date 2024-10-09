using Common.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using MyProject.Service.Interfaces;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.AspNetCore.Session;
// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserManageFavoriteService service;
        private IConfiguration _configuration;
        public UserController(IUserManageFavoriteService service, IConfiguration configuration)
        {
            this.service = service;
            this._configuration = configuration;
        }

        // GET: api/<RoleController>
        [HttpGet]
        [Authorize(Roles = "Administartor")]
        public async Task<ActionResult<List<UserDto>>> Get()
        {
            try 
            {
                List<UserDto> users =await service.GetAllAsync() ;
                users.ForEach(x=>AttachPicture(x));
                return Ok(users);
                
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("UserByToken")]
        [Authorize]
        public async Task<ActionResult<UserDto>> GetUserByToken()
        {
            try
            {
                var user=await GetCurrentUser();

                if(user is null)
                    return NotFound("user not found...");
                UserDto fullUser = await service.GetByIdAsync((int)(user.Id));
                fullUser = AttachPicture(fullUser);
                return Ok(fullUser);
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        } 
        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<UserDto>> Get(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null || userId != id)
                {
                    return BadRequest("Hacker Alert!");
                }
                UserDto user = await service.GetByIdAsync(id);
                user=AttachPicture(user);

                return Ok(user);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        private UserDto AttachPicture(UserDto user)
        {
            if (user != null) {
                string path = user.ProfilePicture.Substring(user.ProfilePicture.LastIndexOf('/') + 1);
                var filePath = Path.Combine(Environment.CurrentDirectory, "Images/", path);

                // Check if the video file exists
                if (!System.IO.File.Exists(filePath))
                {
                    return null;
                }

                // Read the video file as a byte array
                var fileBytes = System.IO.File.ReadAllBytes(filePath);
                user.PictureBytes = fileBytes;
                return user;
            }
            throw new Exception("user not found...");
        }
        [HttpGet("picture/{id}")]
        [Authorize]
        public async Task<FileContentResult> GetPicture(int id)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null || userId != id)
                {
                    return null;
                }
                UserDto user = await service.GetByIdAsync(id);
                string path=user.ProfilePicture.Substring(user.ProfilePicture.LastIndexOf('/') + 1);
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
                var fileExtension = Path.GetExtension(user.ProfilePicture).ToLowerInvariant();
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
                return File(fileBytes, contentType, user.ProfilePicture);
            }
            catch (Exception e)
            {
                return null;
            }

        }

        // POST api/<RoleController>
        [HttpPost]
        public async Task<ActionResult> Post([FromForm] UserDto userDto)
        {
            try
            {
                if (userDto == null)
                {
                    return NotFound("user not found...");
                }
                var path = Path.Combine(Environment.CurrentDirectory, "Images/", userDto.PictureFile.FileName);

                using (FileStream stream = new FileStream(path, FileMode.Create))
                {
                    await userDto.PictureFile.CopyToAsync(stream);
                    stream.Close();
                }
                userDto.ProfilePicture = path;
                UserDto user = await service.AddItemAsync(userDto);
                AttachPicture(user);
                return Ok(user);
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromForm] UserDto userDto)
        {
            try 
            {
                var userId = GetCurrentUserId();
                if (userId == null || userId != id)
                {
                    return BadRequest("Hacker Alert!");
                }
                if (userDto == null)
                {
                    return NotFound("user not found...");
                }
                var path = Path.Combine(Environment.CurrentDirectory, "Images/", userDto.PictureFile.FileName);

                using (FileStream stream = new FileStream(path, FileMode.Create))
                {
                    await userDto.PictureFile.CopyToAsync(stream);
                    stream.Close();
                }
                userDto.ProfilePicture = path;
            
                await service.UpdateItem(id,userDto);
                return Ok();
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
            
        }

        [HttpPut("AddFavorite/{id}")]
        [Authorize]
        public async Task<ActionResult> AddFavorite(int id, [FromBody] TrackDto track)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null || userId != id)
                {
                    return BadRequest("Hacker Alert!");
                }
                if (track == null)
                {
                    return NotFound("track is null...");
                }
                await service.AddFavorite(id, track);
                return Ok();
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut("DeleteFavorite/{id}")]
        [Authorize]
        public async Task<ActionResult> DeleteFavorite(int id, [FromBody] TrackDto track)
        {
            try
            {
                var userId=GetCurrentUserId();
                if (userId == null || userId != id)
                {
                    return BadRequest("Hacker Alert!");
                }
                if (track == null)
                {
                    return NotFound("track is null...");
                }
                
                await service.DeleteFavorite(id, track);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles ="Administrator")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            { 
                await service.DeleteItem(id);
                return Ok();
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        

        [HttpPost("Login/{mail}")]
        public async Task< IActionResult> Login(string mail)
        {
            var user = await service.Login(mail);
            if (user != null)
            {

                var token = Generate(user);
                user = AttachPicture(user);
                return Ok(new
                {
                    Token=token,
                    User=user
                });
            }
            return NotFound("User not found");

        }
        private async Task<UserDto> GetCurrentUser()
        {
            var userId = GetCurrentUserId();
            if (userId is not null)
            {
                UserDto userdto = await service.GetByIdAsync((int)userId);
                AttachPicture(userdto);
                return userdto;
            }

            
            return null;
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
        private string Generate(UserDto user)
        {
            //מפתח להצפנה
            var securitykey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_configuration["Jwt:Key"]));
            //אלגוריתם להצפנה
            var credentials = new SigningCredentials(securitykey, SecurityAlgorithms.HmacSha256);

            var claims = new[] {
            new Claim(ClaimTypes.NameIdentifier,user.Id.ToString()),
            new Claim(ClaimTypes.Email,user.Mail),
            new Claim(ClaimTypes.Role,"User"),
            new Claim(ClaimTypes.Name,user.Name)
            };
            var token = new JwtSecurityToken(_configuration["Jwt:Issuer"], _configuration["Jwt:Audience"],
                claims,
                expires: DateTime.Now.AddMinutes(15),
                signingCredentials: credentials);
            return new JwtSecurityTokenHandler().WriteToken(token);
        }
    }
}
