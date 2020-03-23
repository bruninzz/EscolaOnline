using EscolasApi.Data;
using EscolasApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EscolasApi.Business
{
    public class EscolaService
    {
        private ApiDBContext _context;

        public EscolaService(ApiDBContext context)
        {
            _context = context;
        }

        public IEnumerable<Escola> ListarTodos()
        {
            return _context.Escolas
                .OrderBy(p => p.Nome).ToList();
        }

        public Resultado Incluir(Escola dadosEscola)
        {
            Resultado resultado = DadosValidos(dadosEscola);
            resultado.Acao = "Inclusão de Escola";
            try
            {
                if (resultado.Mensagens.Count == 0 &&
                _context.Escolas.Where(
                p => p.Id != dadosEscola.Id && p.Nome == dadosEscola.Nome).Count() > 0)
                {
                    resultado.Mensagens.Add(
                        "Escola já cadastrada");
                }

                if (resultado.Mensagens.Count == 0)
                {
                    _context.Escolas.Add(dadosEscola);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                resultado.Mensagens.Add("Erro:" + ex.Message);
            }
            return resultado;
        }

        public Escola Obter(int id)
        {
            return _context.Escolas
                .Find(id);
        }

        public Resultado Atualizar(Escola dadosEscola)
        {
            Resultado resultado = DadosValidos(dadosEscola);
            resultado.Acao = "Atualização de Escola";
            try
            {
                if (resultado.Mensagens.Count == 0)
                {
                    Escola escola = _context.Escolas.Where(
                        p => p.Id != dadosEscola.Id).FirstOrDefault();

                    if (escola == null)
                    {
                        resultado.Mensagens.Add(
                            "Escola não encontrada");
                    }
                    else
                    {
                        escola.Nome = dadosEscola.Nome;
                        escola.Cidade = dadosEscola.Cidade;
                        escola.Bairro = dadosEscola.Bairro;
                        _context.SaveChanges();
                    }
                }
            }
            catch (Exception ex)
            {
                resultado.Mensagens.Add("Erro:" + ex.Message);
            }
            return resultado;
        }

        public Resultado Excluir(int idEscola)
        {
            Resultado resultado = new Resultado();
            resultado.Acao = "Exclusão de Escola";
            try
            {
                Escola escola = Obter(idEscola);
                if (escola == null)
                {
                    resultado.Mensagens.Add(
                        "Produto não encontrado");
                }
                else
                {
                    _context.Escolas.Remove(escola);
                    _context.SaveChanges();
                }
            }
            catch (Exception ex)
            {
                resultado.Mensagens.Add("Erro:" + ex.Message);
            }            
            return resultado;
        }

        private Resultado DadosValidos(Escola escola)
        {
            var resultado = new Resultado();
            if (escola == null)
            {
                resultado.Mensagens.Add(
                    "Preencha os Dados da Escola");
            }
            else
            {
                if (String.IsNullOrWhiteSpace(escola.Cidade))
                {
                    resultado.Mensagens.Add(
                        "Preencha a Cidade");
                }
                if (String.IsNullOrWhiteSpace(escola.Bairro))
                {
                    resultado.Mensagens.Add(
                        "Preencha o Bairro");
                }
            }
            return resultado;
        }
    }
}
