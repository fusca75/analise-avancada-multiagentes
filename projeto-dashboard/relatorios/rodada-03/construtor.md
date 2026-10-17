# Relatório do Construtor — rodada 03

## Versão examinada

Workspace sem Git. Os hashes atuais conferem com os registrados nos relatórios da rodada 02:

| Arquivo | SHA-256 |
|---|---|
| `projeto-dashboard/site/index.html` | `0B07B9938CCF702FD601B9135B59A117AB53EFD042E1356F0796CBF19C62EBB4` |
| `projeto-dashboard/site/css/style.css` | `B7219B869C85249D2B1E6F5497FFD091B0979A5BB1846330E3F55F62B941A8FB` |
| `projeto-dashboard/site/js/dashboard.js` | `CC1DC70C716AA9C3C438862EACACE15679C4EC6DD08EE487766F394566B241AC` |
| `projeto-dashboard/dados/vendas.csv` | `A4EB6C4890CFFCEF04E1F99E6C4C342974D88221C3E9B2C8D2C4E59B99199219` |
| `projeto-dashboard/site/dados/vendas.json` | `F598BCECCB7269DF18A4CBAC1A0B23BAB1D067C2E1A5B242031FA2319B473C68` |

## Conferência e evidências

- Li `rodada-02/revisor.md`, `rodada-02/tester.md` e `rodada-02/construtor.md`. O Revisor confirmou que o produto corrige o handoff original: os dois gráficos nomeiam os eixos e a unidade sem presumir moeda; os rótulos permanecem visíveis e acessíveis nos gráficos vazios e após resize. Não apontou defeito de produto.
- Comando executado para conferir os hashes atuais:

  ```powershell
  Get-FileHash -Algorithm SHA256 -LiteralPath '.\projeto-dashboard\site\index.html', '.\projeto-dashboard\site\css\style.css', '.\projeto-dashboard\site\js\dashboard.js', '.\projeto-dashboard\dados\vendas.csv', '.\projeto-dashboard\site\dados\vendas.json' | Format-List Path,Hash
  ```

  Os cinco resultados coincidem com os hashes da rodada 02. Não alterei arquivos de produto, dados ou testes, nem regenerei dados. Este relatório é a única entrega da rodada 03.

## Pendências e status

- **PENDENTE — Tester:** corrigir os falsos positivos/lacunas encaminhados exclusivamente pelo Revisor da rodada 02 e executar novamente a suíte após esses ajustes. A suíte da rodada 02 passou, mas a revisão encontrou cobertura insuficiente no estado vazio e na regra de não presumir moeda.
- Aprovação do Revisor sobre os testes ajustados e aprovação conjunta continuam pendentes.

**APROVADO pelo Construtor para produto e handoff.** Os hashes confirmam a versão sem alterações de produto; este status não declara aprovação conjunta.
