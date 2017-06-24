using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using WebAngularRAC.Models;
using WebAngularRAC.DBcontext;
using WebAngularRAC.Commonlibary;
using Microsoft.Extensions.Options;
using WebAngularRAC.AES256Encryption;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAngularRAC.Controllers
{
    [Route("api/[controller]")]
    public class ValidateLoginUserController : Controller
    {
        private readonly IOptions<MyConfigReader> config;
        DatabaseContext _DatabaseContext;
        public ValidateLoginUserController(DatabaseContext databasecontext, IOptions<MyConfigReader> config)
        {
            this.config = config;
            _DatabaseContext = databasecontext;
        }

       
        // POST api/values
        [HttpPost]
        public LoginResponse Post([FromBody]UserMasterTB UserMasterTB)
        {
            try
            {
                LoginResponse loginresponse = new LoginResponse();

                if (string.IsNullOrEmpty(UserMasterTB.Username) || string.IsNullOrEmpty(UserMasterTB.Password))
                {
                    loginresponse.Username = string.Empty;
                    loginresponse.Token = string.Empty;
                    loginresponse.UserTypeID = 0;
                    return loginresponse;
                }

                var encryptedPassword = (from user in _DatabaseContext.UserMasterTB
                                         where user.Username == UserMasterTB.Username
                                         select user.Password).SingleOrDefault();


                if (!string.IsNullOrEmpty(encryptedPassword))
                {

                    if (EncryptionLibrary.DecryptText(encryptedPassword) == UserMasterTB.Password)
                    {
                        string Encryptpassword = EncryptionLibrary.EncryptText(UserMasterTB.Password);

                        var isUserExists = (from user in _DatabaseContext.UserMasterTB
                                            where user.Username == UserMasterTB.Username && user.Password == Encryptpassword
                                            select user).Count();

                        if (isUserExists > 0)
                        {
                            var usermastertb = (from user in _DatabaseContext.UserMasterTB
                                                join usertype in _DatabaseContext.UserType on user.UserTypeID equals usertype.UserTypeID
                                                where user.Username == UserMasterTB.Username && user.Password == Encryptpassword
                                                select new UserMasterViewModel
                                                {
                                                    U_Id = user.U_Id,
                                                    UserTypeID = user.UserTypeID,
                                                    UserTypeName = usertype.UserTypeName,
                                                    Username = user.Username
                                                }).SingleOrDefault();

                            if (usermastertb != null)
                            {
                                GenerateToken(usermastertb, loginresponse);
                            }

                            return loginresponse;
                        }
                        else
                        {
                            loginresponse.Username = string.Empty;
                            loginresponse.Token = string.Empty;
                            loginresponse.UserTypeID = 0;
                            return loginresponse;
                        }
                    }
                }

                loginresponse.Username = string.Empty;
                loginresponse.Token = string.Empty;
                loginresponse.UserTypeID = 0;
                return loginresponse;
            }
            catch (Exception)
            {

                throw;
            }

        }

       

        public void GenerateToken(UserMasterViewModel usermastertb, LoginResponse loginresponse)
        {

            try
            {
                var isAlreadyTokenExists = (from tokenmanager in _DatabaseContext.TokenManager
                                            where tokenmanager.UserID == usermastertb.U_Id
                                            select tokenmanager).Count();

                if (isAlreadyTokenExists > 0)
                {
                    var deleteToken = (from temptoken in _DatabaseContext.TokenManager
                                       where temptoken.UserID == usermastertb.U_Id
                                       select temptoken).SingleOrDefault();

                    _DatabaseContext.TokenManager.Remove(deleteToken);
                    _DatabaseContext.SaveChanges();
                }

                var IssuedOn = DateTime.Now;
                var newToken = KeyGenerator.GenerateToken(usermastertb);

                TokenManager token = new TokenManager();
                token.TokenID = 0;
                token.TokenKey = newToken;
                token.IssuedOn = IssuedOn;
                token.ExpiresOn = DateTime.Now.AddMinutes(Convert.ToInt32(this.config.Value.TokenExpiry));
                token.CreatedOn = DateTime.Now;
                token.UserID = usermastertb.U_Id;
                var result = _DatabaseContext.TokenManager.Add(token);

                _DatabaseContext.SaveChanges();
                loginresponse.Username = usermastertb.Username;
                loginresponse.Token = newToken;
                loginresponse.UserTypeID = usermastertb.UserTypeID;
            }
            catch (Exception)
            {
                throw;
            }
        }




    }
}
