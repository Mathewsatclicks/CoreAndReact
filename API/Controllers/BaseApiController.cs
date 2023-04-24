 
using Microsoft.AspNetCore.Mvc;
using Domain; 
using Microsoft.EntityFrameworkCore;
using Persistence;


namespace API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BaseApiController:ControllerBase
    {

    }
}