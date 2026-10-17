(function () {
  "use strict";

  const SELETOR = {
    categoria: "#filtro-categoria",
    cidade: "#filtro-cidade",
    limpar: "#limpar-filtros",
    total: "#indicador-total",
    vendas: "#indicador-vendas",
    ticket: "#indicador-ticket",
    graficoCategorias: "#grafico-categorias",
    graficoMensal: "#grafico-mensal",
    tabela: "#tabela-vendas",
    semResultados: "#sem-resultados",
    resumo: "#resumo-resultados",
    periodo: "#periodo-dados",
    erro: "#erro-carregamento",
  };
  const COLUNAS_TEXTO = [
    "id_venda",
    "data",
    "cidade",
    "categoria",
    "produto",
    "forma_pagamento",
  ];
  const formatarValor = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
  const formatarContagem = new Intl.NumberFormat("pt-BR", {
    maximumFractionDigits: 0,
  });
  const comparador = new Intl.Collator("pt-BR");
  const nomeMes = new Intl.DateTimeFormat("pt-BR", { month: "short" });
  const ROTULO_VALOR_VENDIDO =
    "Valor vendido (unidades monetárias da fonte; moeda não informada)";
  const LINHAS_ROTULO_VALOR = [
    "Valor vendido ",
    "(unidades monetárias da fonte; ",
    "moeda não informada)",
  ];
  const MARGEM_CATEGORIAS = { topo: 44, direita: 74, baixo: 90, esquerda: 102 };
  const ALTURA_LINHA_CATEGORIA = 42;
  const ALTURA_GRAFICO_MENSAL = 320;
  const MARGEM_MENSAL = { topo: 56, direita: 44, baixo: 68, esquerda: 78 };

  let vendas = [];

  function localizar(seletor) {
    return document.querySelector(seletor);
  }

  function criarSvgElemento(nome, atributos, texto) {
    const elemento = document.createElementNS("http://www.w3.org/2000/svg", nome);
    Object.entries(atributos || {}).forEach(function ([chave, valor]) {
      elemento.setAttribute(chave, String(valor));
    });
    if (texto !== undefined) {
      elemento.textContent = texto;
    }
    return elemento;
  }

  function criarSvg(container, idBase, titulo, descricao, largura, altura) {
    const svg = criarSvgElemento("svg", {
      viewBox: `0 0 ${largura} ${altura}`,
      role: "img",
      focusable: "false",
      "aria-labelledby": `${idBase}-titulo ${idBase}-descricao`,
    });
    const tituloSvg = criarSvgElemento(
      "title",
      { id: `${idBase}-titulo` },
      titulo
    );
    const descricaoSvg = criarSvgElemento(
      "desc",
      { id: `${idBase}-descricao` },
      descricao
    );
    svg.append(tituloSvg, descricaoSvg);
    container.replaceChildren(svg);
    return svg;
  }

  function adicionarTexto(svg, texto, x, y, classe, ancoragem, rotuloAcessivel) {
    const atributos = { x: x, y: y, class: classe };
    if (ancoragem) {
      atributos["text-anchor"] = ancoragem;
    }
    if (rotuloAcessivel) {
      atributos["aria-label"] = rotuloAcessivel;
    }
    const elemento = criarSvgElemento("text", atributos, texto);
    svg.append(elemento);
    return elemento;
  }

  function adicionarTextoMultilinha(
    svg,
    linhas,
    x,
    y,
    classe,
    ancoragem,
    rotuloAcessivel
  ) {
    const atributos = { x: x, y: y, class: classe };
    if (ancoragem) {
      atributos["text-anchor"] = ancoragem;
    }
    if (rotuloAcessivel) {
      atributos["aria-label"] = rotuloAcessivel;
    }
    const elemento = criarSvgElemento("text", atributos);
    linhas.forEach(function (linha, indice) {
      elemento.append(
        criarSvgElemento(
          "tspan",
          { x: x, dy: indice === 0 ? 0 : 14 },
          linha
        )
      );
    });
    svg.append(elemento);
    return elemento;
  }

  function formatarData(iso) {
    const partes = String(iso).split("-").map(Number);
    if (
      partes.length !== 3 ||
      !partes.every(Number.isFinite) ||
      partes[0] < 1 ||
      partes[1] < 1 ||
      partes[1] > 12 ||
      partes[2] < 1 ||
      partes[2] > 31
    ) {
      return String(iso);
    }
    return new Intl.DateTimeFormat("pt-BR").format(
      new Date(partes[0], partes[1] - 1, partes[2])
    );
  }

  function dataParaMes(iso) {
    return String(iso).slice(0, 7);
  }

  function medirLarguraGrafico(container) {
    return Math.max(300, container.clientWidth || 720);
  }

  function formatarMes(anoMes) {
    const partes = anoMes.split("-").map(Number);
    const mes = nomeMes.format(new Date(partes[0], partes[1] - 1, 1)).replace(".", "");
    return `${mes}/${partes[0]}`;
  }

  function preencherFiltro(seletor, propriedade, opcaoPadrao) {
    const controle = localizar(seletor);
    const valores = Array.from(
      new Set(vendas.map(function (venda) {
        return String(venda[propriedade]);
      }))
    ).sort(comparador.compare);

    controle.replaceChildren();
    const padrao = document.createElement("option");
    padrao.value = "";
    padrao.textContent = opcaoPadrao;
    controle.append(padrao);

    valores.forEach(function (valor) {
      const opcao = document.createElement("option");
      opcao.value = valor;
      opcao.textContent = valor;
      controle.append(opcao);
    });
  }

  function selecionarVendas() {
    const categoria = localizar(SELETOR.categoria).value;
    const cidade = localizar(SELETOR.cidade).value;
    return vendas.filter(function (venda) {
      return (
        (!categoria || venda.categoria === categoria) &&
        (!cidade || venda.cidade === cidade)
      );
    });
  }

  function atualizarIndicadores(linhas) {
    const total = linhas.reduce(function (soma, venda) {
      return soma + Number(venda.valor_venda);
    }, 0);
    const quantidadeVendas = new Set(
      linhas.map(function (venda) {
        return String(venda.id_venda);
      })
    ).size;

    localizar(SELETOR.total).textContent = formatarValor.format(total);
    localizar(SELETOR.vendas).textContent = formatarContagem.format(quantidadeVendas);
    localizar(SELETOR.ticket).textContent = quantidadeVendas
      ? formatarValor.format(total / quantidadeVendas)
      : "—";
  }

  function somarPor(linhas, chave) {
    const totais = new Map();
    linhas.forEach(function (venda) {
      const rotulo = String(venda[chave]);
      totais.set(rotulo, (totais.get(rotulo) || 0) + Number(venda.valor_venda));
    });
    return Array.from(totais.entries());
  }

  function desenharGraficoVazio(container, idBase, titulo) {
    const largura = medirLarguraGrafico(container);
    const ehCategorias = idBase === "categorias";
    const altura = ehCategorias
      ? MARGEM_CATEGORIAS.topo + ALTURA_LINHA_CATEGORIA * 3 + MARGEM_CATEGORIAS.baixo
      : ALTURA_GRAFICO_MENSAL;
    const descricao = ehCategorias
      ? `Eixo vertical: Categoria. Eixo horizontal: ${ROTULO_VALOR_VENDIDO}. Sem dados para mostrar com os filtros selecionados.`
      : `Eixo horizontal: Mês. Eixo vertical: ${ROTULO_VALOR_VENDIDO}. Sem dados para mostrar com os filtros selecionados.`;
    const svg = criarSvg(
      container,
      idBase,
      titulo,
      descricao,
      largura,
      altura
    );
    if (ehCategorias) {
      const larguraEixo =
        largura - MARGEM_CATEGORIAS.esquerda - MARGEM_CATEGORIAS.direita;
      const centroY = MARGEM_CATEGORIAS.topo + ALTURA_LINHA_CATEGORIA * 1.5;
      adicionarTexto(
        svg,
        "Categoria",
        MARGEM_CATEGORIAS.esquerda - 12,
        MARGEM_CATEGORIAS.topo - 18,
        "svg-titulo-eixo",
        "end",
        "Categoria"
      );
      adicionarTexto(
        svg,
        "Sem dados para exibir.",
        MARGEM_CATEGORIAS.esquerda + larguraEixo / 2,
        centroY,
        "svg-vazio",
        "middle"
      );
      adicionarTextoMultilinha(
        svg,
        LINHAS_ROTULO_VALOR,
        MARGEM_CATEGORIAS.esquerda + larguraEixo / 2,
        altura - 44,
        "svg-titulo-eixo",
        "middle",
        ROTULO_VALOR_VENDIDO
      );
      return;
    }

    const larguraEixo = largura - MARGEM_MENSAL.esquerda - MARGEM_MENSAL.direita;
    adicionarTextoMultilinha(
      svg,
      LINHAS_ROTULO_VALOR,
      MARGEM_MENSAL.esquerda + larguraEixo / 2,
      15,
      "svg-titulo-eixo",
      "middle",
      ROTULO_VALOR_VENDIDO
    );
    adicionarTexto(
      svg,
      "Sem dados para exibir.",
      MARGEM_MENSAL.esquerda + larguraEixo / 2,
      MARGEM_MENSAL.topo +
        (altura - MARGEM_MENSAL.topo - MARGEM_MENSAL.baixo) / 2,
      "svg-vazio",
      "middle"
    );
    adicionarTexto(
      svg,
      "Mês",
      MARGEM_MENSAL.esquerda + larguraEixo / 2,
      altura - 5,
      "svg-titulo-eixo",
      "middle",
      "Mês"
    );
  }

  function desenharCategorias(linhas) {
    const container = localizar(SELETOR.graficoCategorias);
    const itens = somarPor(linhas, "categoria").sort(function (a, b) {
      return a[1] - b[1] || comparador.compare(a[0], b[0]);
    });
    if (!itens.length) {
      desenharGraficoVazio(
        container,
        "categorias",
        "Valor vendido por categoria"
      );
      return;
    }

    const largura = medirLarguraGrafico(container);
    const margem = MARGEM_CATEGORIAS;
    const alturaLinha = ALTURA_LINHA_CATEGORIA;
    const altura = margem.topo + itens.length * alturaLinha + margem.baixo;
    const larguraEixo = largura - margem.esquerda - margem.direita;
    const maior = Math.max(0, ...itens.map(function (item) { return item[1]; }));
    const limite = maior > 0 ? maior : 1;
    const svg = criarSvg(
      container,
      "categorias",
      "Valor vendido por categoria",
      `Eixo vertical: Categoria. Eixo horizontal: ${ROTULO_VALOR_VENDIDO}. O eixo horizontal começa em zero. ${itens.map(function (item) {
        return `${item[0]}: ${formatarValor.format(item[1])}`;
      }).join("; ")}.`,
      largura,
      altura
    );
    adicionarTexto(
      svg,
      "Categoria",
      margem.esquerda - 12,
      margem.topo - 18,
      "svg-titulo-eixo",
      "end",
      "Categoria"
    );

    const quantidadePassos = largura < 500 ? 2 : 4;
    for (let passo = 0; passo <= quantidadePassos; passo += 1) {
      const proporcao = passo / quantidadePassos;
      const x = margem.esquerda + larguraEixo * proporcao;
      const linha = criarSvgElemento("line", {
        x1: x,
        y1: margem.topo - 5,
        x2: x,
        y2: altura - margem.baixo + 2,
        class: "svg-grade",
      });
      svg.append(linha);
      adicionarTexto(
        svg,
        formatarValor.format(limite * proporcao),
        x,
        altura - margem.baixo + 20,
        "svg-eixo",
        "middle"
      );
    }

    adicionarTextoMultilinha(
      svg,
      LINHAS_ROTULO_VALOR,
      margem.esquerda + larguraEixo / 2,
      altura - 44,
      "svg-titulo-eixo",
      "middle",
      ROTULO_VALOR_VENDIDO
    );

    itens.forEach(function (item, indice) {
      const centroY = margem.topo + indice * alturaLinha + alturaLinha / 2;
      const larguraBarra = (item[1] / limite) * larguraEixo;
      adicionarTexto(svg, item[0], margem.esquerda - 12, centroY + 4, "svg-categoria", "end");
      const barra = criarSvgElemento("rect", {
        x: margem.esquerda,
        y: centroY - 11,
        width: larguraBarra,
        height: 22,
        rx: 4,
        class: "svg-barra",
        "aria-label": `${item[0]}: ${formatarValor.format(item[1])}`,
      });
      svg.append(barra);
      adicionarTexto(
        svg,
        formatarValor.format(item[1]),
        margem.esquerda + larguraBarra + 8,
        centroY + 4,
        "svg-valor"
      );
    });
  }

  function desenharGraficoMensal(linhas) {
    const container = localizar(SELETOR.graficoMensal);
    const itens = somarPor(
      linhas.map(function (venda) {
        return { ...venda, mes: dataParaMes(venda.data) };
      }),
      "mes"
    ).sort(function (a, b) {
      return a[0].localeCompare(b[0]);
    });
    if (!itens.length) {
      desenharGraficoVazio(container, "mensal", "Valor vendido por mês");
      return;
    }

    const largura = medirLarguraGrafico(container);
    const altura = ALTURA_GRAFICO_MENSAL;
    const margem = MARGEM_MENSAL;
    const larguraEixo = largura - margem.esquerda - margem.direita;
    const alturaEixo = altura - margem.topo - margem.baixo;
    const maior = Math.max(0, ...itens.map(function (item) { return item[1]; }));
    const limite = maior > 0 ? maior : 1;
    const pontos = itens.map(function (item, indice) {
      const x = itens.length === 1
        ? margem.esquerda + larguraEixo / 2
        : margem.esquerda + (larguraEixo * indice) / (itens.length - 1);
      const y = margem.topo + alturaEixo - (item[1] / limite) * alturaEixo;
      return { rotulo: item[0], valor: item[1], x: x, y: y };
    });
    const svg = criarSvg(
      container,
      "mensal",
      "Valor vendido por mês",
      `Eixo horizontal: Mês. Eixo vertical: ${ROTULO_VALOR_VENDIDO}. O eixo vertical começa em zero. ${pontos.map(function (ponto) {
        return `${formatarMes(ponto.rotulo)}: ${formatarValor.format(ponto.valor)}`;
      }).join("; ")}.`,
      largura,
      altura
    );
    adicionarTextoMultilinha(
      svg,
      LINHAS_ROTULO_VALOR,
      margem.esquerda,
      15,
      "svg-titulo-eixo",
      "start",
      ROTULO_VALOR_VENDIDO
    );

    for (let passo = 0; passo <= 4; passo += 1) {
      const proporcao = passo / 4;
      const y = margem.topo + alturaEixo * (1 - proporcao);
      svg.append(criarSvgElemento("line", {
        x1: margem.esquerda,
        y1: y,
        x2: largura - margem.direita,
        y2: y,
        class: "svg-grade",
      }));
      adicionarTexto(
        svg,
        formatarValor.format(limite * proporcao),
        margem.esquerda - 10,
        y + 4,
        "svg-eixo",
        "end"
      );
    }

    const caminho = pontos.map(function (ponto, indice) {
      return `${indice === 0 ? "M" : "L"} ${ponto.x} ${ponto.y}`;
    }).join(" ");
    svg.append(criarSvgElemento("path", { d: caminho, class: "svg-linha" }));

    pontos.forEach(function (ponto) {
      const circulo = criarSvgElemento("circle", {
        cx: ponto.x,
        cy: ponto.y,
        r: 6,
        class: "svg-ponto",
        "aria-label": `${formatarMes(ponto.rotulo)}: ${formatarValor.format(ponto.valor)}`,
      });
      circulo.append(
        criarSvgElemento(
          "title",
          {},
          `${formatarMes(ponto.rotulo)}: ${formatarValor.format(ponto.valor)}`
        )
      );
      svg.append(circulo);
      adicionarTexto(
        svg,
        formatarValor.format(ponto.valor),
        ponto.x,
        Math.max(margem.topo + 13, ponto.y - 12),
        "svg-valor",
        "middle"
      );
      adicionarTexto(
        svg,
        formatarMes(ponto.rotulo),
        ponto.x,
        altura - 25,
        "svg-eixo",
        "middle"
      );
    });
    adicionarTexto(
      svg,
      "Mês",
      margem.esquerda + larguraEixo / 2,
      altura - 5,
      "svg-titulo-eixo",
      "middle",
      "Mês"
    );
  }

  function desenharTabela(linhas) {
    const corpo = localizar(SELETOR.tabela);
    const fragmento = document.createDocumentFragment();
    linhas.forEach(function (venda) {
      const linha = document.createElement("tr");
      const valores = [
        String(venda.id_venda),
        formatarData(venda.data),
        String(venda.cidade),
        String(venda.categoria),
        String(venda.produto),
        formatarContagem.format(Number(venda.quantidade)),
        formatarValor.format(Number(venda.preco_unitario)),
        String(venda.forma_pagamento),
        formatarValor.format(Number(venda.valor_venda)),
      ];
      valores.forEach(function (valor, indice) {
        const celula = document.createElement("td");
        celula.textContent = valor;
        if ([5, 6, 8].includes(indice)) {
          celula.className = "numero";
        }
        linha.append(celula);
      });
      fragmento.append(linha);
    });
    corpo.replaceChildren(fragmento);
  }

  function atualizarPainel() {
    const linhas = selecionarVendas();
    atualizarIndicadores(linhas);
    desenharCategorias(linhas);
    desenharGraficoMensal(linhas);
    desenharTabela(linhas);
    localizar(SELETOR.semResultados).hidden = linhas.length !== 0;
    localizar(SELETOR.resumo).textContent = linhas.length
      ? `Exibindo ${formatarContagem.format(linhas.length)} de ${formatarContagem.format(vendas.length)} vendas.`
      : "Nenhuma venda encontrada com os filtros atuais.";
  }

  let temporizadorRedimensionamento;
  window.addEventListener("resize", function () {
    if (!vendas.length) {
      return;
    }
    window.clearTimeout(temporizadorRedimensionamento);
    temporizadorRedimensionamento = window.setTimeout(function () {
      const linhas = selecionarVendas();
      desenharCategorias(linhas);
      desenharGraficoMensal(linhas);
    }, 100);
  });

  function mostrarErro(mensagem) {
    localizar(SELETOR.erro).textContent = mensagem;
    localizar(SELETOR.erro).hidden = false;
    localizar(SELETOR.resumo).textContent = "Não foi possível carregar os dados.";
  }

  function atualizarPeriodo() {
    if (!vendas.length) {
      localizar(SELETOR.periodo).textContent = "A base não contém vendas.";
      return;
    }
    const datas = vendas.map(function (venda) { return String(venda.data); }).sort();
    localizar(SELETOR.periodo).textContent =
      `Período: ${formatarData(datas[0])} a ${formatarData(datas[datas.length - 1])}`;
  }

  async function carregarDados() {
    try {
      const resposta = await fetch("./dados/vendas.json");
      if (!resposta.ok) {
        throw new Error(`Resposta HTTP ${resposta.status}`);
      }
      const dados = await resposta.json();
      if (!Array.isArray(dados)) {
        throw new Error("O arquivo de dados não contém uma lista de vendas.");
      }
      const possuiCampos = dados.every(function (venda) {
        return (
          venda &&
          COLUNAS_TEXTO.every(function (campo) {
            return typeof venda[campo] === "string";
          }) &&
          Number.isFinite(Number(venda.quantidade)) &&
          Number.isFinite(Number(venda.preco_unitario)) &&
          Number.isFinite(Number(venda.valor_venda))
        );
      });
      if (!possuiCampos) {
        throw new Error("O arquivo de dados contém campos ausentes ou inválidos.");
      }

      vendas = dados;
      preencherFiltro(SELETOR.categoria, "categoria", "Todas as categorias");
      preencherFiltro(SELETOR.cidade, "cidade", "Todas as cidades");
      atualizarPeriodo();
      atualizarPainel();
    } catch (_erro) {
      mostrarErro(
        "Não foi possível carregar as vendas. Confira se os dados foram preparados e abra o site por um servidor HTTP local."
      );
    }
  }

  localizar(SELETOR.categoria).addEventListener("change", atualizarPainel);
  localizar(SELETOR.cidade).addEventListener("change", atualizarPainel);
  localizar(SELETOR.limpar).addEventListener("click", function () {
    localizar(SELETOR.categoria).value = "";
    localizar(SELETOR.cidade).value = "";
    atualizarPainel();
  });

  carregarDados();
})();
