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
    public class GetAllPaymentAdminController : Controller
    {

        DatabaseContext _DatabaseContext;
        public GetAllPaymentAdminController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        [HttpPost]
        public PaymentViewModel[] Post([FromBody] CommonModel CommonModel)
        {
            try
            {
                if (string.IsNullOrEmpty(CommonModel.Username))
                {
                    return null;
                }

                var ListofBooking = (from book in _DatabaseContext.BookingTB
                                     join car in _DatabaseContext.CarTB on book.C_Id equals car.C_Id
                                     join payment in _DatabaseContext.PaymentTB on book.BookingID equals payment.BookingID
                                     join bank in _DatabaseContext.BankTB on payment.BankID equals bank.BankID
                                     select new PaymentViewModel
                                     {
                                         Amount = book.Amount,
                                         BookingID = book.BookingID,
                                         BankName = bank.BankName,
                                         Carname = car.Model_Name,
                                         PaymentDate = payment.PaymentDate,
                                         CreatedOn = payment.CreatedOn
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
