using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Models;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class GetAllCarsDetailsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public GetAllCarsDetailsController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        // GET: api/values
        [HttpGet]
        public CarTB[] Get()
        {
            try
            {
                var ListofCars = _DatabaseContext.CarTB.ToList();
                return ListofCars.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

    }
}
