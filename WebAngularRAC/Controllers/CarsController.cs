using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.Models;
using WebAngularRAC.DBcontext;
using System.IO;
using Microsoft.Net.Http.Headers;
using Microsoft.AspNetCore.Hosting;
using WebAngularRAC.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    public class CarsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public CarsController(DatabaseContext DatabaseContext)
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

        // GET api/values/5
        [HttpGet("{id}")]
        public CarTB Get(int id)
        {
            try
            {
                var output = (from Cars in _DatabaseContext.CarTB
                              where Cars.C_Id == id
                              select Cars).SingleOrDefault();

                return output;
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody]CarTB cartb)
        {
            try
            {
                var output = (from Cars in _DatabaseContext.CarTB
                              where Cars.Model_Name == cartb.Model_Name && Cars.Brand == cartb.Brand
                              select Cars.Brand).Count();

                if (output > 0)
                {
                    return false;
                }
                else
                {
                    var UserID = (from user in _DatabaseContext.UserMasterTB
                                  where user.Username == cartb.Username
                                  select user.U_Id).SingleOrDefault();

                    cartb.C_Id = 0;
                    cartb.UserID = UserID;
                    cartb.CreatedOn = DateTime.Now;
                    _DatabaseContext.Add(cartb);
                    _DatabaseContext.SaveChanges();
                    return true;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public bool Put(int id, [FromBody]CarTB cartb)
        {
            try
            {
                if (string.IsNullOrEmpty(Convert.ToString(id)))
                {
                    return false;
                }

                if (cartb == null)
                {
                    return false;
                }

                var carupdate = new CarTB
                {
                    C_Id = cartb.C_Id,
                    Model_Name = cartb.Model_Name,
                    Brand = cartb.Brand,
                    Color = cartb.Color,
                    Fueltype = cartb.Fueltype,
                    No_of_Pas = cartb.No_of_Pas,
                    Price = cartb.Price
                };

                var db = _DatabaseContext;
                db.CarTB.Attach(carupdate);
                db.Entry(carupdate).Property(x => x.Model_Name).IsModified = true;
                db.Entry(carupdate).Property(x => x.Brand).IsModified = true;
                db.Entry(carupdate).Property(x => x.Color).IsModified = true;
                db.Entry(carupdate).Property(x => x.Fueltype).IsModified = true;
                db.Entry(carupdate).Property(x => x.No_of_Pas).IsModified = true;
                db.Entry(carupdate).Property(x => x.Price).IsModified = true;
                db.SaveChanges();
                return true;
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
