using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace EscolasApi
{
    public class Resultado
    {
        public string Acao { get; set; }

        public bool Sucesso
        {
            get { return _Mensagens == null || Mensagens.Count == 0; }
        }

        private List<string> _Mensagens = new List<string>();
        public List<string> Mensagens
        {
            get { return _Mensagens; }
        }
    }
}
