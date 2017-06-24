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
    public class AllBookingListController : Controller
    {
        DatabaseContext _DatabaseContext;
        public AllBookingListController(DatabaseContext databasecontext)
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
                                     select new BookingTB {
                                         Amount = book.Amount,
                                         BankName = book.BankName,
                                         BookingID = book.BookingID,
                                         Carname = book.Carname,
                                         Contact_No = book.Contact_No,
                                         CreatedOn = book.CreatedOn,
                                         C_Id = book.C_Id,
                                         D_address = book.D_address,
                                         Email_Id = book.Email_Id,
                                         FromDate = book.FromDate,
                                         ModelName = book.ModelName,
                                         Name = book.Name,
                                         PaymentStatus = book.PaymentStatus,
                                         Status = book.PaymentStatus == "D" ? "Completed" : book.PaymentStatus == "C" ? "Cancel" : book.PaymentStatus == "P" ? "Pending" : "Unknown"
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
