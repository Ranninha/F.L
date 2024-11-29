// Botão de dark mode
var botao = document.querySelector("#dark-mode-botao");
console.log(botao);

function mudarParaDarkMode() {
    var corpo = document.querySelector('body');
    corpo.classList.toggle('dark-mode'); // Alterna o tema
}

botao.addEventListener('click', mudarParaDarkMode);

// Elementos do DOM
const roda = document.getElementById('wheel');
const botaoGirar = document.getElementById('girarRoda');
const resultado = document.getElementById('result');
const botaoLimparStorage = document.getElementById('limparStorage');
let girando = false;
let numerosEscolhidos = []; // Lista de números escolhidos pelo usuário
const QUANTIDADE = 4;

// Lista de prêmios
const premios = [
    { numero: 1, produto: 'Pó Facial De Fixação Fenty Pro Filter Instant Retouch Setting Powder Mini - Butter', imagem: 'https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dw398ccb1a/images/hi-res-BR/44764_settingpowder_silo_mini_closed_2000x2000_rgb_butter_1000px.jpg?sw=556&sh=680&sm=fit' },
    { numero: 2, produto: 'Gloss Em Bastão Fenty Beauty Bomb Stix', imagem: 'https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dw132bf7d2/images/Color%20BR/Fenty/2024/Gloss_Bomb_Stix/Blazd/FB_FALL24_T2PRODUCT_SILO_GBSTICK_BLAZEDDONUT_OPEN_1200x1200_72DPI.png?sw=400&sh=400&sm=fit' },
    { numero: 3, produto: 'Iluminador Em Bastão Fenty Stix Shimmer Skinstick', imagem:'https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dwcdc2ff41/images/Color%20BR/Fenty/2024/Ajustes/Match-Stix/Purrl/fb_spr20_iii_t2product_silo_match_stix_glow_open_2000x2000_1500px.jpg?sw=556&sh=680&sm=fit' },
    { numero: 4, produto: 'Pó Translúcido Compacto Fenty Invisimatte Blotting Powder', imagem: 'https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dwa9143f45/images/Color%20BR/Fenty/2023/P%C3%B3/840026658638(foto1).jpg?sw=556&sh=680&sm=fit' },
    { numero: 5, produto: 'Base Líquida Fenty Eaze Drop Blurring', imagem:'https://www.sephora.com.br/dw/image/v2/BFJC_PRD/on/demandware.static/-/Sites-masterCatalog_Sephora/pt_BR/dwe0832029/images/Color%20BR/Fenty/eaze%20drop/FB_SPR_SUM21_T2PRODUCT_SILO_EAZE_DROP_CLOSED_01_2000x2000_1500px.jpg?sw=1200&sh=1200&sm=fit' },
];

// Funções para manipular o histórico de prêmios
const carregarHistorico = () => {
    const historico = JSON.parse(localStorage.getItem('prizeHistory')) || [];
    const listaHistorico = document.getElementById('prizeHistory');
    listaHistorico.innerHTML = '';
    historico.forEach((produto) => {
        const item = document.createElement('li');
        item.textContent = `Produto: ${produto}`;
        listaHistorico.appendChild(item);
    });
};

const salvarSorteio = (produto) => {
    const historico = JSON.parse(localStorage.getItem('prizeHistory')) || [];
    historico.push(produto);
    localStorage.setItem('prizeHistory', JSON.stringify(historico));
    carregarHistorico();
};

// Evento de clique para girar a roda
botaoGirar.addEventListener('click', () => {
    if (numerosEscolhidos.length < QUANTIDADE) {
        alert("Escolha três números");
        return;
    }

    if (girando) return;
    girando = true;
    resultado.textContent = '';

    const grauAleatorio = Math.floor(Math.random() * 360) + 360 * 5;
    roda.style.transition = 'transform 4000ms ease-out';
    roda.style.transform = `rotate(${grauAleatorio}deg)`;

    setTimeout(() => {
        girando = false;
        const grauFinal = grauAleatorio % 360;
        const numeroSorteado = Math.floor((360 - grauFinal) / (360 / 15)) + 1;

        const indiceProduto = Math.floor(Math.random() * premios.length);
        const { produto } = premios[indiceProduto];

        const acertou = numerosEscolhidos.includes(numeroSorteado);

        let conteudoModal;
        if (acertou) {
            salvarSorteio(produto);
            conteudoModal = `
                <p><span class="corRosa">Parabéns! Você Ganhou:</span></p>
                <p>Número sorteado: ${numeroSorteado}</p>
                <img src="${premios[indiceProduto].imagem}" alt="${produto}" class="produto-imagem">
                <p><span class="corCinza">Você ganhou:</span> <span class="produto-nome">${produto}</span></p>`; 
        } else {
            conteudoModal = `
                <p><span class="corRosa">Você não ganhou nada!</span></p>
                <p>Número sorteado: ${numeroSorteado}</p>`;
        }

         abrirModal(conteudoModal);

        roda.style.transition = 'none';
        roda.style.transform = 'none';
    }, 4000);
});

// Evento para limpar o histórico
botaoLimparStorage.addEventListener('click', () => {
    localStorage.removeItem('prizeHistory');
    carregarHistorico();
    resultado.textContent = 'Histórico limpo!';
});

// Inicializa histórico e tema ao carregar a página
carregarHistorico();


// Seleção de números
const numeros = document.querySelectorAll(".numero");

numeros.forEach(n => {
    n.addEventListener("click", function () {
        const numeroValor = parseInt(this.value);

        if (numerosEscolhidos.includes(numeroValor)) {
            numerosEscolhidos = numerosEscolhidos.filter(num => num !== numeroValor);
            this.classList.remove("escolhido");
        } else {
            if (numerosEscolhidos.length >= QUANTIDADE) {
                alert("Você só pode escolher três números.");
                return;
            }

            numerosEscolhidos.push(numeroValor);
            this.classList.add("escolhido");
        }

        console.log(numerosEscolhidos);
    });
});

// Seleciona o modal e o botão de fechar
const Modal = document.querySelector('.modal');
const closeModal = document.querySelector('.close');

// Função para exibir o modal
const abrirModal = (conteudoModal) => {
  const modalBody = document.querySelector('.modal-body');
  modalBody.innerHTML = conteudoModal; // Insere conteúdo dinâmico no modal
  Modal.style.display = 'block';
};

// Fechar o modal quando o botão "fechar" é clicado
closeModal.addEventListener('click', () => {
  Modal.style.display = 'none';
});

// Fechar o modal clicando fora da área do conteúdo
window.addEventListener('click', (e) => {
  if (e.target === Modal) {
    Modal.style.display = 'none';
  }
});