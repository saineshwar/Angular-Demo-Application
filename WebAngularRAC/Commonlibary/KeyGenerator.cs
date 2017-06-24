using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using WebAngularRAC.AES256Encryption;
using WebAngularRAC.Models;

namespace WebAngularRAC.Commonlibary
{
    public static class KeyGenerator
    {
        public static string GetUniqueKey(int maxSize = 15)
        {
            try
            {
                char[] chars = new char[62];
                chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890".ToCharArray();
                byte[] data = new byte[1];
                using (RNGCryptoServiceProvider crypto = new RNGCryptoServiceProvider())
                {
                    crypto.GetNonZeroBytes(data);
                    data = new byte[maxSize];
                    crypto.GetNonZeroBytes(data);
                }
                StringBuilder result = new StringBuilder(maxSize);
                foreach (byte b in data)
                {
                    result.Append(chars[b % (chars.Length)]);
                }
                return result.ToString();
            }
            catch (Exception)
            {

                throw;
            }
        }

        public static string GenerateToken(UserMasterViewModel usermastertb)
        {
            var IssuedOn = DateTime.Now;

            try
            {

                string randomnumber =
                   string.Join(":", new string[]
                   {

                     Convert.ToString(usermastertb.U_Id),
                     KeyGenerator.GetUniqueKey(),
                     Convert.ToString(usermastertb.UserTypeID),
                     Convert.ToString(IssuedOn.Ticks)
                   });

                return EncryptionLibrary.EncryptText(randomnumber);
            }
            catch (Exception)
            {

                throw;
            }
        }



    }
}
