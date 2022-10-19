using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace Zoo.API.Model
{
    public class ApplicationDbContext : DbContext
    {
        
        
            public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
            : base(options) { }


            protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
            {
                optionsBuilder.EnableSensitiveDataLogging();
                // ...
            }


            public DbSet<Category> categories { get; set; }
            public DbSet<Contact> Contacts { get; set; }
    }
    }

