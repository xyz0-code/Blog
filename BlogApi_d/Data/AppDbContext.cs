using Microsoft.EntityFrameworkCore;
using BlogApi_d.Data;
using BlogApi_d.Models;


namespace BlogApi_d.Data
{
    // Deve herdar de DbContext para funcionar com o Entity Framework
    public class AppDbContext : DbContext
    {
        // Construtor necessário para injeção de dependência no Program.cs
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        // Mapeia o modelo Post para a tabela 'Posts' no banco de dados
        public DbSet<Post> Posts { get; set; } = null!;
    }
}
