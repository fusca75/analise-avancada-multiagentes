# Relatório do Construtor — rodada 01

## Versão examinada

Workspace sem Git. SHA-256 dos arquivos de produto examinados após o preparo:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/preparar_dados.py` | `7E28EFE85315ADB9CEECEA25A839F090F4DB069E92798181D65270FFDAF9DE9B` |
| `projeto-dashboard/analise.md` | `52DCA7F434535938EE9ECAE160A5FE182C3E56D6EBC0A95F595F0D744D74D7F5` |
| `projeto-dashboard/README.md` | `147558E976F6E55274FEAEAB58B849FFF6827F48AB7292C6802D080962EB335E` |
| `projeto-dashboard/site/index.html` | `BE7E805F68AE4E7FC23CE1F8782837E0D46EED235EDFB499409B480938187B82` |
| `projeto-dashboard/site/css/style.css` | `C4B3F305FAE4ACE0C56DCE2BDF6051E8999B98CD1802CA1CC97CC167BF31A04D` |
| `projeto-dashboard/site/js/dashboard.js` | `823EC1059EFD1E4C6345F1BB4532D33FE8A2ACCE8F26C06DCB4F41DA79756304` |
| `projeto-dashboard/dados/vendas.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `projeto-dashboard/site/dados/vendas.json` | `F598BCECCB7269DF18A4CBAC1A0B23BAB1D067C2E1A5B242031FA2319B473C68` |

## O que foi conferido e alterado

- Inspecionei os critérios, a análise, o README, o preparador e os arquivos do site. A implementação já continha os três indicadores, dois gráficos, tabela, filtros sincronizados por categoria e cidade, limpeza dos filtros, estado vazio, formatação sem símbolo de moeda e layout responsivo.
- Ajustei em `site/index.html` o texto acessível da região rolável da tabela para orientar o uso das setas do teclado em telas pequenas.
- Executei novamente o preparo com pandas. Foram preservadas as 180 vendas; o CSV preparado e o JSON do site foram regenerados.
- Skills consultadas nos caminhos existentes: `.opencode/skills/explore-data/skill.md`, `.opencode/skills/data-visualization/SKILL.md` e `.opencode/validatedate/SKILL.md`. O caminho `.agents/skills/` descrito no `AGENTS.md` não existe; não afirmo tê-lo lido.

## Comandos, resultados e evidências

- Preparo executado com sucesso:

  ```powershell
  & '.\.venv\Scripts\python.exe' '.\projeto-dashboard\preparar_dados.py' --entrada '.\papelaria_limpa.csv' --destino '.\projeto-dashboard'
  ```

  Saída: `Vendas preservadas: 180`; gerados `projeto-dashboard/dados/vendas.csv` e `projeto-dashboard/site/dados/vendas.json`.
- Conferência local curta dos dados preparados:

  ```powershell
  & '.\.venv\Scripts\python.exe' -c "import pandas as pd; d=pd.read_csv('projeto-dashboard/dados/vendas.csv'); print('linhas=', len(d), 'colunas=', len(d.columns), 'ids_unicos=', d['id_venda'].nunique(), 'nulos=', int(d.isna().sum().sum()), 'total=', round(d['valor_venda'].sum(), 2))"
  ```

  Resultado: 180 linhas, 9 colunas, 180 IDs únicos, nenhum nulo e total 20.059,00. Na conferência adicional com `Decimal`, `valor_venda = quantidade × preco_unitario` em todas as linhas; JSON também contém 180 registros. Agrupamentos conferidos: categorias — Acessórios 10.517,00, Livros 7.438,00, Papelaria 2.104,00; meses — janeiro 6.235,00, fevereiro 6.181,00, março 7.643,00. Ticket: 111,438888… (sem moeda presumida).
- `node --check '.\projeto-dashboard\site\js\dashboard.js'`: concluído sem erro de sintaxe.
- Conferi os SHA-256 de `papelaria_limpa.csv`, `vendas_papelaria.csv`, `resumo.md` e `graficos.py`; todos permanecem iguais aos valores iniciais registrados em `criterios.md`:
  - `papelaria_limpa.csv`: `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`
  - `vendas_papelaria.csv`: `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`
  - `resumo.md`: `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`
  - `graficos.py`: `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`

## Pendências e encaminhamento

- **PENDENTE — Tester:** suíte Python/Node, teste HTTP, interação real no navegador, filtros isolados/combinados/vazios/limpar, responsividade e uso por teclado. Não executei a suíte nem testes de navegador.
- Não encontrei defeito de produto que impeça a entrega desta versão. Encaminhar qualquer falha reproduzida pelo Tester ao Construtor; após a suíte, encaminhar a mesma versão ao Revisor.

## Status

**APROVADO pelo Construtor para avaliação independente.** Este status não substitui a aprovação do Tester, do Revisor nem o status conjunto final.
