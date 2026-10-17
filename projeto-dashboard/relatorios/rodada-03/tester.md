# Relatório do Tester — rodada 03

## Versão examinada

Workspace sem Git. Os hashes atuais do produto e dos dados coincidem com `rodada-03/construtor.md` e com a versão aprovada na rodada 02. A execução final usou os hashes de teste abaixo.

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

Fontes/materiais anteriores preservados, conferidos por SHA-256 e pelo teste Python: `papelaria_limpa.csv` `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## Handoff da rodada 02 e ajuste do Tester

- O Revisor da rodada 02 confirmou o produto, mas encontrou três lacunas obrigatórias de asserção: ticket vazio aceitava zero ou texto arbitrário em vez do traço documentado; o caso vazio não exigia títulos/unidade nos SVGs e descrições acessíveis; e a regra de moeda cobria apenas alguns símbolos.
- Ajustei somente `projeto-dashboard/tests/dashboard.test.mjs`: no estado vazio agora exijo `state.ticket === '—'`; `assertEmptyCharts` chama as verificações de eixos e unidade em ambos os gráficos e mantém as verificações de ausência de marcas/linhas/valores/rótulos antigos; a rejeição de moeda agora usa `\p{Sc}` com flag `u` no texto visível, no conteúdo acessível do painel e nos rótulos/descrições SVG. Valores numéricos continuam permitidos.
- **Houve ajuste ao próprio teste:** sim, exclusivamente para fechar as lacunas apontadas pelo Revisor. Não alterei produto, dados nem relatórios anteriores.

## Comandos, resultados e evidências

Comandos do README executados na raiz do workspace:

1. `& '.\.venv\Scripts\python.exe' -m unittest discover -s '.\projeto-dashboard\tests' -p 'test_*.py' -v`
   - Resultado: **9 testes aprovados, 0 falhas**, `OK` (16,094 s). Confirmou fontes preservadas, preparo, qualidade, valores e agrupamentos.

2. `node --test '.\projeto-dashboard\tests\dashboard.test.mjs'`
   - Resultado: **13 testes aprovados, 0 falhas, 0 ignorados** (6,056 s; `cancelled=0`, `todo=0`). Navegador Chrome/Edge headless via CDP executado, sem skip.
   - Passaram HTTP local, CSV/JSON, estados inicial/filtrados/vazio/limpar, KPIs, tabela, conjuntos exatos e geometria dos gráficos, eixos/unidade no estado vazio, ausência de símbolos `Sc` em conteúdo visível/acessível, teclado, foco visível, viewports 390×844 e 1440×900 e ausência de erros JS/rede.
   - No estado sem correspondência, o ticket foi exatamente `—`; os dois SVGs mantiveram `Categoria`/`Mês` e a unidade nas partes visíveis e acessíveis, sem dados antigos.

As saídas completas foram observadas no terminal desta execução; as contagens, estados e hashes estão registrados acima. O preparador executado pelo `setUpClass` regenerou CSV/JSON com hashes inalterados.

## Problemas, pendências e encaminhamento

- Não houve falhas ou skips na execução final e não foi reproduzido defeito de produto. **Encaminhamento ao Construtor: nenhum.** O produto permaneceu nos hashes aprovados pelo Construtor.
- Verificações obrigatórias do Tester não executadas: **nenhuma**.
- **PENDENTE, fora da suíte obrigatória:** revisão independente do Revisor para a rodada 03 e aprovação conjunta. A validação com leitor de tela real NVDA/JAWS, marcada como opcional no relatório do Revisor da rodada 02, também não foi executada nesta rodada.

## Status

**APROVADO pelo Tester** para os hashes desta versão. Este status não substitui a revisão independente nem representa aprovação conjunta/final do projeto.
