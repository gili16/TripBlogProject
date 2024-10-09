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
    public class StopController : ControllerBase
    {
        private readonly IService<StopDto> service;
        private readonly ITrackService serviceTrack;
        public StopController(IService<StopDto> service, ITrackService serviceTrack)
        {
            this.service = service;
            this.serviceTrack = serviceTrack;
        }

        // GET: api/<RoleController>
        [HttpGet]
        [Authorize(Roles = "Administartor")]
        public async  Task<ActionResult<List<StopDto>>> Get()
        {
            try 
            { 
            return Ok(await service.GetAllAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<StopDto>> Get(int id)
        {
            try 
            { 
            return Ok(await service.GetByIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<RoleController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] StopDto stopDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null)
                {
                    return BadRequest("Hacker Alert!");
                }
                
                TrackDto trackDto = await serviceTrack.GetByIdAsync(stopDto.TrackId);
                if (userId != trackDto.UserId)
                {
                    return BadRequest("Hacker Alert!");
                }
                return Ok(await service.AddItemAsync(stopDto));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize]
        public async Task<ActionResult> Put(int id, [FromBody] StopDto stopDto)
        {
            try
            {
                var userId = GetCurrentUserId();
                if (userId == null)
                {
                    return BadRequest("Hacker Alert!");
                }
                StopDto stop = await service.GetByIdAsync(id);
                TrackDto trackDto = await serviceTrack.GetByIdAsync(stop.TrackId);
                if (userId != trackDto.UserId)
                {
                    return BadRequest("Hacker Alert!");
                }
                await service.UpdateItem(id, stopDto);
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
                if (userId == null)
                {
                    return BadRequest("Hacker Alert!");
                }
                StopDto stop = await service.GetByIdAsync(id);
                TrackDto trackDto=await serviceTrack.GetByIdAsync(stop.TrackId);
                if (userId != trackDto.UserId)
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
