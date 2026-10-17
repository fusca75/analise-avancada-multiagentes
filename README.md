# Análise avançada multiagentes

Repositório com o fluxo de análise, as skills, os relatórios em Markdown e o site estático do dashboard de vendas da papelaria.

## O que está publicado

- [`AGENTS.md`](AGENTS.md): fluxo de trabalho, responsabilidades, critérios de validação e relatórios.
- [`projeto-dashboard/analise.md`](projeto-dashboard/analise.md): perfil, definições, limpeza e limitações da análise.
- [`projeto-dashboard/relatorios/`](projeto-dashboard/relatorios/): critérios e relatórios das rodadas, incluindo o status final.
- Skills: [`explore-data`](.opencode/skills/explore-data/skill.md), [`data-visualization`](.opencode/skills/data-visualization/SKILL.md) e [`validate-data`](.opencode/validatedate/SKILL.md).
- [`projeto-dashboard/site/`](projeto-dashboard/site/): HTML, CSS, JavaScript e JSON estático do dashboard.
- [`render.yaml`](render.yaml): configuração Blueprint para publicar o site no Render.

## Recorte de publicação

O repositório inclui documentação e somente a pasta estática necessária ao dashboard. O CSV original, o ambiente `.venv`, dependências, imagens, scripts de preparo e testes continuam fora da publicação. O arquivo `projeto-dashboard/site/dados/vendas.json` contém os registros usados pelo painel; como o site é estático, esse JSON e os dados nele contidos ficam acessíveis publicamente.

## Publicar no Render

O Blueprint em `render.yaml` aponta para a branch `main` e publica `projeto-dashboard/site/`. No Render, crie um serviço por **New > Blueprint** e conecte este repositório. Se já existir um Static Site ligado ao repositório, confira estes valores nas configurações: branch `main`, Build Command `echo "No build step required"` e Publish Directory `projeto-dashboard/site`. Com o auto-deploy habilitado, novos pushes dos arquivos do site iniciam uma publicação.
