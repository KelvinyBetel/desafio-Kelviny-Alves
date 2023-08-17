class LanchoneteDB {
    constructor() {
      this.cardapio = [
        { codigo: "cafe", descricao: "Café", valor: 3.00 },
        { codigo: "chantily", descricao: "Chantily (extra do Café)", valor: 1.50 },
        { codigo: "suco", descricao: "Suco Natural", valor: 6.20 },
        { codigo: "sanduiche", descricao: "Sanduíche", valor: 6.50 },
        { codigo: "queijo", descricao: "Queijo (extra do Sanduíche)", valor: 2.00 },
        { codigo: "salgado", descricao: "Salgado", valor: 7.25 },
        { codigo: "combo1", descricao: "1 Suco e 1 Sanduíche", valor: 9.50 },
        { codigo: "combo2", descricao: "1 Café e 1 Sanduíche", valor: 7.50 }
      ];
  
      this.formasDePagamento = ["dinheiro", "debito", "credito"];
    }
  
    calcularValorDaCompra(itensSelecionados, formaPagamento) {
      if (!this.formasDePagamento.includes(formaPagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (itensSelecionados.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      const valorTotal = this.calcularValorTotal(itensSelecionados);
  
      if (formaPagamento === "dinheiro") {
        return (valorTotal * 0.95).toFixed(2);
      } else if (formaPagamento === "credito") {
        return (valorTotal * 1.03).toFixed(2);
      }
  
      return valorTotal.toFixed(2);
    }
  
    calcularValorTotal(itensSelecionados) {
      let valorTotal = 0;
  
      const itensPrincipais = new Set();
      const itensExtras = new Set();
  
      for (const itemSelecionado of itensSelecionados) {
        const itemCardapio = this.cardapio.find(item => item.codigo === itemSelecionado);
        if (!itemCardapio) {
          return "Item inválido!";
        }
  
        if (itemCardapio.descricao.includes("extra")) {
          itensExtras.add(itemSelecionado);
        } else {
          itensPrincipais.add(itemSelecionado);
          valorTotal += itemCardapio.valor;
        }
      }
  
      for (const itemExtra of itensExtras) {
        const itemPrincipal = itemExtra.replace("extra", "");
        if (!itensPrincipais.has(itemPrincipal)) {
          return "Item extra não pode ser pedido sem o principal";
        }
      }
  
      return valorTotal;
    }
  }
  
  // Exemplo de uso
  const lanchonete = new LanchoneteDB();
  const itensSelecionados = ["cafe", "chantily", "suco", "chantilyextra", "combo1"];
  const formaPagamento = "credito";
  
  const valorCompra = lanchonete.calcularValorDaCompra(itensSelecionados, formaPagamento);
  console.log(valorCompra);