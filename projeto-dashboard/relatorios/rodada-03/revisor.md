# Relatório do Revisor — rodada 03

## Versão examinada

Workspace sem Git. A versão revisada é exatamente a que consta nos relatórios da rodada 03: hashes conferidos antes e depois da execução das suítes e comparados com Construtor e Tester.

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/preparar_dados.py` | `7E28EFE85315ADB9CEECEA25A839F090F4DB069E92798181D65270FFDAF9DE9B` |
| `projeto-dashboard/analise.md` | `52DCA7F434535938EE9ECAE160A5FE182C3E56D6EBC0A95F595F0D744D74D7F5` |
| `projeto-dashboard/README.md` | `147558E976F6E55274FEAEAB58B849FFF6827F48AB7292C6802D080962EB335E` |
| `projeto-dashboard/site/index.html` | `0B07B9938CCF702FD601B9135B59A117AB53EFD042E1356F0796CBF19C62EBB4` |
| `projeto-dashboard/site/css/style.css` | `B7219B869C85249D2B1E6F5497FFD091B0979A5BB1846330E3F55F62B941A8FB` |
| `projeto-dashboard/site/js/dashboard.js` | `CC1DC70C716AA9C3C438862EACACE15679C4EC6DD08EE487766F394566B241AC` |
| `projeto-dashboard/dados/vendas.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `projeto-dashboard/site/dados/vendas.json` | `F598BCECCB7269DF18A4CBAC1A0B23BAB1D067C2E1A5B242031FA2319B473C68` |
| `projeto-dashboard/tests/test_preparacao.py` | `E5F84820E6D56B6CC8DBB9DEB312B7FFCB3647A8192D009F6496084461C48ADE` |
| `projeto-dashboard/tests/dashboard.test.mjs` | `692DDD1FA0F3AA583D3F6AB97EB57EDB30C812313E1C08DBB751BE9664B67046` |
| `projeto-dashboard/relatorios/rodada-03/construtor.md` | `76B107439719541C6A9384321D4358CAE7E188A5A72D12BF979BE733300B9EF6` |
| `projeto-dashboard/relatorios/rodada-03/tester.md` | `DA1A2619B0D765F2E9A4FC4E804C3D57376A207DF22CB7CD7C38DBCC246B8B0C` |

Fontes e materiais preservados: `papelaria_limpa.csv` `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## Revisão independente e fechamento dos handoffs

- Li `rodada-01/revisor.md`, `rodada-02/revisor.md`, os relatórios completos da rodada 03, critérios, análise, README, preparador, HTML/CSS/JS, testes e dados. Apliquei `validate-data` em `.opencode/validatedate/SKILL.md` e `data-visualization`; `.agents/skills/` não existe. As cópias locais das skills usadas estão documentadas em `criterios.md` e relatórios anteriores.
- **Ticket vazio:** o teste agora exige `state.ticket === '—'`. Conferi que `0,00` e `N/A` não satisfazem essa igualdade, enquanto `—` satisfaz; o dashboard também mostra `—` quando não há vendas.
- **Eixos no vazio:** `assertEmptyCharts` chama `assertChartAxes` para ambos os SVGs. Essa asserção exige título visível de `Categoria`/`Mês`, rótulo visível da unidade e declarações dos dois eixos na descrição acessível. Remover um título ou unidade do render vazio faz uma dessas asserções falhar; marcas, valores, linhas e rótulos antigos também são rejeitados.
- **Símbolo monetário:** `assertNoCurrencySymbols` usa `/\p{Sc}/u` no conteúdo visível e acessível e nos textos/descrições/marcas dos gráficos, inclusive no estado vazio. Testei a mesma classe Unicode: `¥`, `₹`, `₩`, `₽`, `€`, `$`, `£` e `R$` são detectados; `20.059,00`, `111,44`, `0`, `—` e `2026-03` não são capturados. Portanto a regra não rejeita números comuns.
- Os três encaminhamentos obrigatórios da rodada 02 foram fechados. Os rótulos de eixos/unidade permanecem visíveis e acessíveis; baseline zero, grupos, valores e geometria são verificados; resize, legibilidade, Tab/Shift+Tab e foco visível foram conferidos no navegador. Não encontrei bypass nas novas asserções.

## Metodologia, dados e recálculos

- Recalculei de forma independente com Python padrão (`csv`, `Counter` e `Decimal`), sem importar script ou lógica dos testes. O bruto tem 182 registros, 180 IDs e 2 linhas excedentes de duplicatas exatas (`V0010`, `V0020`). Reaplicando a limpeza documentada ao bruto, obtive correspondência integral com `papelaria_limpa.csv`; os dados preparados coincidem com a base limpa por ID e conteúdo.
- A saída preparada tem 180 linhas e 9 colunas, 180 IDs únicos, nenhum campo vazio nem duplicata exata. `valor_venda = quantidade × preco_unitario` confere em todas as linhas. Período: 01/01/2026–31/03/2026, 90 datas distintas; as fontes e os materiais anteriores mantêm os hashes iniciais.
- Total independente: `20.059,00` em 180 vendas; ticket `111,438888…`. Subtotais por categoria: Acessórios `10.517,00`, Livros `7.438,00`, Papelaria `2.104,00`; por mês: janeiro `6.235,00`, fevereiro `6.181,00`, março `7.643,00`; por cidade: Campinas `8.578,00`, Santos `6.937,50`, Sorocaba `4.543,50`. Cada partição soma `20.059,00`.
- Seleção independente por cidade Campinas: 70 vendas, total `8.578,00`, ticket `122,542857…`. As definições da interface/documentação são coerentes: uma linha por venda, venda contada por ID distinto e ticket igual ao total dividido pela quantidade de vendas. A fonte não declara moeda; valor vendido não é chamado de lucro; período curto, pagamentos não informados e cobertura limitada da fonte estão documentados.
- Os gráficos horizontais por categoria e de linha por mês são apropriados. Ambos têm eixos identificados com unidade sem moeda presumida, rótulos legíveis, descrições acessíveis, baseline zero e tratamento explícito sem dados. Filtros categoria/cidade atualizam KPIs, gráficos e tabela; a tabela detalhada oferece consulta dos registros subjacentes. HTML/CSS mantêm labels, foco visível, controles nativos por teclado e layout responsivo.

## Comandos, resultados e evidências

- `Get-FileHash -Algorithm SHA256` nos arquivos da entrega, testes, relatórios e fontes: todos os resultados da tabela acima coincidem com os relatórios de Construtor/Tester. Após o Python regenerar os artefatos derivados, `dados/vendas.csv` e `site/dados/vendas.json` mantiveram os hashes esperados; fontes e arquivos de produto/teste permaneceram inalterados.
- `python -c` com `csv`, `collections` e `Decimal`: conferiu limpeza, linha a linha, fórmula, total, agrupamentos e seleção Campinas. Resultados e valores estão registrados acima; nenhum script ou teste do projeto foi importado.
- `node -e` com a expressão `/\p{Sc}/u` e comparação exata do ticket: passou os casos de números/traço e símbolos listados acima.
- `& '.\.venv\Scripts\python.exe' -m unittest discover -s '.\projeto-dashboard\tests' -p 'test_*.py' -v`: **9 aprovados, 0 falhas** (`OK`, 16,213 s).
- `node --test '.\projeto-dashboard\tests\dashboard.test.mjs'`: **13 aprovados, 0 falhas, 0 ignorados** (`cancelled=0`, `todo=0`, 6,094 s). Chrome/Edge headless via CDP executado sem skip: HTTP, CSV/JSON, estados inicial, filtros e vazio, ticket exato, eixos/unidade vazios, `Sc`, geometria/baseline, teclado e foco, viewports 390×844/1440×900 e erros JS/rede. Evidências: saídas completas dos dois comandos no terminal desta revisão.

## Pendências

- **Obrigatórias não executadas: nenhuma.** As duas suítes completas foram executadas nesta revisão; os artefatos preparados mantêm os hashes esperados.
- **Opcional pendente:** não executei NVDA/JAWS com leitor de tela real. Essa verificação foi explicitamente opcional na rodada 02; as verificações obrigatórias de semântica, conteúdo acessível e teclado foram executadas.

## Status por agente

| Agente | Status para a versão examinada |
|---|---|
| Construtor | **APROVADO** para os hashes de produto e dados acima (`rodada-03/construtor.md`). |
| Tester | **APROVADO** para os hashes de produto, dados e testes acima (`rodada-03/tester.md`); Python 9/9 e Node 13/13. |
| Revisor | **APROVADO** nesta revisão independente dos mesmos hashes; Python 9/9 e Node 13/13 também foram repetidos. |

**APROVADO pelo Revisor.** Não declaro aprovação conjunta/final do projeto; essa consolidação cabe ao coordenador em `relatorios/FINAL.md`.
