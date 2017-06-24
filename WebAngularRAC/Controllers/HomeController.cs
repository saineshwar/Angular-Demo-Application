using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.DBcontext;

namespace WebAngularRAC.Controllers
{
    public class HomeController : Controller
    {
        DatabaseContext _DatabaseContext;
        public HomeController(DatabaseContext DatabaseContext)
        {
            _DatabaseContext = DatabaseContext;
        }

        public IActionResult Index()
        {
            return View();
        }

        public IActionResult About()
        {
            return Redirect("Index.html");
        }

        public IActionResult Contact()
        {
            ViewData["Message"] = "Your contact page.";

            return View();
        }

        public IActionResult Error()
        {
            return View();
        }
    }
}
