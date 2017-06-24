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
    public class GetAllBookingDetailsController : Controller
    {
        DatabaseContext _DatabaseContext;
        public GetAllBookingDetailsController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
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
                                     join cartb in _DatabaseContext.CarTB on book.C_Id equals cartb.C_Id
                                     where book.UserID == getUserID && (book.PaymentStatus == "D" || book.PaymentStatus == "C")
                                     select new BookingTB
                                     {
                                         Amount = book.Amount,
                                         BookingID = book.BookingID,
                                         Carname = cartb.Brand,
                                         ModelName = cartb.Model_Name,
                                         Name = book.Name,
                                         FromDate = book.FromDate,
                                         ToDate = book.ToDate,
                                         S_address = book.S_address,
                                         D_address = book.D_address,
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
