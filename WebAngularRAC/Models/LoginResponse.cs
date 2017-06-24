using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [NotMapped]
    public class LoginResponse
    {
        public string Username { get; set; }
        public string Token { get; set; }
        public int UserTypeID { get; set; }
    }
}
