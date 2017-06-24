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
    public class GetCarImagesController : Controller
    {

        DatabaseContext _DatabaseContext;
        public GetCarImagesController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        [HttpGet]
        public CarTB[] Get()
        {
            try
            {
                var ListofCars = _DatabaseContext.CarTB.Take(5).ToList();
                return ListofCars.ToArray();
            }
            catch (Exception)
            {

                throw;
            }
        }


        // GET api/values/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/values
        [HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
