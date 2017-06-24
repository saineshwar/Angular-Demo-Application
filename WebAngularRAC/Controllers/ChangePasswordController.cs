using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.Models;
using WebAngularRAC.DBcontext;
using WebAngularRAC.AES256Encryption;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class ChangePasswordController : Controller
    {
        DatabaseContext _DatabaseContext;
        public ChangePasswordController(DatabaseContext databasecontext)
        {
            _DatabaseContext = databasecontext;
        }

        // POST api/values
        [HttpPost]
        public bool Post([FromBody] ChangePasswordModel ChangePasswordModel)
        {
            try
            {
                var UserID = (from user in _DatabaseContext.UserMasterTB
                              where user.Username == ChangePasswordModel.Username
                              select user.U_Id).SingleOrDefault();

                if (Comparepassword(ChangePasswordModel))
                {
                    string newEncrypttpassword = EncryptionLibrary.EncryptText(ChangePasswordModel.NewPassword);

                    var UserModel = new UserMasterTB { U_Id = UserID, Password = newEncrypttpassword };

                    var db = _DatabaseContext;
                    db.UserMasterTB.Attach(UserModel);
                    db.Entry(UserModel).Property(x => x.Password).IsModified = true;
                    db.SaveChanges();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [NonAction]
        public bool Comparepassword(ChangePasswordModel objpassword)
        {
            try
            {
                var encryptedPassword = (from user in _DatabaseContext.UserMasterTB
                                         where user.Username == objpassword.Username
                                         select user.Password).SingleOrDefault();

                string OldDecryptpassword = objpassword.OldPassword;

                if (String.Equals(EncryptionLibrary.DecryptText(encryptedPassword), OldDecryptpassword))
                {
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}
