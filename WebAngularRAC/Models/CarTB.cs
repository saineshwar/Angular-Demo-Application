using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace WebAngularRAC.Models
{
    [Table("CarTB")]
    public class CarTB
    {
        [Key]
        public int C_Id { get; set; }
        public string Model_Name { get; set; }
        public string Brand { get; set; }
        public string Color { get; set; }
        public int No_of_Pas { get; set; }
        public decimal Price { get; set; }
        public string Image { get; set; }
        public string Fueltype { get; set; }
        public int UserID { get; set; }
        public DateTime CreatedOn { get; set; }
        [NotMapped]
        public string Username { get; set; }
    }
}
