using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("BookingTB")]
    public class BookingTB
    {
        [Key]
        public int BookingID { get; set; }
        public string Name { get; set; }
        public DateTime FromDate { get; set; }
        public DateTime ToDate { get; set; }
        public string S_address { get; set; }
        public string D_address { get; set; }
        public string Email_Id { get; set; }
        public string Contact_No { get; set; }
        public int C_Id { get; set; }
        public int Amount { get; set; }
        public string PaymentStatus { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedOn { get; set; }
        [NotMapped]
        public string Username { get; set; }
        [NotMapped]
        public string Carname { get; set; }
        [NotMapped]
        public string ModelName { get; set; }
        [NotMapped]
        public string BankName { get; set; }
        [NotMapped]
        public string Status { get; set; }
    }
}
