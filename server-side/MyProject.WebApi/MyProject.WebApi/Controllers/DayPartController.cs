using Common.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using MyProject.Repository.Entities;
using MyProject.Service.Interfaces;
using MyProject.Service.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace MyProject.WebApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class DayPartController : ControllerBase
    {
        private readonly OptionTypeService<DayPart, DayPartDto> service;
        public DayPartController(OptionTypeService<DayPart, DayPartDto> service)
        {
            this.service = service;
        }

        // GET: api/<RoleController>
        [HttpGet]
        
        public async  Task<ActionResult<List<DayPartDto>>> Get()
        {
            try { 
            return Ok(await service.GetAllAsync());
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // GET api/<RoleController>/5
        [HttpGet("{id}")]
        public async Task<ActionResult<DayPartDto>> Get(int id)
        {
            try { 
            return Ok(await service.GetByIdAsync(id));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // POST api/<RoleController>
        [HttpPost]
        [Authorize(Roles = "Administartor")]
        public async Task<ActionResult> Post([FromBody] DayPartDto dayPartDto)
        {
            try
            {
                return Ok(await service.AddItemAsync(dayPartDto));
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        // PUT api/<RoleController>/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administartor")]
        public async Task<ActionResult> Put(int id, [FromBody] DayPartDto dayPartDto)
        {
            try
            {
                await service.UpdateItem(id, dayPartDto);
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
    }
}
