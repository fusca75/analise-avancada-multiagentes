# Relatório do Tester — rodada 02

## Versão examinada

Workspace sem Git. Comparei os hashes atuais aos registrados em `rodada-02/construtor.md`; todos os hashes de produto coincidem. As suítes foram executadas com os hashes dos testes abaixo.

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

Hashes das fontes/materiais anteriores, também verificados: `papelaria_limpa.csv` `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## O que foi testado

- A suíte Python confirmou preservação das fontes, preparo padrão, esquema/tipos/ausências/duplicatas, correspondência CSV/JSON, cálculos e agrupamentos independentes e exemplo conhecido.
- O navegador conferiu os dados apresentados por KPIs, tabela e gráficos em estado inicial e filtrados. Para os gráficos, o teste compara conjuntos exatos de rótulos e valores, associa barras/pontos/labels por dados e coordenadas, verifica ticks e baseline zero e confere que a linha mensal liga exatamente seus pontos.
- Foram verificados os rótulos visíveis e as descrições acessíveis dos eixos `Categoria`, `Mês` e `Valor vendido (unidades monetárias da fonte; moeda não informada)`, sem presumir símbolo de moeda.
- Com o filtro de Campinas ativo, o teste aguardou eventos de resize/redesenho e conferiu viewBox, caixa e tamanho mínimo dos textos SVG em dispositivos de 390×844 e 1440×900. Também percorreu o foco natural por Tab e Shift+Tab, usou setas nos selects e Enter para limpar, verificando `:focus-visible`.

## Comandos, resultados e evidências

Comandos do README, executados na raiz do workspace:

1. `& '.\.venv\Scripts\python.exe' -m unittest discover -s '.\projeto-dashboard\tests' -p 'test_*.py' -v`
   - Resultado final: **9 testes aprovados, 0 falhas**, `OK` (16,444 s).

2. `node --test '.\projeto-dashboard\tests\dashboard.test.mjs'`
   - Resultado final: **13 testes aprovados, 0 falhas, 0 ignorados** (5,938 s; `cancelled=0`, `todo=0`). A interação headless Chrome/Edge via CDP foi executada, sem skip.
   - Passaram o servidor HTTP estático, carregamento dos recursos/JSON, estado inicial, filtros por categoria/cidade, filtros combinados, seleção sem resultados, limpeza, teclado, layout e ausência de erros JS/rede. A seleção combinada Livros/Santos contém 18 vendas; o estado sem correspondência contém 0.
   - Evidência de resize: a configuração de dispositivo foi 390×844 e 1440×900. No desktop, `window.innerWidth` representa os 1440 px configurados e `visualViewport.width` é 1425 px, descontada a barra de rolagem; limites visuais foram medidos contra o `visualViewport` observado.

## Problemas encontrados e encaminhamento

- Uma execução diagnóstica inicial falhou no resize desktop porque o teste comparava `visualViewport.width` diretamente com 1440; o navegador reportou 1425 px de área visível com a barra de rolagem. Corrigi o teste para validar a largura configurada por `window.innerWidth`, continuar aguardando evento de resize e usar a largura visível observada para os limites. A suíte final passou; não foi reproduzido defeito de produto.
- Não editei arquivos de produto ou dados. A suíte Python executou o preparador padrão; os hashes de CSV/JSON permaneceram iguais aos da entrega do Construtor.
- **Encaminhamento ao Construtor: nenhum defeito de produto reproduzido.** Encaminhar esta versão ao Revisor para a revisão independente da rodada 02.
- Verificações obrigatórias do Tester não executadas: **nenhuma**. A revisão independente e a aprovação conjunta permanecem **PENDENTES** fora do escopo deste relatório.

## Status

**APROVADO pelo Tester** para os hashes listados nesta versão. Este status não substitui a revisão do Revisor nem constitui aprovação conjunta/final do projeto.
