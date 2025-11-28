using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using BlogApi_d.Models; // Seu modelo Post
using BlogApi_d.Data;   // Seu AppDbContext

namespace BlogApi_d.Controllers
{
    [ApiController]
    [Route("api/[controller]")] // Define a rota base como /api/Posts
    public class PostsController : ControllerBase
    {
        private readonly AppDbContext _context;

        // Construtor com Injeção de Dependência
        public PostsController(AppDbContext context)
        {
            _context = context;
        }

        // GET: api/Posts (Retorna todos os posts)
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Post>>> GetPosts()
        {
            return await _context.Posts.ToListAsync();
        }

        // POST: api/Posts (Cria um novo post)
        [HttpPost]
        public async Task<ActionResult<Post>> PostPost(Post post)
        {
            post.CreatedAt = DateTime.Now;
            _context.Posts.Add(post);
            await _context.SaveChangesAsync();

            // Retorna 201 Created
            return CreatedAtAction(nameof(GetPost), new { id = post.Id }, post);
        }

        // DELETE: api/Posts/5 (Deleta um post)
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePost(int id)
        {
            var post = await _context.Posts.FindAsync(id);
            if (post == null)
            {
                return NotFound();
            }

            _context.Posts.Remove(post);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        // GET: api/Posts/5 (Retorna um post específico - Necessário para CreatedAtAction)
        [HttpGet("{id}")]
        public async Task<ActionResult<Post>> GetPost(int id)
        {
            var post = await _context.Posts.FindAsync(id);

            if (post == null)
            {
                return NotFound();
            }

            return post;
        }
    }
}
