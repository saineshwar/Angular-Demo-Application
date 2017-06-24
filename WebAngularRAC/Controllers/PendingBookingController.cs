using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Models;
using WebAngularRAC.Filters;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    [TypeFilter(typeof(APIUserAuthorizeAttribute))]
    public class PendingBookingController : Controller
    {

        DatabaseContext _DatabaseContext;
        public PendingBookingController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET: api/values
        [HttpGet]
        public BookingTB[] Get()
        {
            try
            {
                var ListofBooking = (from book in _DatabaseContext.BookingTB
                                     where book.PaymentStatus == "P"
                                     select book);

                return ListofBooking.ToArray();
            }
            catch (Exception)
            {
                throw;
            }
        }

     
        // POST api/values
        [HttpPost]
        public BookingTB[] Post([FromBody] CommonModel CommonModel)
        {
            try
            {
                if (string.IsNullOrEmpty(CommonModel.Username))
                {
                    return null;
                }

                var getUserID = (from user in _DatabaseContext.UserMasterTB
                                 where user.Username == CommonModel.Username
                                 select user.U_Id).SingleOrDefault();

                var ListofBooking = (from book in _DatabaseContext.BookingTB
                                     where book.PaymentStatus == "P" && book.UserID == getUserID
                                     select book).ToList();

                return ListofBooking.ToArray();
            }
            catch (Exception)
            {

                throw;
            }

        }

   
    }
}
