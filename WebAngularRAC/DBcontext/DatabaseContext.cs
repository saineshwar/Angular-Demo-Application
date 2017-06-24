using Microsoft.EntityFrameworkCore;
using WebAngularRAC.Models;

namespace WebAngularRAC.DBcontext
{
    public class DatabaseContext : DbContext
    {
        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options)
        {

        }

        public DbSet<UserMasterTB> UserMasterTB { get; set; }
        public DbSet<CarTB> CarTB { get; set; }
        public DbSet<BookingTB> BookingTB { get; set; }
        public DbSet<PaymentTB> PaymentTB { get; set; }
        public DbSet<BankTB> BankTB { get; set; }
        public DbSet<TokenManager> TokenManager { get; set; }
        public DbSet<UserType> UserType { get; set; }

        
    }
}
