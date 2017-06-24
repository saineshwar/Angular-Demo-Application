using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("UserMasterTB")]
    public class UserMasterTB
    {
        [Key]
        public int U_Id { get; set; }
        public string Username { get; set; }
        public string Password { get; set; }
        public string Address { get; set; }
        public DateTime Birthdate { get; set; }
        public string Contact_No { get; set; }
        public string Email { get; set; }
        public int UserTypeID { get; set; }
        public DateTime CreatedOn { get; set; }
    }
}
