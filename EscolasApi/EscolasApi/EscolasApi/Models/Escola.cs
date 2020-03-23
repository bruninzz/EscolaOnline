using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace EscolasApi.Models
{
    public class Escola
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int Id { get; set; }

        public string Nome { get; set; }

        public string Cidade { get; set; }

        public string Bairro { get; set; }

        public List<Turma> Turmas { get; set; }
    }
}
