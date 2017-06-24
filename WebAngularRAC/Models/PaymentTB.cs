using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    public class PaymentTB
    {
        [Key]
        public int P_Id { get; set; }
        public int C_ID { get; set; }
        public int Amount { get; set; }
        public DateTime PaymentDate { get; set; }
        public int BankID { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedOn { get; set; }
        public int BookingID { get; set; }
        [NotMapped]
        public string Username { get; set; }
    }
}
 