using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.Models;
using WebAngularRAC.DBcontext;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class DeletingBookingUserController : Controller
    {
        DatabaseContext _DatabaseContext;
        public DeletingBookingUserController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody]CommonDeleteModel CommonModel)
        {
            try
            {
                var UserID = (from user in _DatabaseContext.UserMasterTB
                              where user.Username == CommonModel.Username
                              select user.U_Id).SingleOrDefault();


                var itemToRemove = (from booking in _DatabaseContext.BookingTB
                                    where booking.UserID == UserID && booking.BookingID == CommonModel.id
                                    select booking).SingleOrDefault();

                var BookingTB = new BookingTB { BookingID = CommonModel.id, PaymentStatus = "C" };

                if (itemToRemove != null)
                {
                    _DatabaseContext.BookingTB.Remove(itemToRemove);
                    _DatabaseContext.SaveChanges();
                    return true;
                }
                return false;

            }
            catch (Exception)
            {

                throw;
            }

        }
    }
}
