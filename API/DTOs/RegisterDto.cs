using System.ComponentModel.DataAnnotations;

namespace API.DTOs
{
    public class RegisterDto
    {
        [Required]
        public string Email { get; set; }=string.Empty;
        [Required]
        [RegularExpression("(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{4,8}$", ErrorMessage ="Password must be complex!")]
        public string Password { get; set; }=string.Empty;
        [Required]
        public string DisplayName { get; set; }=string.Empty;
        [Required]
        public string UserName { get; set; }=string.Empty;
        
    }
}