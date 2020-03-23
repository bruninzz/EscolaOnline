using EscolasApi.Data;
using EscolasApi.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EscolasApi.Business
{
    public class TurmaService
    {
        private ApiDBContext _context;

        public TurmaService(ApiDBContext context)
        {
            _context = context;
        }

        public IEnumerable<Turma> ListarTodos()
        {
            return _context.Turmas
                .OrderBy(p => p.Nome).ToList();
        }

        public IEnumerable<Turma> ListarTurmasEscola(int idEscola)
        {
            return _context.Turmas
                .Where(p => p.IdEscola == idEscola)
                .OrderBy(p => p.Nome).ToList();
        }

        public Resultado Incluir(Turma dadosTurma)
        {
            Resultado resultado = DadosValidos(dadosTurma);
            resultado.Acao = "Inclusão de Turma";
            try
            {
                if (resultado.Mensagens.Count == 0 &&
                _context.Turmas.Where(
                p => p.Id != dadosTurma.Id && p.Nome == dadosTurma.Nome).Count() > 0)
                {
                    resultado.Mensagens.Add(
                        "Turma já cadastrada");
                }

                if (resultado.Mensagens.Count == 0)
                {
                    _context.Turmas.Add(dadosTurma);
                    _context.SaveChanges();
                }

                return resultado;
            }
            catch (Exception ex)
            {
                resultado.Mensagens.Add("Erro:" + ex.Message);
                return resultado;
            }
        }

        public Turma Obter(int id)
        {
            return _context.Turmas
                .Find(id);
        }


        public Resultado Atualizar(Turma dadosTurma)
        {
            Resultado resultado = DadosValidos(dadosTurma);
            resultado.Acao = "Atualização de Turma";

            try
            {
                if (resultado.Mensagens.Count == 0)
                {
                    Turma turma = _context.Turmas.Where(
                        p => p.Id != dadosTurma.Id).FirstOrDefault();

                    if (turma == null)
                    {
                        resultado.Mensagens.Add(
                            "Turma não encontrada");
                    }
                    else
                    {
                        turma.Nome = dadosTurma.Nome;
                        turma.IdEscola = dadosTurma.IdEscola;
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

        public Resultado Excluir(int idTurma)
        {
            Resultado resultado = new Resultado();
            resultado.Acao = "Exclusão de Turma";
            try
            {
                Turma turma = Obter(idTurma);
                if (turma == null)
                {
                    resultado.Mensagens.Add(
                        "Turma não encontrada");
                }
                else
                {
                    _context.Turmas.Remove(turma);
                    _context.SaveChanges();
                }

            }
            catch (Exception ex)
            {
                resultado.Mensagens.Add("Erro:" + ex.Message);
            }
            return resultado;
        }

        private Resultado DadosValidos(Turma turma)
        {
            var resultado = new Resultado();
            if (turma == null)
            {
                resultado.Mensagens.Add(
                    "Preencha os Dados da Turma");
            }
            else
            {
                if (String.IsNullOrWhiteSpace(turma.Nome))
                {
                    resultado.Mensagens.Add(
                        "Preencha o Nome");
                }
            }
            return resultado;
        }
    }
}
