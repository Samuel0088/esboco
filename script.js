document.querySelectorAll('.produtos').forEach(produto => {
  const menosBtn = produto.querySelector('.menos');
  const maisBtn = produto.querySelector('.mais');
  const quantidadeSpan = produto.querySelector('.quantidade');

  let quantidade = 0;

  menosBtn.addEventListener('click', () => {
    if (quantidade > 0) {
      quantidade--;
      quantidadeSpan.textContent = quantidade;
    }
  });

  maisBtn.addEventListener('click', () => {
    quantidade++;
    quantidadeSpan.textContent = quantidade;
  });
});

// Animação
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animar');
      observer.unobserve(entry.target);
    }
  });
});
document.querySelectorAll('.animacao').forEach(el => observer.observe(el));

// Ver mais
const verMaisBtn = document.getElementById('ver-mais');
verMaisBtn.addEventListener('click', () => {
  document.querySelectorAll('.produtos.escondido').forEach(produto => {
    produto.classList.remove('escondido');
  });
  verMaisBtn.style.display = 'none';
});

// Carrinho
const produtos = document.querySelectorAll(".produtos");
const btnCompra = document.getElementById("btn-compra");
const contador = document.getElementById("contador-carrinho");

const modal = document.getElementById("modal-carrinho");
const fecharModal = document.getElementById("fechar-modal");
const itensCarrinho = document.getElementById("itens-carrinho");
const totalCarrinho = document.getElementById("total-carrinho");  

let totalComprado = parseInt(localStorage.getItem("totalComprado")) || 0;
let carrinho = JSON.parse(localStorage.getItem("carrinho")) || [];

if (totalComprado > 0) {
  contador.textContent = totalComprado;
  btnCompra.style.display = "flex";
}

produtos.forEach(produto => {
  const btnMais = produto.querySelector(".mais");
  const btnMenos = produto.querySelector(".menos");
  const quantidadeSpan = produto.querySelector(".quantidade");
  const sacola = produto.querySelector(".sacola-compras");
  const nome = produto.querySelector(".nome-produto").textContent;
  const precoTexto = produto.querySelector(".preco-produto").textContent;
  const imagem = produto.querySelector("img").src;

  let quantidade = 0;
  let preco = parseFloat(precoTexto.replace("R$ ", "").replace(",", ".")) || 10;

  btnMais.addEventListener("click", () => {
    quantidade++;
    quantidadeSpan.textContent = quantidade;
  });

  btnMenos.addEventListener("click", () => {
    if (quantidade > 0) {
      quantidade--;
      quantidadeSpan.textContent = quantidade;
    }
  });

  sacola.addEventListener("click", () => {
    if (quantidade > 0) {
      totalComprado += quantidade;
      contador.textContent = totalComprado;
      btnCompra.style.display = "flex";

      carrinho.push({ nome, imagem, quantidade, preco });
      localStorage.setItem("carrinho", JSON.stringify(carrinho));
      localStorage.setItem("totalComprado", totalComprado);

      quantidade = 0;
      quantidadeSpan.textContent = 0;
    }
  });
});

// Modal
btnCompra.addEventListener("click", () => {
  const carrinhoSalvo = JSON.parse(localStorage.getItem("carrinho")) || [];
  itensCarrinho.innerHTML = "";
  let total = 0;

  carrinhoSalvo.forEach(item => {
    const subtotal = item.quantidade * item.preco;
    total += subtotal;

    const div = document.createElement("div");
    div.classList.add("item-linha");
    div.innerHTML = `
      <img src="${item.imagem}" alt="">
      <div>
        <p><strong>${item.nome}</strong></p>
        <p>${item.quantidade} x R$ ${item.preco.toFixed(2)} = <strong>R$ ${subtotal.toFixed(2)}</strong></p>
      </div>
    `;
    itensCarrinho.appendChild(div);
  });

  const frete = 9.90;
  totalCarrinho.innerHTML = `
    <p><strong>Frete:</strong> R$ ${frete.toFixed(2)}</p>
    <p><strong>Total geral:</strong> R$ ${(total + frete).toFixed(2)}</p>
  `;

  modal.style.display = "block";
});

fecharModal.addEventListener("click", () => {
  modal.style.display = "none";
});

window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});
  