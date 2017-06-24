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
    public class ValidateModelNameController : Controller
    {

        DatabaseContext _DatabaseContext;
        public ValidateModelNameController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody]CarTB cartb)
        {
            try
            {
                if (string.IsNullOrEmpty(cartb.Model_Name))
                {
                    return false;
                }

                var output = (from car in _DatabaseContext.CarTB
                              where car.Model_Name == cartb.Model_Name
                              select car.Model_Name).Count();

                if (output > 0)
                {
                    return false;
                }
                else
                {
                    return true;
                }
            }
            catch (Exception)
            {

                throw;
            }


        }

    }
}
