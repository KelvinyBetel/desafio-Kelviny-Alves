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
  
    calcularValorDaCompra(formaDePagamento, itens) {
      if (!this.formasDePagamento.includes(formaDePagamento)) {
        return "Forma de pagamento inválida!";
      }
  
      if (itens.length === 0) {
        return "Não há itens no carrinho de compra!";
      }
  
      const valorTotal = this.calcularValorTotal(itens);
  
      if (formaDePagamento === "dinheiro") {
        return `R$ ${(valorTotal * 0.95).toFixed(2)}`;
      } else if (formaDePagamento === "credito") {
        return `R$ ${(valorTotal * 1.03).toFixed(2)}`;
      }
  
      return `R$ ${valorTotal.toFixed(2)}`;
    }
  
    calcularValorTotal(itens) {
      let valorTotal = 0;
  
      const itensPrincipais = new Set();
      const itensExtras = new Set();
  
      for (const itemInfo of itens) {
        const [itemCodigo, quantidade] = itemInfo.split(",");
        const itemCardapio = this.cardapio.find(item => item.codigo === itemCodigo);
        
        if (!itemCardapio) {
          return "Item inválido!";
        }
  
        const valorItem = itemCardapio.valor * quantidade;
        
        if (itemCardapio.descricao.includes("extra")) {
          itensExtras.add(itemCodigo);
        } else {
          itensPrincipais.add(itemCodigo);
          valorTotal += valorItem;
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
  const formaPagamento = "credito";
  const itens = ["cafe,2", "chantily,1", "suco,1", "cafeextra,1", "combo1,1"];
  
  const valorCompra = lanchonete.calcularValorDaCompra(formaPagamento, itens);
  console.log(valorCompra);
  