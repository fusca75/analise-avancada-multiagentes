# Critérios registrados — rodada 01

## Base confirmada

- Arquivo indicado pelo usuário: `papelaria_limpa.csv`.
- A base contém 180 linhas e 9 colunas; `id_venda` é único, não há valores ausentes nem duplicatas exatas, e `valor_venda` confere com `quantidade * preco_unitario` em todas as linhas.
- Período: 2026-01-01 a 2026-03-31. Total observado: 20.059,00 em unidades monetárias da base; quantidade de vendas: 180; ticket médio: 111,438888… por venda.
- O CSV indicado, `vendas_papelaria.csv` (original) e os arquivos da atividade anterior devem permanecer sem alteração.
- SHA-256 inicial: `papelaria_limpa.csv` = `E25B6C2CDF05A6492F6495A91F9384565629F26E1318039F75734DCD9856995D`; `vendas_papelaria.csv` = `BF95B7609E30EB7E3E6A30CFC16E43D9FB5BDFC48A410E49148CCEB92E2494FF`; `resumo.md` = `6048F9A4E492B1E9FC3586776D17536FF46604F42D29585092E4EB243EB058C0`; `graficos.py` = `4B5189412887852D0543B17B1D15801F9B770DA0073E6D01CDC0EF0613BBFBCF`.

## Critérios de aprovação

1. Criar a entrega em `projeto-dashboard/`, usando Python e pandas para gerar dados preparados e mantendo o site estático, sem servidor de aplicação ou banco de dados.
2. Documentar granularidade, significado de cada linha, regras aplicadas, campos calculados e limitações. Não remover duplicatas sem justificativa nem assumir uma moeda ausente da fonte.
3. Ter `site/index.html`, CSS, JavaScript e dados no projeto; três indicadores de vendas (valor total vendido, quantidade de vendas e ticket médio), dois gráficos, uma tabela e filtros por `categoria` e `cidade` que atualizem todos os componentes em conjunto.
4. Incluir ação para limpar filtros, estado sem resultados, títulos e números claros, responsividade para computador/celular e controles acessíveis por teclado.
5. Documentar no `README.md` os comandos reais para preparar dados, testar e abrir por HTTP local, identificando `site/` como pasta publicável.
6. Testar preservação/qualidade dos dados, recálculo independente e exemplo pequeno conhecido, correspondência dos dados com a interface, filtros individual/combinado/vazio/limpar, ausência de divisão por zero/`NaN`, carregamento HTTP e interação responsiva por navegador.
7. O Construtor, Tester e Revisor devem aprovar a mesma versão, com relatórios e evidências. Qualquer teste não executado fica **PENDENTE**; falha de ferramenta fica **BLOQUEADO**. Só declarar **APROVADO** conjunto quando todos os critérios obrigatórios estiverem cumpridos.

## Skills e execução

- `data-visualization` foi carregada pelo skill tool.
- Os roteiros de `explore-data` e `validate-data` foram encontrados e lidos em `.opencode/skills/explore-data/skill.md` e `.opencode/validatedate/SKILL.md`. Na versão do `AGENTS.md` vigente ao registrar estes critérios, `.agents/skills/` não existia; o arquivo foi atualizado antes da publicação para apontar aos caminhos disponíveis.
- A pasta `.venv` contém Python e pandas. O workspace não está sob Git; a versão será identificada por hashes dos arquivos relevantes.
