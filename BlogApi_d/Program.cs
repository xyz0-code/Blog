using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Infrastructure;
using BlogApi_d.Data;
using System.Text.Json;
using System.Text.Json.Serialization;

var builder = WebApplication.CreateBuilder(args);

// =========================================================
// 1. CONFIGURAÇÃO DE SERVIÇOS (Injeção de Dependência)
// =========================================================

// --- A. Configuração do DbContext para MariaDB/MySQL ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");

builder.Services.AddDbContext<AppDbContext>(options =>
{
    // Usa o MySqlConnector para se conectar.
    options.UseMySql(connectionString, ServerVersion.AutoDetect(connectionString),
        // Esta linha ajuda o "dotnet ef" a encontrar o projeto correto
        builder => builder.MigrationsAssembly("BlogApi_d"));
});

// --- B. Configuração de CORS (Essencial para o Frontend Vue.js) ---
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        // Permite requisições de qualquer origem (ideal para desenvolvimento)
        policy.AllowAnyOrigin()
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Adiciona suporte a Controllers E configura a Serialização JSON
builder.Services.AddControllers()
    .AddJsonOptions(options => // ✅ AJUSTE APLICADO AQUI
    {
        // ❌ A linha options.JsonSerializerOptions.DateFormatString = "..." FOI REMOVIDA.
        // O System.Text.Json usa o formato ISO 8601 por padrão (exatamente o que o JS espera).
        // Se a data estava com erro, geralmente é resolvido pelo 'PropertyNamingPolicy' ou 
        // pela adição de um conversor, garantindo a análise correta.

        // Garante que as propriedades JSON sigam o padrão camelCase (convenção JS/Frontend)
        options.JsonSerializerOptions.PropertyNamingPolicy = JsonNamingPolicy.CamelCase;

        // 💡 Adicional: Adiciona um conversor para garantir que enumerações sejam serializadas como strings.
        // Isso às vezes ajuda na análise geral do JSON, embora não seja estritamente para datas.
        options.JsonSerializerOptions.Converters.Add(new JsonStringEnumConverter());
    });

// Configuração padrão do Swagger/OpenAPI (opcional, mas útil para testar a API)
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// =========================================================
// 2. CONFIGURAÇÃO DO PIPELINE HTTP
// =========================================================

var app = builder.Build();

// Configura o pipeline HTTP para desenvolvimento
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// --- Aplica a política de CORS antes dos endpoints ---
app.UseCors();

// --- Mapeia os Controllers (aqui seu PostsController é ativado) ---
app.MapControllers();

app.Run();
