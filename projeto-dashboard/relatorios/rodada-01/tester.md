# Relatório do Tester — rodada 01

## Versão examinada

Workspace sem Git. Os hashes atuais dos arquivos de produto coincidem com os registrados em `construtor.md`; a suíte foi executada sobre essa versão. SHA-256 final dos arquivos examinados:

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

Os arquivos de origem também mantiveram os hashes iniciais conferidos pelo teste Python: `papelaria_limpa.csv` `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## O que foi conferido e ajustado

- Não editei arquivos de produto. O `setUpClass` da suíte Python executou o preparador padrão e regenerou CSV/JSON; ambos mantiveram os hashes registrados pelo Construtor. Ajustei exclusivamente `tests/test_preparacao.py` e `tests/dashboard.test.mjs`.
- Python: validei preservação por hash, esquema, tipos, ausências, IDs, duplicatas, igualdade com a base limpa, CSV/JSON, recálculo independente por `Decimal`, agrupamentos e exemplo pequeno conhecido. O exemplo pequeno agora confere também os valores `valor_venda` calculados por registro; foram acrescentados casos de rejeição para duplicata exata e entradas inválidas conforme `analise.md`.
- Navegador: conferi os dados dos indicadores, os valores associados aos rótulos nos gráficos e as colunas reconhecidas da tabela. Testei os dois filtros isolados, ambos juntos, estado sem correspondência, limpeza, teclado, HTTP, erros de JavaScript/rede e viewports móvel e desktop.

## Comandos, resultados e evidências

Ambiente: Python `3.15.0` (`.venv`), Node `v24.21.0`. Os comandos são os documentados em `README.md`, executados na raiz do workspace.

1. `& '.\.venv\Scripts\python.exe' -m unittest discover -s '.\projeto-dashboard\tests' -p 'test_*.py' -v`
   - Resultado final: **9 testes, 9 aprovados, 0 falhas**, `OK` (15,200 s). Inclui a execução padrão do preparador e preservação dos hashes originais.

2. `node --test '.\projeto-dashboard\tests\dashboard.test.mjs'`
   - Resultado final: **12 testes, 12 aprovados, 0 falhas, 0 ignorados** (5,315 s). O teste de interação Chrome/Edge via CDP foi executado, sem skip.
   - Passaram: correspondência CSV/JSON e qualidade; carregamento HTTP dos recursos locais e JSON; estado inicial; filtro por categoria (65 vendas); filtro por cidade (70); combinação Livros/Santos (18); seleção sem correspondência (0); botão limpar; teclado nos dois filtros e botão; viewport móvel de 390×844 e desktop de 1440×900; ausência de erros de JavaScript/rede. Em cada estado, os testes verificam KPIs, tabela e gráficos; no estado vazio conferem mensagem, ticket sem divisão por zero e ausência de `NaN`/`Infinity`.
   - O teste HTTP inicia servidor estático temporário. O navegador é iniciado em modo headless e dirigido por CDP; nenhum teste de interface ficou pendente por falta de navegador.

3. Para escolher uma seleção vazia realista, conferi independentemente a tabela categoria×cidade com `csv` e `collections.Counter`. Todas as nove combinações existentes têm vendas: Acessórios (Campinas 25, Santos 23, Sorocaba 17), Livros (21, 18, 15) e Papelaria (24, 19, 18). Por isso o teste de vazio acrescenta uma opção sintética sem correspondência ao controle e dispara o evento de alteração; não modifica os dados nem o produto.

As saídas completas dos comandos foram observadas no terminal desta execução; os totais, contagens, skips e hashes relevantes estão registrados aqui.

## Problemas encontrados e encaminhamento

- As primeiras execuções do Node encontraram defeitos nos próprios testes: o regex de ID estava escapado incorretamente dentro de uma template string, o seletor `#tabela-vendas` apontava para `<tbody>` embora a coleta de cabeçalhos precisasse usar a tabela ancestral, e `Papelaria` + `Santos` não era uma combinação vazia (tem 19 vendas). Corrigi esses pontos exclusivamente no teste e executei novamente.
- A simulação de teclado por CDP inicialmente não ativava o botão com Enter. Completei a sequência de tecla com o evento `char` correspondente; Enter passou a limpar os filtros no navegador real. A versão final do teste verifica a ativação por teclado e a restauração dos 180 registros.
- Não reproduzi defeito de produto na versão examinada. **Encaminhamento ao Construtor: nenhum**. Enviar esta versão e as evidências ao Revisor para a revisão independente.
- Verificações obrigatórias do Tester não executadas: **nenhuma**. Revisão independente e aprovação conjunta continuam **PENDENTES** fora do escopo deste relatório.

## Status

**APROVADO pelo Tester** para os hashes listados acima. Este resultado não substitui a revisão do Revisor nem constitui aprovação conjunta/final do projeto.
