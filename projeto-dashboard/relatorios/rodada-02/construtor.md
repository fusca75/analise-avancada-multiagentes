# Relatório do Construtor — rodada 02

## Versão examinada

Workspace sem Git. SHA-256 após as alterações:

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

## Alterações

- `site/index.html`: substituí a nota vaga sobre ausência de símbolo por uma declaração explícita de que a fonte usa unidades monetárias e não informa a moeda.
- `site/js/dashboard.js`: os dois SVGs agora identificam os eixos no conteúdo visível e na descrição acessível. O gráfico por categoria mostra `Categoria` junto às categorias e o eixo de valor vendido com unidade; o mensal mostra `Mês` no eixo horizontal e valor vendido com unidade no eixo vertical. Os estados sem resultados mantêm os rótulos.
- `site/css/style.css`: acrescentei estilo legível para títulos de eixo e permiti que a nota de unidade se ajuste em larguras menores.
- Preservei o baseline zero, os dados dos gráficos e a tabela como alternativa detalhada. README e análise já documentam que a moeda não é informada, portanto não precisaram de alteração.
- Não regenerei dados: os arquivos preparados não foram modificados.

## Comandos, verificações e evidências

- `node --check '.\projeto-dashboard\site\js\dashboard.js'`: concluído sem erro de sintaxe.
- Revisei as coordenadas SVG no viewBox mínimo de 300 unidades. No gráfico de categoria, a área de dados vai de x=102 a x=226; o título `Categoria` fica acima da coluna de categorias; os ticks ficam separados do rótulo de valor, cuja última linha tem baseline em `altura - 16`. No gráfico mensal, a área de dados vai de x=78 a x=256 e y=56 a y=252; o rótulo de valor ocupa as linhas y=15, 29 e 43, e `Mês` fica em y=315 dentro da altura 320, após os meses em y=295. Os rótulos permanecem dentro do viewBox; os ticks/barras continuam partindo de zero. A conferência é estática; a renderização real em viewport fica pendente para o Tester.
- `Get-FileHash -Algorithm SHA256` nos arquivos de produto: resultados na tabela acima. Os CSVs/JSON preparados mantêm os hashes da rodada 01.
- `Get-FileHash -Algorithm SHA256` nas fontes e materiais anteriores: todos mantêm os hashes iniciais:
  - `papelaria_limpa.csv`: `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`
  - `vendas_papelaria.csv`: `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`
  - `resumo.md`: `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`
  - `graficos.py`: `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`
- Preparo de dados: **não executado**, pois nenhuma alteração de dados era necessária.

## Handoff e pendências

- **PENDENTE — Tester:** executar a suíte somente após este handoff. Conferir os novos rótulos e descrições, a correspondência exata dos grupos, geometria/valores dos gráficos, limites e legibilidade dos textos SVG em 390×844 e 1440×900, estado vazio e navegação/foco por teclado, conforme o encaminhamento do Revisor da rodada 01.
- Teste HTTP e verificação visual real em navegador também ficam **PENDENTES** para o Tester. Não executei a suíte nem abri o dashboard em navegador.
- Se houver falha reproduzida, retornar ao Construtor; depois dos testes, encaminhar esta versão ao Revisor.

## Status

**APROVADO pelo Construtor para handoff ao Tester.** A revisão visual no navegador e a aprovação conjunta continuam pendentes.
