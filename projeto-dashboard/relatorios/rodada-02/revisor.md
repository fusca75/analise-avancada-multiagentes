# Relatório do Revisor — rodada 02

## Versão examinada

Workspace sem Git. Recalculei os hashes depois da execução Node; correspondem aos de `rodada-02/construtor.md` e `tester.md` para produto, dados e testes. Os hashes das fontes permanecem iguais aos critérios originais.

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
| `projeto-dashboard/tests/dashboard.test.mjs` | `5ACB3BD1FA560306D222E63713F2EAE7E0668451028ECA3C51DAB1260C0439D9` |
| `projeto-dashboard/relatorios/rodada-02/construtor.md` | `124D9CAB08F7483C70DA3E131DE72B4349FF49DF8857690C229E2A0208D7706B` |
| `projeto-dashboard/relatorios/rodada-02/tester.md` | `257DA7FF2E098DD3EADC8AA6D9575EC0BA9C722BBB271CBB1E57AD5C25CE2C88` |

Fontes preservadas: `papelaria_limpa.csv` `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## Revisão independente

- Li o relatório da rodada 01, os relatórios completos do Construtor e do Tester da rodada 02, critérios, análise, README, preparador, HTML/CSS/JavaScript, ambos os testes, CSV/JSON preparados, os dois CSVs de origem e `resumo.md`. Apliquei `validate-data` em `.opencode/validatedate/SKILL.md` e `data-visualization`; `.agents/skills/` continua ausente, conforme registrado nos relatórios/critério. As cópias locais de `explore-data` e `data-visualization` estão nos caminhos descritos em `criterios.md`.
- Os encaminhamentos da rodada 01 para rótulos explícitos de eixos/unidade e para conjunto exato dos grupos, geometria, resize móvel e percurso de teclado foram atendidos no produto/testes. Os dois SVGs declaram eixo, unidade e moeda não informada visivelmente e em `<desc>`; o teste agora confere conjunto exato, valores, marcas/geometria, ticks/baseline, limites após resize e Tab/Shift+Tab/foco visível.
- Recalculei os dados com Python padrão (`csv`, `Counter` e `Decimal`), sem importar o preparador nem os testes. O bruto tem 182 registros, 180 IDs únicos e 2 excedentes de duplicatas exatas (`V0010`, `V0020`). A base limpa/preparada tem 180 registros, 9 colunas, IDs únicos, zero campos vazios e zero duplicatas exatas; cada produto quantidade×preço confere e as linhas limpas/preparadas são iguais por ID e conteúdo.
- Perfil e metodologia conferem: 90 dias consecutivos de 01/01/2026 a 31/03/2026; 180 linhas representam vendas distintas; quantidade é unidade vendida, não contagem de vendas. Frequências por categoria, cidade e pagamento; médias/medianas e limites descritos em `analise.md` foram conferidos. A limpeza anterior e as limitações estão documentadas; os hashes dos originais e materiais anteriores continuam preservados.
- Recalculei o total `20.059,00`, 180 vendas e ticket `111,438888…`. Subtotais por categoria: Acessórios `10.517,00`, Livros `7.438,00`, Papelaria `2.104,00`; por mês: `6.235,00`, `6.181,00`, `7.643,00`; por cidade: Campinas `8.578,00`, Santos `6.937,50`, Sorocaba `4.543,50`. Cada grupo de subtotais soma `20.059,00`.
- Recalculei as seleções principais: Acessórios = 65 vendas, `10.517,00`, ticket `161,80`; Campinas = 70, `8.578,00`, ticket `122,542857…`; Livros + Santos = 18, `2.372,00`, ticket `131,777777…`; sem correspondência = 0, total zero e ticket indefinido. Todas as nove combinações categoria×cidade reais têm registros, então o filtro sintético de vazio é justificável.
- Inspecionei posicionamento e semântica dos SVGs. Em categorias, `Categoria` é renderizada acima da coluna de rótulos (x=90, y=26 no viewBox); barras começam no zero x=102; ticks horizontais precedem o rótulo de unidade na base. Em mês, o rótulo multilinha da unidade fica acima da área de dados (x=78, y=15/29/43), os meses ficam em y=295 e `Mês` em y=315 no viewBox de 320. Descrições acessíveis declaram os eixos e o baseline zero. Os estados sem dados exibem mensagem e removem marcas, valores e linhas antigas, mantendo títulos/unidades dos eixos. O formato não presume símbolo de moeda; a tabela mantém os registros detalhados como alternativa aos gráficos.

## Comandos, resultados e evidências

- `Get-FileHash -Algorithm SHA256` nos produtos, dados, testes, relatórios da rodada 02 e fontes: todos coincidem com os hashes registrados; a conferência repetida depois do Node não mostrou alterações.
- Auditorias independentes executadas com `python -c`, somente leitura e sem usar script/testes do projeto: contagem/duplicatas, igualdade limpo-preparado, fórmula linha a linha, grupos, seleções e perfil. Resultado: todos coincidem com os valores e regras documentados; evidências numéricas acima.
- `node --test '.\projeto-dashboard\tests\dashboard.test.mjs'`: **13 aprovados, 0 falhas, 0 ignorados** nesta revisão. O navegador headless via CDP foi executado sem skip; passaram HTTP, estados inicial/filtrados/vazio/limpar, associações e geometria dos gráficos, eixos/unidade, baseline, legibilidade/limites em 390×844 e 1440×900, Tab/Shift+Tab, foco visível e ausência de erros JS/rede. Evidência: saída terminal desta execução.
- Suíte Python: o relatório do Tester registra **9/9 aprovados, 0 falhas** nos hashes de produto/teste acima. Não a reexecutei nesta revisão porque seu `setUpClass` executa o preparador padrão e regrava CSV/JSON; a instrução é não alterar dados. A suíte obrigatória foi executada pelo Tester na mesma versão; recalculei os dados independentemente sem escrita.

## Problemas e encaminhamento

1. **Tester — lacuna obrigatória de cobertura no estado sem vendas (bloqueia aprovação).** Em `dashboard.test.mjs:1246-1249`, `assertDashboardState` permite `ticket === 0` ou qualquer texto que `parseLocalizedNumber` não consiga interpretar (`summary.count === 0`). Isso diverge de `analise.md`, que define o ticket sem vendas como `—`. Reprodução: substituir o traço exibido por `0,00` ou `N/A` no estado sintético vazio; a asserção atual aceita ambos. Além disso, `assertEmptyCharts` (`dashboard.test.mjs:1146-1165`) não verifica eixos/unidade visíveis ou acessíveis no vazio; remover `Categoria`/`Mês` ou o rótulo de unidade somente em `desenharGraficoVazio` (`dashboard.js:221-299`) ainda pode passar. Encaminho ao Tester: exigir `state.ticket === '—'` e conferir títulos/descrições dos eixos e unidade nos dois SVGs vazios, mantendo a verificação de ausência de marcas e valores antigos.
2. **Tester — cobertura do requisito de não presumir moeda.** As expressões em `dashboard.test.mjs:1002-1005` e `1254-1258` só rejeitam `R$`, `US$`, `$`, `€` e `£`; um símbolo como `¥` ou `₹` passaria pela asserção e pela leitura numérica. O produto atual não exibe símbolo, mas o teste não cobre a regra inteira. Considerar uma asserção para a classe Unicode de símbolos monetários (por exemplo `\p{Sc}`) no texto visível/acessível.
- **Construtor:** nenhum defeito de produto encontrado nesta versão; os eixos corrigidos estão posicionados e visíveis no browser, inclusive após resize, e as medidas/baselines conferem.

## Pendências

- **Obrigatória:** cobertura mais estrita do ticket e dos rótulos acessíveis no estado vazio; a suíte Node executa e passa, mas contém os falsos positivos reproduzíveis acima. A correção e reexecução pertencem ao Tester.
- **Opcional:** leitor de tela NVDA/JAWS não foi executado; revi semântica e descrição acessível no DOM/SVG e rodei interação por teclado em navegador real.
- **Opcional:** não repeti a suíte Python nesta revisão para evitar regravar dados; ela está executada e aprovada pelo Tester nos mesmos hashes. A conferência independente de dados foi somente leitura.

## Status

**REPROVADO.** A mesma versão aprovada pelo Construtor e pelo Tester foi revisada; cálculos, produto, encaminhamentos da rodada 01 e testes de navegador conferem. Ainda falta ao Tester fechar os falsos positivos obrigatórios do estado sem vendas (e reforçar a asserção geral de moeda) e reexecutar a suíte Node resultante.
