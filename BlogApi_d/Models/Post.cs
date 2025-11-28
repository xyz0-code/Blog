using System.ComponentModel.DataAnnotations;

namespace BlogApi_d.Models
{
    public class Post
    {
        [Key] // Define Id como chave primária
        public int Id { get; set; }
        
        [Required] // Não permite valores nulos
        [StringLength(200)]
        public string Title { get; set; } = string.Empty;

        [Required]
        public string Content { get; set; } = string.Empty;

        // Timestamp de criação
        public DateTime CreatedAt { get; set; }
    }
}
