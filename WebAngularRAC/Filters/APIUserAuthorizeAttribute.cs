using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Microsoft.Extensions.Primitives;
using System;
using System.Linq;
using System.Net;
using System.Net.Http;
using WebAngularRAC.AES256Encryption;
using WebAngularRAC.DBcontext;

namespace WebAngularRAC.Filters
{
    public class APIUserAuthorizeAttribute : ActionFilterAttribute
    {
        DatabaseContext _databasecontext;
        public APIUserAuthorizeAttribute(DatabaseContext databasecontext)
        {
            _databasecontext = databasecontext;
        }


        public override void OnActionExecuting(ActionExecutingContext context)
        {
            StringValues authorizationToken;

            try
            {
                var encodedString = context.HttpContext.Request.Headers.TryGetValue("Token", out authorizationToken);

                if (!string.IsNullOrEmpty(authorizationToken.First()))
                {
                    var key = EncryptionLibrary.DecryptText(authorizationToken.First());

                    string[] parts = key.Split(new char[] { ':' });

                    var UserID = Convert.ToInt32(parts[0]);       // UserID
                    var RandomKey = parts[1];                     // Random Key
                    var UserTypeID = Convert.ToInt32(parts[2]);    // UserTypeID
                    long ticks = long.Parse(parts[3]);            // Ticks
                    DateTime IssuedOn = new DateTime(ticks);

                    if (UserTypeID == 2)
                    {
                        var registerModel = (from register in _databasecontext.TokenManager
                                             where register.UserID == UserID
                                             && register.UserID == UserID
                                             select register).FirstOrDefault();


                        if (registerModel != null)
                        {
                            // Validating Time
                            var ExpiresOn = (from token in _databasecontext.TokenManager
                                             where token.UserID == UserID
                                             select token.ExpiresOn).FirstOrDefault();

                            if ((DateTime.Now > ExpiresOn))
                            {
                                context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                                context.Result = new JsonResult("Unauthorized");
                            }
                            else
                            {
                                
                            }
                        }
                        else
                        {
                            context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                            context.Result = new JsonResult("Unauthorized");
                        }
                    }
                    else
                    {
                        context.HttpContext.Response.StatusCode = (int)HttpStatusCode.Unauthorized;
                        context.Result = new JsonResult("Unauthorized");
                    }
                }

            }
            catch (Exception)
            {
                throw;
            }

            base.OnActionExecuting(context);
        }



    }
}
