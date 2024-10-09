using Common.Entities;
using Microsoft.AspNetCore.Mvc;
using MyProject.Service.Interfaces;
using Microsoft.AspNetCore.Authorization;
using System.Security.Claims;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CommentController : ControllerBase
    {

        private readonly ICommentService service;
        public CommentController(ICommentService service)
        {
            this.service = service;
        }

        // GET: api/<RoleController>
        [HttpGet]
        [Authorize(Roles = "Administartor")]
        public async Task<ActionResult<List<CommentDto>>> Get()
        {
            try
            {
                return Ok(await service.GetAllAsync());
            }catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<CommentDto>> Get(int id)
        {
            try
            {
                return Ok(await service.GetByIdAsync(id));
            }
            catch(Exception e)
            {
                return BadRequest(e.Message);
            }
        }
        [HttpGet("ByTrackId/{id}")]
        [Authorize]
        public async Task<ActionResult<List<CommentDto>>> GetByTrackId(int id)
        {
            try
            {
                return Ok(await service.GetAllByTrackId(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<RoleController>
        [HttpPost]
        [Authorize]
        public async Task<ActionResult> Post([FromBody] CommentDto commentDto)
        {
            //if (commentDto == null)
            //{
            //    return NotFound("comment cannot be found...");
            //}
            try 
            {
                
                return Ok(await service.AddItemAsync(commentDto));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administartor")]
        public async Task<ActionResult> Put(int id, [FromBody] CommentDto commentDto)
        {
            try
            {
                await service.UpdateItem(id,commentDto);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // DELETE api/<RoleController>/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administartor")]
        public async Task<ActionResult> Delete(int id)
        {
            try
            {
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
