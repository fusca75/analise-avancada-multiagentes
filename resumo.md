# Resumo da análise e limpeza — vendas de papelaria

## Escopo e estrutura

- Fonte: `vendas_papelaria.csv`, lida localmente com `.venv/Scripts/python.exe`. Nenhum banco de dados ou integração foi usado.
- Granularidade: uma linha por venda; `id_venda` identifica a venda.
- Original: 182 registros e 8 colunas (183 linhas físicas contando o cabeçalho). O arquivo original foi preservado; seu SHA-256 permaneceu igual antes e depois do processamento.
- Intervalo de datas: 2026-01-01 a 2026-03-31, com 90 datas distintas e sem lacunas no intervalo.
- Cópia tratada: 180 registros e 9 colunas, incluindo a nova coluna `valor_venda`.

| Coluna | Tipo/função observada | Observações no original |
|---|---|---|
| `id_venda` | Identificador | 180 valores distintos; os dois IDs repetidos são duplicatas exatas. |
| `data` | Data | Datas válidas no formato ISO, de 2026-01-01 a 2026-03-31. |
| `cidade` | Dimensão categórica | 3 cidades, com espaços externos em 6 registros. |
| `categoria` | Dimensão categórica | 3 categorias previstas, mas `acessórios` aparece em minúsculas em 3 registros. |
| `produto` | Texto/dimensão | 6 valores distintos. |
| `quantidade` | Métrica inteira | Valores de 1 a 5; sem zeros ou negativos. |
| `preco_unitario` | Métrica decimal | Valores de 3,50 a 95,00; sem zeros ou negativos. |
| `forma_pagamento` | Dimensão categórica | 4 valores vazios; os demais são Pix, Dinheiro ou Cartão. |

Não foram encontrados outros campos vazios além de `forma_pagamento`.

## Problemas encontrados

1. **Duplicatas exatas:** 2 linhas excedentes, dos IDs `V0010` e `V0020` (cada venda aparece duas vezes). Não há IDs repetidos associados a linhas diferentes.
2. **Espaços em `cidade`:** 6 valores têm espaços no início e/ou no fim.
3. **Variação de caixa em `categoria`:** 3 ocorrências de `acessórios`, que representam a categoria `Acessórios`.
4. **Pagamento ausente:** 4 registros têm `forma_pagamento` vazio.

## Tratamento aplicado

- Removi somente linhas integralmente idênticas, comparando todos os campos da venda; não descartei registros apenas por compartilharem `id_venda`.
- Removi espaços externos de `cidade`.
- Padronizei `categoria` para `Livros`, `Papelaria` e `Acessórios`.
- Substituí `forma_pagamento` vazio por `Não informado`.
- Acrescentei `valor_venda`, calculado como `quantidade * preco_unitario`, usando aritmética decimal.
- Gravei o resultado em `papelaria_limpa.csv`, sem alterar o CSV original.

## Resultado

- Categorias: Livros 54, Papelaria 61, Acessórios 65.
- Cidades: Campinas 70, Santos 60, Sorocaba 50.
- Pagamentos: Pix 68, Dinheiro 56, Cartão 52, Não informado 4.
- `valor_venda`: soma de 20.059,00; mínimo de 3,50 e máximo de 475,00 (sem assumir uma moeda).

As verificações da cópia confirmaram 180 `id_venda` únicos, categorias dentro dos três rótulos esperados, cidades sem espaços externos, nenhum pagamento vazio e `valor_venda` igual ao produto de quantidade e preço em todas as linhas.
