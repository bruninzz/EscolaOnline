using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using EscolasApi.Business;
using EscolasApi.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace EscolasApi.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TurmaController : ControllerBase
    {
        private TurmaService _service;

        public TurmaController(TurmaService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<Turma> Get()
        {
            return _service.ListarTodos();
        }

        [HttpGet("getturmasescola/{id}")]
        public IEnumerable<Turma> GetTurmas(int id)
        {
            return _service.ListarTurmasEscola(id);
        }

        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var turma = _service.Obter(id);
            if (turma != null)
                return new ObjectResult(turma);
            else
                return NotFound();
        }

        [HttpPost]
        public Resultado Post([FromBody]Turma turma)
        {
            return _service.Incluir(turma);
        }

        [HttpPut]
        public Resultado Put([FromBody]Turma turma)
        {
            return _service.Atualizar(turma);
        }

        [HttpDelete("{id}")]
        public Resultado Delete(int id)
        {
            return _service.Excluir(id);
        }

    }
}