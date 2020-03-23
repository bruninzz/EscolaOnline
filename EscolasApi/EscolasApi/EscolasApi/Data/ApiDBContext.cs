using EscolasApi.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EscolasApi.Data
{
    public class ApiDBContext : DbContext
    {
        public ApiDBContext(DbContextOptions options) : base(options)
        { }

        public DbSet<Escola> Escolas { get; set; }

        public DbSet<Turma> Turmas { get; set; }


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Escola>()
                .HasKey(p => p.Id);

            modelBuilder.Entity<Turma>()
              .HasKey(p => p.Id);

        }
    }
}
