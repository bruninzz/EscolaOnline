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
    public class EscolaController : ControllerBase
    {
        private EscolaService _service;

        public EscolaController(EscolaService service)
        {
            _service = service;
        }

        [HttpGet]
        public IEnumerable<Escola> Get()
        {
            return _service.ListarTodos();
        }
        [HttpGet("{id}")]
        public IActionResult Get(int id)
        {
            var escola = _service.Obter(id);
            if (escola != null)
                return new ObjectResult(escola);
            else
                return NotFound();
        }

        [HttpPost]
        public Resultado Post([FromBody]Escola escola)
        {
            return _service.Incluir(escola);
        }

        [HttpPut]
        public Resultado Put([FromBody]Escola escola)
        {
            return _service.Atualizar(escola);
        }

        [HttpDelete("{id}")]
        public Resultado Delete(int id)
        {
            return _service.Excluir(id);
        }


    }
}