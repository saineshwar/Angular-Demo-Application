using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Hosting;
using WebAngularRAC.DBcontext;
using Microsoft.Net.Http.Headers;
using System.IO;
using WebAngularRAC.Models;
using WebAngularRAC.Filters;

namespace WebAngularRAC.Controllers
{
    [TypeFilter(typeof(APIAdminAuthorizeAttribute))]
    public class AddCarsPhotoController : Controller
    {

        private readonly IHostingEnvironment _environment;
        DatabaseContext _DatabaseContext;
        public AddCarsPhotoController(DatabaseContext DatabaseContext, IHostingEnvironment hostingEnvironment)
        {
            _DatabaseContext = DatabaseContext;
            _environment = hostingEnvironment;
        }


        [HttpPost]
        public JsonResult UploadFiles([FromHeader]ReceiverClass ReceiverClass)
        {
            try
            {
                if (string.IsNullOrEmpty(ReceiverClass.SelectedCarID))
                {
                    return Json(false);
                }

                var files = HttpContext.Request.Form.Files;
                string PathDB = string.Empty;
                if (files == null)
                {
                    return Json(false);
                }

                var C_Id = Convert.ToInt32(ReceiverClass.SelectedCarID);


                var uploads = Path.Combine(_environment.WebRootPath, "Cars_Upload");

                foreach (var file in files)
                {
                    if (file.Length > 0)
                    {
                        var fileName = ContentDispositionHeaderValue.Parse(file.ContentDisposition).FileName.Trim('"');
                        var myUniqueFileName = Convert.ToString(Guid.NewGuid());
                        var FileExtension = Path.GetExtension(fileName);
                        var newFileName = myUniqueFileName + FileExtension;
                        fileName = Path.Combine(_environment.WebRootPath, "Cars_Upload") + $@"\{newFileName}";
                        PathDB = "Cars_Upload/" + newFileName;
                        using (FileStream fs = System.IO.File.Create(fileName))
                        {
                            file.CopyTo(fs);
                            fs.Flush();
                        }
                    }
                }

                var cartb = new CarTB { C_Id = C_Id, Image = PathDB };
                var db = _DatabaseContext;
                db.CarTB.Attach(cartb);
                db.Entry(cartb).Property(x => x.Image).IsModified = true;
                db.SaveChanges();
                return Json(true);
            }
            catch (Exception)
            {
                throw;
            }

        }
    }
}
