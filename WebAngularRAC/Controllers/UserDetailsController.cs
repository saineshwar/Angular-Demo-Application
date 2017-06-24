using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.Models;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIUserAuthorizeAttribute))]
    public class UserDetailsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public UserDetailsController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }


        // POST api/values
        [HttpPost]
        public UserMasterTB Post([FromBody]CommonModel CommonModel)
        {
            try
            {
                if (string.IsNullOrEmpty(CommonModel.Username))
                {
                    return null;
                }

                var Userdetails = (from user in _DatabaseContext.UserMasterTB
                                   where user.Username == CommonModel.Username
                                   select user).SingleOrDefault();

                return Userdetails;
            }
            catch (Exception)
            {

                throw;
            }

        }

       
    }
}
