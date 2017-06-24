using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [NotMapped]
    public class PaymentViewModel
    {
        public int P_Id { get; set; }
        public int Amount { get; set; }
        public int BankID { get; set; }
        public string BankName { get; set; }
        public string Carname { get; set; }
        public int UserID { get; set; }
        public int BookingID { get; set; }
        public DateTime PaymentDate { get; set; }
        public DateTime CreatedOn { get; set; }
       
    }
}
