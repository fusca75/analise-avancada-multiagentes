# Dashboard de vendas da papelaria

> **Nota sobre a publicação no GitHub:** este arquivo documenta a execução no workspace original. O repositório público foi limitado a Markdown; não contém o CSV, scripts, testes, dados preparados nem os arquivos do site. Os comandos abaixo funcionam na pasta de trabalho local que contém esses arquivos.

Este projeto prepara `papelaria_limpa.csv` com Python e pandas e apresenta as vendas em um site estático, sem banco de dados nem servidor de aplicação. O painel tem filtros por categoria e cidade, três indicadores, dois gráficos e uma tabela. Os valores não incluem símbolo de moeda porque a fonte não informa qual moeda foi usada.

## Usar no Windows e no VS Code

No VS Code, abra a pasta principal do workspace (a que contém `papelaria_limpa.csv` e `projeto-dashboard`) e abra **Terminal > Novo Terminal**. Os comandos abaixo são para o PowerShell nessa pasta. Se o ambiente `.venv` ainda não existir, crie-o e instale pandas uma vez:

O preparo requer Python 3.10 ou posterior e pandas. O teste JavaScript requer Node.js 21 ou posterior.

```powershell
py -m venv .venv
.\.venv\Scripts\python.exe -m pip install pandas
```

## Preparar os dados

```powershell
.\.venv\Scripts\python.exe .\projeto-dashboard\preparar_dados.py --entrada .\papelaria_limpa.csv --destino .\projeto-dashboard
```

O comando valida as linhas sem remover registros e grava `projeto-dashboard\dados\vendas.csv` e `projeto-dashboard\site\dados\vendas.json`. Para usar outro CSV ou pasta de destino, altere os caminhos de `--entrada` e `--destino`.

## Executar as verificações

```powershell
.\.venv\Scripts\python.exe -m unittest discover -s .\projeto-dashboard\tests -p "test_*.py" -v
node --test .\projeto-dashboard\tests\dashboard.test.mjs
```

O teste interativo usa Chrome ou Edge instalado no computador; o teste HTTP inicia um servidor local temporário.

## Abrir o dashboard

Prepare os dados primeiro. Depois inicie o servidor estático:

```powershell
.\.venv\Scripts\python.exe -m http.server 8000 --directory .\projeto-dashboard\site
```

Abra <http://localhost:8000> no navegador. Para encerrar o servidor, volte ao terminal e pressione **Ctrl+C**. Não abra `index.html` diretamente como arquivo, pois o navegador precisa carregar o JSON por HTTP.

Para hospedagem estática, publique o conteúdo da pasta `projeto-dashboard\site`. Essa pasta já contém o HTML, CSS, JavaScript e o JSON preparado.
