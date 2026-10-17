# Relatório do Revisor — rodada 01

## Versão examinada

Workspace sem Git. A versão examinada é a mesma que consta nos relatórios do Construtor e do Tester: todos os hashes abaixo foram recalculados e coincidem com ambos os relatórios. Os hashes dos arquivos de origem também coincidem com `criterios.md`.

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
| `projeto-dashboard/tests/test_preparacao.py` | `E5F84820E6D56B6CC8DBB9DEB312B7FFCB3647A8192D009F6496084461C48ADE` |
| `projeto-dashboard/tests/dashboard.test.mjs` | `A88619051DBFC087B38B4EB794F1BEC59EEE7F73B8CA04FA8A5287E2AD8D4E08` |

Fontes preservadas: `papelaria_limpa.csv` `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## O que foi conferido

- Li `construtor.md`, `tester.md`, `criterios.md`, `analise.md`, README, preparador, HTML/CSS/JS, ambos os testes, CSV e JSON preparados, os dois CSVs de origem e `resumo.md`. Apliquei as verificações metodológicas e de visualização de `validate-data` e `data-visualization`.
- Fiz recálculo independente, somente leitura, usando Python padrão (`csv`, `collections.Counter` e `Decimal`), sem importar o preparador nem os testes. O bruto tem 182 vendas e 180 IDs; os dois excedentes de duplicatas exatas são `V0010` e `V0020`. Reconstruí `papelaria_limpa.csv` a partir do bruto aplicando apenas a deduplicação exata documentada, remoção de espaços em 6 cidades, ajuste de caixa em 3 categorias, substituição de 4 pagamentos vazios por “Não informado” e cálculo de `valor_venda`: o resultado coincidiu integralmente por ID e conteúdo.
- Os dados limpos e preparados têm 180 linhas, 9 colunas, 180 IDs únicos, nenhum campo vazio nem duplicata exata; as linhas preparadas correspondem à base limpa. `valor_venda = quantidade × preco_unitario` nas 180 vendas. Quantidade varia de 1 a 5, preço de 3,50 a 95,00; há 90 datas e 6 produtos. As frequências e estatísticas de perfil de `analise.md` conferem.
- Recalculei com `Decimal`: total `20.059,00`, 180 vendas e ticket `111,438888…`. Subtotais por categoria: Acessórios `10.517,00`, Livros `7.438,00`, Papelaria `2.104,00`; por mês: janeiro `6.235,00`, fevereiro `6.181,00`, março `7.643,00`; por cidade: Campinas `8.578,00`, Santos `6.937,50`, Sorocaba `4.543,50`. Os três conjuntos de subtotais somam `20.059,00`.
- Recalculei filtros sem usar a lógica do dashboard: Acessórios = 65 vendas, `10.517,00`, ticket `161,80`; Campinas = 70, `8.578,00`, ticket `122,542857…`; Livros + Santos = 18, `2.372,00`, ticket `131,777777…`; seleção sem correspondência = 0, total 0 e ticket indefinido. Todas as nove combinações reais categoria×cidade têm vendas, justificando o caso vazio sintético do Tester.
- As definições da análise e da interface são consistentes: uma linha e um `id_venda` por venda; ticket = total dividido por vendas; filtros afetam KPIs, gráficos e tabela. O período completo observado é janeiro–março de 2026. A análise não chama valor vendido de lucro nem presume moeda, e comunica as limitações de custos, período curto e cobertura da fonte.
- Revisei o dashboard estático e os gráficos: barras horizontais por categoria e linha por mês são adequadas; ambos usam baseline zero, rótulos/ticks numéricos legíveis no código, valores em formato `pt-BR` e sem símbolo monetário. O SVG tem título e descrição acessível; a tabela expõe os registros subjacentes. HTML fornece labels aos filtros, região rolável da tabela e instrução de teclado; CSS fornece foco visível e layout responsivo.

## Comandos, resultados e evidências

- `Get-FileHash -Algorithm SHA256` nos arquivos de produto, testes e fontes: todos os hashes coincidem com os relatórios anteriores; repetido após o teste Node, sem divergências. Evidência: tabela de versão acima.
- Auditoria independente executada com `python -c` na raiz do workspace, usando apenas a biblioteca padrão, `csv` e `Decimal`. Resultados: validação de limpeza e correspondência limpo/preparado `True`; igualdade de cada produto quantidade×preço `True`; totais e agrupamentos listados acima. Evidência: resultados desta execução no terminal.
- `node --test '.\projeto-dashboard\tests\dashboard.test.mjs'`: **12 aprovados, 0 falhas, 0 ignorados**. A execução incluiu HTTP estático e navegador headless via CDP; passaram o estado inicial, filtros isolados/combinados, estado vazio, limpeza, teclado, 390×844 e 1440×900, sem erros JS/rede. Evidência: saída do comando desta revisão.
- Suíte Python: `tester.md` registra o comando do README e **9/9 aprovados, 0 falhas**, na mesma versão SHA-256. Não a reexecutei nesta revisão: o `setUpClass` chama o preparador e regrava CSV/JSON derivados, e a instrução é manter os dados intocados. Os dados foram conferidos independentemente em modo somente leitura.

## Problemas encontrados e encaminhamento

1. **Produto — encaminhar ao Construtor (bloqueia aprovação): rótulos explícitos dos eixos/unidade ausentes.** Reprodução: abra o dashboard por HTTP; no gráfico de categoria há categorias e ticks numéricos, e no mensal há meses e ticks numéricos, mas nenhum título de eixo. `site/js/dashboard.js` (funções `desenharCategorias` e `desenharGraficoMensal`) gera ticks, rótulos de dados e descrições, sem nomear os eixos; a nota “Valores sem símbolo de moeda” no cabeçalho não é um rótulo de eixo nem declara a unidade. Isso não atende ao requisito de eixos identificados e à recomendação de unidades. Acrescentar, visível e acessível, por exemplo, `Categoria`/`Mês` e `Valor vendido (unidades monetárias da fonte; moeda não informada)`, sem inserir símbolo monetário.
2. **Cobertura — encaminhar ao Tester:** `assertChartMatches` confirma que cada grupo esperado aparece, mas não que o conjunto seja exato nem que geometria e rótulos caibam no gráfico. Caso reproduzível: no filtro Acessórios, manter também barras antigas de Livros/Papelaria com os valores esperados de Acessórios ainda pode passar; geometria errada com `aria-label` correto também pode passar. Acrescentar asserções de conjunto exato de categorias/meses, valores associados à geometria e rótulos de eixos/baseline. O teste de viewport atual verifica largura da página e posição/tamanho dos controles, não limites/legibilidade dos textos SVG após o redesenho; esperar o resize e verificar os rótulos dos dois gráficos em 390px e 1440px. O teste de teclado envia setas/Enter reais, mas foca controles via JavaScript; incluir navegação Tab/Shift+Tab e foco visível fecharia a lacuna de percurso por teclado.

## Verificações pendentes

- **PENDENTE:** validação com leitor de tela real; revisei a semântica HTML/SVG e os snapshots de acessibilidade do navegador, mas não executei NVDA/JAWS.
- A suíte Python obrigatória foi executada e aprovada pelo Tester no hash acima; apenas não houve repetição independente pelo Revisor.

## Status

**REPROVADO.** Os cálculos, a limpeza e a interação funcional conferem para a mesma versão aprovada pelo Tester. A aprovação desta rodada depende dos rótulos explícitos dos eixos/unidade no produto e do fechamento da cobertura de gráficos/responsividade/teclado; encaminhar os itens ao Construtor e ao Tester e repetir os testes afetados na próxima rodada.
