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
    public class GetAllPayedBookingController : Controller
    {
        DatabaseContext _DatabaseContext;
        public GetAllPayedBookingController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
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
                                     where book.PaymentStatus == "D" && book.UserID == getUserID
                                     select new BookingTB
                                     {
                                         Amount = book.Amount,
                                         Name = book.Name,
                                         FromDate = book.FromDate,
                                         ToDate = book.ToDate,
                                         CreatedOn = book.CreatedOn,
                                         Status = book.PaymentStatus == "D" ? "Completed" : "Unknown"
                                     }).ToList();

                return ListofBooking.ToArray();
            }
            catch (Exception)
            {

                throw;
            }

        }

       
    }
}
