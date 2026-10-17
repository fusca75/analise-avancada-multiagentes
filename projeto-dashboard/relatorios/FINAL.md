# Relatório final — dashboard de vendas da papelaria

## Status conjunto: **APROVADO**

O Construtor, o Tester e o Revisor aprovaram a mesma versão na rodada 03. Os testes obrigatórios passaram, sem falhas ou skips, e não há pendências obrigatórias. O histórico das rodadas 01, 02 e 03 foi preservado em `relatorios/`.

**Nota de publicação:** o repositório inclui a documentação e os arquivos estáticos de `projeto-dashboard/site/`, incluindo `vendas.json` para o deploy. O CSV original, os scripts de preparo, os testes, as imagens e o ambiente local não foram incluídos. O JSON estático contém os registros usados pelo dashboard e será público junto com o site.

## Base e análise

- Fonte utilizada: `papelaria_limpa.csv`, preservada sem alterações.
- Granularidade: uma linha por venda, identificada por `id_venda`; são 180 vendas entre 01/01/2026 e 31/03/2026.
- Valor total vendido: **20.059,00**; ticket médio: **111,44**. A base não informa moeda, portanto nenhum símbolo monetário é presumido. Valor vendido não é lucro.
- A preparação em pandas valida o esquema, os tipos, valores vazios, IDs repetidos e a igualdade de `valor_venda` com `quantidade × preco_unitario`, sem remover linhas.

O site inclui três indicadores, dois gráficos com eixos e unidades identificados, tabela de vendas, filtros por categoria e cidade, ação para limpar os filtros e estado sem resultados. É conteúdo estático: sem banco de dados ou servidor de aplicação.

## Aprovação e testes da versão final

Na rodada 03:

- **Construtor — APROVADO:** produto e dados conferidos; sem alterações ao produto nesta rodada.
- **Tester — APROVADO:** Python **9/9**; Node/browser **13/13**, sem skips ou falhas.
- **Revisor — APROVADO:** repetiu as duas suítes, refez os cálculos independentemente e confirmou o fechamento dos achados anteriores.

O navegador headless Chrome/Edge verificou o carregamento HTTP, filtros isolados e combinados, estado vazio e limpeza, indicadores, gráficos, tabela, teclado e foco visível, erros JavaScript/rede e os tamanhos 390×844 e 1440×900. No estado vazio, o ticket é `—`, os eixos continuam identificados e a interface não exibe `NaN` ou símbolos de moeda.

### Comandos de teste

Execute no PowerShell, na pasta que contém `papelaria_limpa.csv` e `projeto-dashboard`:

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard\tests -p "test_*.py" -v
node --test .\projeto-dashboard\tests\dashboard.test.mjs
```

### Identificação da versão

Na execução do projeto, o workspace ainda não tinha histórico Git; os hashes SHA-256 abaixo identificam os artefatos aprovados antes da preparação do repositório para o Render:

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

## Como preparar e abrir o site no Windows

Se necessário, crie o ambiente e instale pandas uma vez. No Terminal do VS Code, aberto na pasta principal do projeto:

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install pandas
```

Prepare os dados:

```powershell
.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py --entrada .\papelaria_limpa.csv --destino .\projeto-dashboard
```

Inicie o servidor HTTP local para abrir o site:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site
```

Abra <http://localhost:8000>. Para encerrar, pressione **Ctrl+C** no terminal. A pasta `projeto-dashboard/site/` é a pasta publicável em hospedagem estática e está incluída no repositório para deploy no Render. O arquivo `render.yaml` define a branch `main`, o comando sem etapa de build e o diretório publicável.

## Registros e observações

- Relatórios individuais e evidências: `relatorios/rodada-01/`, `relatorios/rodada-02/` e `relatorios/rodada-03/`.
- As skills foram aplicadas a partir das cópias existentes em `.opencode/skills/` e `.opencode/validatedate/`. A primeira versão do `AGENTS.md` apontava para `.agents/skills/`, diretório que não existia; o arquivo foi atualizado para indicar os caminhos disponíveis.
- **PENDENTE opcional, não bloqueante:** teste com leitor de tela real (NVDA/JAWS). As verificações obrigatórias de semântica, conteúdo acessível, teclado e foco foram executadas no navegador.
