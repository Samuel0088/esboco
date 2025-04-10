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

const verMaisBtn = document.getElementById('ver-mais');
verMaisBtn.addEventListener('click', () => {
  document.querySelectorAll('.produtos.escondido').forEach(produto => {
    produto.classList.remove('escondido');
  });
  verMaisBtn.style.display = 'none'; // Esconde o botão depois
});