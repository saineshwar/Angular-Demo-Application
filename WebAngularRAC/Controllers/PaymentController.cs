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
    public class PaymentController : Controller
    {
        DatabaseContext _DatabaseContext;
        public PaymentController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }


        // POST api/values
        [HttpPost]
        public bool Post([FromBody]PaymentTB paymenttb)
        {
            try
            {
                if (paymenttb == null)
                {
                    return false;
                }

                var UserID = (from user in _DatabaseContext.UserMasterTB
                              where user.Username == paymenttb.Username
                              select user.U_Id).SingleOrDefault();

                var output = (from pay in _DatabaseContext.PaymentTB
                              where pay.C_ID == pay.C_ID && pay.UserID == UserID && pay.BookingID == paymenttb.BookingID
                              select pay.P_Id).Count();

                if (output > 0)
                {
                    return false;
                }
                else
                {
                    try
                    {
                        var payAmount = (from booking in _DatabaseContext.BookingTB
                                         where booking.UserID == UserID && booking.BookingID == paymenttb.BookingID
                                         select booking.Amount).SingleOrDefault();

                        paymenttb.P_Id = 0;
                        paymenttb.UserID = UserID;
                        paymenttb.Amount = payAmount;
                        paymenttb.BookingID = paymenttb.BookingID;
                        paymenttb.CreatedOn = DateTime.Now;
                        paymenttb.PaymentDate = DateTime.Now;
                        _DatabaseContext.Add(paymenttb);
                        _DatabaseContext.SaveChanges();

                        var bookingtb = new BookingTB { BookingID = paymenttb.BookingID, PaymentStatus = "D" };
                        var db = _DatabaseContext;
                        db.BookingTB.Attach(bookingtb);
                        db.Entry(bookingtb).Property(x => x.PaymentStatus).IsModified = true;
                        db.SaveChanges();
                        return true;
                    }
                    catch (Exception)
                    {
                        throw;
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}
