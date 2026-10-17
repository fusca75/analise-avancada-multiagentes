# Análise da base de vendas da papelaria

## Escopo e fonte

Esta entrega analisa `papelaria_limpa.csv`, o arquivo escolhido para o projeto. A preparação lê essa cópia limpa, valida seus dados e cria arquivos derivados dentro de `projeto-dashboard/`. O CSV indicado, `vendas_papelaria.csv` e os materiais da atividade anterior são preservados.

## Limpeza anterior da fonte

O `resumo.md` registra que o arquivo bruto `vendas_papelaria.csv` tinha 182 registros e 8 colunas. Na atividade anterior, foram removidas somente duas linhas excedentes de duplicatas integralmente idênticas (IDs `V0010` e `V0020`); não havia IDs iguais associados a vendas diferentes. Também foram retirados espaços externos de `cidade` em 6 registros, padronizadas 3 ocorrências de `acessórios` para `Acessórios`, substituídos 4 valores vazios de `forma_pagamento` por `Não informado` e calculado `valor_venda` como `quantidade * preco_unitario`, com aritmética decimal. O CSV bruto foi preservado.

Essa limpeza gerou `papelaria_limpa.csv`, com 180 vendas e 9 colunas, sem campos vazios, duplicatas exatas ou IDs repetidos. Esta entrega usa essa cópia já tratada. `preparar_dados.py` não repete as alterações da limpeza anterior e não exclui nem deduplica linhas: valida a entrada e interrompe a geração se encontrar dados fora do contrato.

A base contém **180 linhas e 9 colunas**, cobrindo **01/01/2026 a 31/03/2026**. Há 90 datas distintas no período, sem lacunas de calendário. O registro representa **uma venda**, identificada de forma única por `id_venda`; `quantidade` indica unidades vendidas nessa venda, não o número de vendas.

## Perfil dos campos

| Campo | Tipo e papel | Perfil observado |
|---|---|---|
| `id_venda` | Texto — identificador | 180 valores distintos em 180 linhas; sem repetição. |
| `data` | Data — temporal | Formato `AAAA-MM-DD`; de 2026-01-01 a 2026-03-31; 90 datas distintas. |
| `cidade` | Texto — dimensão | 3 cidades: Campinas (70 vendas), Santos (60) e Sorocaba (50). |
| `categoria` | Texto — dimensão | 3 categorias: Acessórios (65 vendas), Papelaria (61) e Livros (54). |
| `produto` | Texto — dimensão | 6 produtos distintos. |
| `quantidade` | Inteiro — medida | De 1 a 5 unidades por venda; média de 3,04 e mediana de 3. |
| `preco_unitario` | Decimal — medida | De 3,50 a 95,00; média de 36,22 e mediana de 22,00. |
| `forma_pagamento` | Texto — dimensão | Pix (68), Dinheiro (56), Cartão (52) e Não informado (4). |
| `valor_venda` | Decimal — medida | De 3,50 a 475,00; soma de 20.059,00; média de 111,44 e mediana de 84,00. |

Não há valores ausentes, campos em branco ou linhas integralmente duplicadas. `id_venda` é único. O campo `valor_venda` confere com `quantidade * preco_unitario` em todas as linhas. A fonte não declara moeda; **nenhum símbolo monetário será presumido**. Os valores são exibidos sem `R$` ou outro símbolo.

## Regras da preparação

`preparar_dados.py` exige os oito campos da venda (`id_venda`, `data`, `cidade`, `categoria`, `produto`, `quantidade`, `preco_unitario` e `forma_pagamento`). `valor_venda` pode vir no CSV: quando vem, não pode estar vazio e precisa ser igual a `quantidade * preco_unitario`; quando não vem, o programa calcula o campo com aritmética decimal. Em ambos os casos, a saída tem as nove colunas descritas acima. O script rejeita colunas ausentes ou extras, campos vazios, datas inválidas, tipos numéricos inválidos e IDs repetidos. Não elimina nem deduplica linhas, não altera a fonte e não preenche outros campos. Os campos numéricos são exportados como números; datas e identificadores permanecem em texto no formato da fonte. Os arquivos resultantes são `dados/vendas.csv` e `site/dados/vendas.json`.

`valor_venda` já existe na base selecionada. O script confirma a igualdade com a multiplicação e exporta o valor informado. Para outro CSV sem essa coluna, calcula `valor_venda` a partir da quantidade e do preço unitário; se a coluna existir mas tiver valor em branco ou divergente, a preparação para com erro em vez de substituir o dado.

## Medidas do dashboard

- **Valor total vendido:** soma de `valor_venda` nas vendas selecionadas. Na base completa: **20.059,00**.
- **Quantidade de vendas:** contagem de `id_venda` distintos. Na base completa: **180**.
- **Ticket médio:** valor total vendido dividido pela quantidade de vendas. Na base completa: **111,44** (valor não arredondado: 111,438888…). Se não houver vendas, o total e a quantidade serão zero e o ticket será exibido como `—`.

Os filtros de categoria e cidade são aplicados juntos a essas três medidas, aos dois gráficos e à tabela. O gráfico por categoria soma `valor_venda`; o gráfico mensal agrupa a mesma medida pelo mês de `data`. Como referência para a base completa, os totais por categoria são Acessórios 10.517,00, Livros 7.438,00 e Papelaria 2.104,00; os totais mensais são janeiro 6.235,00, fevereiro 6.181,00 e março 7.643,00.

## Limitações

- A fonte não informa moeda, custos, margens, devoluções, descontos ou despesas. **Valor vendido não é lucro**, e não é possível calcular lucro com estes campos.
- O período cobre apenas janeiro a março de 2026; não sustenta conclusões sobre sazonalidade anual nem sobre períodos futuros.
- As quatro vendas com forma de pagamento “Não informado” não permitem identificar o meio de pagamento.
- As medidas descrevem somente as linhas da fonte selecionada. Elas não representam necessariamente todas as vendas da papelaria fora deste arquivo.
- O dashboard não faz inferências causais: diferenças entre categorias, cidades ou meses são descritivas.
