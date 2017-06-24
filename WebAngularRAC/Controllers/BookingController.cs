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
    public class BookingController : Controller
    {

        DatabaseContext _DatabaseContext;
        public BookingController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // GET api/values/5
        [HttpGet("{id}")]
        public BookingTB Get(int id)
        {
            try
            {
                return _DatabaseContext.BookingTB.SingleOrDefault(x => x.BookingID == id);
            }
            catch (Exception)
            {
                throw;
            }
        }

        // POST api/values
        [HttpPost]
        public BookingResponse Post([FromBody]BookingTB bookingtb)
        {

            try
            {
                var days = Math.Round((bookingtb.ToDate - bookingtb.FromDate).TotalDays);
                var hours = (bookingtb.ToDate - bookingtb.FromDate).Hours;
                var currenttime = DateTime.Now;
                var booktime = Convert.ToDateTime(bookingtb.FromDate);
                var bookingAmount = 0;

                if (booktime > currenttime)
                {

                }
                else
                {
                    return new BookingResponse { data = "Invalidbooktime" };
                }

                if (days < 0 && hours < 1)
                {
                    return new BookingResponse { data = "InvalidTime" };
                }
                else
                {
                    var IsalreadyBooked = (from book in _DatabaseContext.BookingTB
                                           where Convert.ToDateTime(book.ToDate) >= Convert.ToDateTime(bookingtb.FromDate)
                                           && Convert.ToDateTime(book.ToDate) <= Convert.ToDateTime(bookingtb.ToDate)
                                           && book.C_Id == bookingtb.C_Id
                                           select book.BookingID).Count();



                    if (IsalreadyBooked > 0)
                    {
                        return new BookingResponse { data = "AlreadyBooked" };
                    }
                    else
                    {

                        if (days < 0)
                        {
                            bookingAmount = CalculateCost(bookingtb.C_Id, days, hours);
                        }
                        else
                        {
                            bookingAmount = CalculateCost(bookingtb.C_Id, days, hours);
                        }

                        var UserID = (from user in _DatabaseContext.UserMasterTB
                                      where user.Username == bookingtb.Username
                                      select user.U_Id).SingleOrDefault();

                        bookingtb.BookingID = 0;
                        bookingtb.Amount = bookingAmount;
                        bookingtb.UserID = UserID;
                        bookingtb.PaymentStatus = "P";
                        bookingtb.CreatedOn = DateTime.Now;
                        _DatabaseContext.Add(bookingtb);
                        _DatabaseContext.SaveChanges();
                        return new BookingResponse { data = Convert.ToString(bookingtb.BookingID) };
                    }
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [NonAction]
        public int CalculateCost(int CarID, double days, int hours)
        {
            try
            {
                var amount = (from car in _DatabaseContext.CarTB
                              where car.C_Id == CarID
                              select car.Price).SingleOrDefault();

                var totalAmount = 0;

                if (days <= 0)
                {
                    var totalcost = Convert.ToInt32(amount) / 24;
                    totalAmount = totalcost * hours;
                }
                else
                {
                    totalAmount = Convert.ToInt32(amount) / Convert.ToInt32(days);
                }

                return totalAmount;
            }
            catch (Exception)
            {

                throw;
            }
        }



    }
}
