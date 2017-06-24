using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("BankTB")]
    public class BankTB
    {
        [Key]
        public int BankID { get; set; }
        public string BankName { get; set; }
    }
}
