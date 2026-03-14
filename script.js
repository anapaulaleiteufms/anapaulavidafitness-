// script.js

// ================================
// 1️⃣ Frases motivacionais aleatórias
// ================================
const frases = [
  "Treino. Disciplina. Resultado!",
  "Cada dia é uma oportunidade para melhorar!",
  "Foco no objetivo, sempre!",
  "Dedicação hoje, conquistas amanhã!",
  "Transforme esforço em resultado!"
];

function fraseAleatoria() {
  const indice = Math.floor(Math.random() * frases.length);
  return frases[indice];
}

// ================================
// 2️⃣ Data e hora atuais
// ================================
function exibirDataHora() {
  const agora = new Date();
  return `Hoje é ${agora.toLocaleDateString('pt-BR')} - ${agora.toLocaleTimeString('pt-BR')}`;
}

// ================================
// 3️⃣ Temperatura/clima local (Caraguatatuba, SP)
// ================================
async function exibirClima() {
  const apiKey = "f9b464d60ed143c62943b32058bdcc57"; // sua chave
  const cidade = "Caraguatatuba,BR";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${cidade}&units=metric&lang=pt_br&appid=${apiKey}`;

  try {
    const resposta = await fetch(url);
    const dados = await resposta.json();
    if(dados.main && dados.weather) {
      const temperatura = Math.round(dados.main.temp);
      const descricao = dados.weather[0].description;
      return `🌤️ Clima em Caraguatatuba: ${temperatura}°C - ${descricao}`;
    } else {
      return "Clima não disponível no momento.";
    }
  } catch (erro) {
    return "Erro ao carregar o clima.";
  }
}

// ================================
// 4️⃣ Função para criar elementos na página
// ================================
window.onload = async function() {
  // Seleciona a seção "Sobre" para inserir depois dela
  const sobreSection = document.querySelector("section.container");

  // Frase motivacional
  const fraseElem = document.createElement("p");
  fraseElem.textContent = fraseAleatoria();
  fraseElem.style.textAlign = "center";
  fraseElem.style.fontWeight = "bold";
  fraseElem.style.fontSize = "1.3rem";
  fraseElem.style.marginTop = "15px";
  fraseElem.style.color = "white"; // texto em branco

  // Data e hora
  const dataHoraElem = document.createElement("p");
  dataHoraElem.textContent = exibirDataHora();
  dataHoraElem.style.textAlign = "center";
  dataHoraElem.style.fontStyle = "italic";
  dataHoraElem.style.color = "white";

  // Clima
  const climaElem = document.createElement("p");
  climaElem.textContent = await exibirClima();
  climaElem.style.textAlign = "center";
  climaElem.style.marginBottom = "20px";
  climaElem.style.color = "white";

  // Inserindo os elementos na página
  sobreSection.insertAdjacentElement("afterend", fraseElem);
  sobreSection.insertAdjacentElement("afterend", dataHoraElem);
  sobreSection.insertAdjacentElement("afterend", climaElem);

  // ================================
  // 5️⃣ IMC - adiciona na página
  // ================================
  const containerIMC = document.createElement("div");
  containerIMC.className = "social-box text-center";
  containerIMC.style.margin = "40px auto";
  containerIMC.style.maxWidth = "400px";

  containerIMC.innerHTML = `
    <h2 class="section-title">Calculadora de IMC</h2>
    <label style="color:#000;">Peso (kg):</label>
    <input type="number" id="peso" placeholder="Ex: 65" style="width:100%; margin-bottom:10px; padding:5px;">
    <label style="color:#000;">Altura (m):</label>
    <input type="number" id="altura" placeholder="Ex: 1.65" style="width:100%; margin-bottom:10px; padding:5px;">
    <button id="btnCalcIMC" class="btn btn-primary" style="margin-bottom:10px;">Calcular IMC</button>
    <p id="resultadoIMC"></p>
  `;

  sobreSection.insertAdjacentElement("afterend", containerIMC);

  // Lógica do botão IMC
  document.getElementById("btnCalcIMC").addEventListener("click", function() {
    const peso = parseFloat(document.getElementById("peso").value);
    const altura = parseFloat(document.getElementById("altura").value);
    const resultado = document.getElementById("resultadoIMC");

    if(!peso || !altura) {
      resultado.textContent = "Preencha peso e altura!";
      return;
    }

    const imc = peso / (altura * altura);
    resultado.textContent = `Seu IMC é: ${imc.toFixed(2)}`;
  });
};

