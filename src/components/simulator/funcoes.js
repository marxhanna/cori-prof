document.addEventListener("DOMContentLoaded", function () {
  let currentTipIndex = 1;
  const totalTips = 6;
  document.getElementById(`tip-${currentTipIndex}`).style.display = "block";

  function showNextTip() {
    if (currentTipIndex < totalTips) {
      // Incrementa o índice para a próxima dica
      currentTipIndex++;

      // Mostra a próxima dica (sem esconder as anteriores)
      document.getElementById(`tip-${currentTipIndex}`).style.display = "block";

      // Atualiza o texto do botão
      document.getElementById(
        "nextTipButton"
      ).innerHTML = `Próxima Dica (${currentTipIndex}/${totalTips}) <i class="fa-solid fa-arrow-right"></i>`;
    } else {
      // Se todas as dicas já foram mostradas, desabilita o botão
      document.getElementById("nextTipButton").disabled = true;
      document.getElementById("nextTipButton").innerHTML =
        "Todas as dicas foram mostradas";
    }
  }

  document
    .getElementById("nextTipButton")
    .addEventListener("click", showNextTip);
});

document.addEventListener("DOMContentLoaded", function () {
  const headerElement = document.querySelector("header-component");
  fetch("header.html")
    .then((response) => response.text())
    .then((html) => {
      headerElement.innerHTML = html;
    })
    .catch((error) => console.error("Error loading the header:", error));
});

function changeBackground(element) {
  document.querySelectorAll(".item .icon-wrapper").forEach((el) => {
    el.style.backgroundColor = "#ffffff";
  });
  element.querySelector(".icon-wrapper").style.backgroundColor = "#A6DC00";
}

document.addEventListener("DOMContentLoaded", function () {
  const defaultSelected = document.querySelector(
    ".item:first-child .icon-wrapper"
  );
  if (defaultSelected) {
    defaultSelected.style.backgroundColor = "#A6DC00";
  }
});

function toggleActive(card) {
  const allCards = document.querySelectorAll(".case-card");
  allCards.forEach((c) => {
    if (c !== card && c.classList.contains("active")) {
      c.classList.remove("active");
      c.querySelectorAll(".case-actions button").forEach((button) => {
        button.style.backgroundColor = "";
        button.style.color = "";
      });
    }
  });

  card.classList.toggle("active");
  if (card.classList.contains("active")) {
    card.querySelectorAll(".case-actions button").forEach((button) => {
      button.style.backgroundColor = "white";
      button.style.color = "black";
    });
  } else {
    card.querySelectorAll(".case-actions button").forEach((button) => {
      const buttonText = button.textContent.trim();
      button.style.backgroundColor = buttonColors[buttonText];
      button.style.color = "white";
    });
  }
}

function animateText() {
  var input = document.getElementById("answer-input");
  var text = input.value.trim();
  if (text) {
    var animText = document.createElement("div");
    animText.textContent = text;
    animText.style = `position: absolute; left: ${
      input.getBoundingClientRect().left
    }px; top: ${input.getBoundingClientRect().top}px; color: black;`;
    document.body.appendChild(animText);
    var fileButton = document.querySelector(".fa-file").getBoundingClientRect();

    gsap.to(animText, {
      duration: 1,
      x: fileButton.left - input.getBoundingClientRect().left,
      y: fileButton.top - input.getBoundingClientRect().top,
      scale: 0.5,
      autoAlpha: 0,
      onComplete: () => document.body.removeChild(animText),
    });

    input.value = "";
    storeText(text);
  }
}

let responseStorage = {
  Exame: [],
  Prescrição: [],
  Diagnóstico: [],
  Conduta: [],
};

document.addEventListener("DOMContentLoaded", function () {
  const showTipsButton = document.getElementById("showTips");
  const showResponseButton = document.getElementById("showResponse");

  const tipsSection = document.getElementById("tipsSection");
  const responseSection = document.getElementById("responseSection");

  showTipsButton.classList.add("selected");
  tipsSection.style.display = "block";
  responseSection.style.display = "none";

  showTipsButton.addEventListener("click", function () {
    tipsSection.style.display =
      tipsSection.style.display === "none" ? "block" : "none";
    responseSection.style.display = "none";
    showTipsButton.classList.add("selected");
    showResponseButton.classList.remove("selected");
  });

  showResponseButton.addEventListener("click", function () {
    responseSection.style.display =
      responseSection.style.display === "none" ? "block" : "none";
    tipsSection.style.display = "none";
    showResponseButton.classList.add("selected");
    showTipsButton.classList.remove("selected");
  });
});

function saveResponse(inputId, listId) {
  const inputElement = document.getElementById(inputId);
  const inputValue = inputElement.value.trim();
  if (inputValue === "") return;
  const responseType = getResponseType(inputId);
  responseStorage[responseType].push(inputValue);
  const responseList = document.getElementById(listId);
  const newResponseItem = document.createElement("li");
  newResponseItem.innerHTML = `${inputValue} <button class="delete-button" onclick="deleteResponse(this, '${responseType}')">x</button>`;
  responseList.appendChild(newResponseItem);
  inputElement.value = "";
}

function addResponse(inputId, listId) {
  saveResponse(inputId, listId);
}

function deleteResponse(buttonElement, responseType) {
  const responseItem = buttonElement.parentElement;
  const responseText = responseItem.textContent.slice(0, -1).trim();
  responseStorage[responseType] = responseStorage[responseType].filter(
    (response) => response !== responseText
  );
  responseItem.remove();
}

function getResponseType(inputId) {
  if (inputId.includes("diagnosis")) return "Diagnóstico";
  if (inputId.includes("prescription")) return "Prescrição";
  if (inputId.includes("exam")) return "Exame";
  return "";
}

$(document).ready(function () {
  let currentTip = 0;

  function showNextTip() {
    const tips = document.querySelectorAll(".case-card.hidden");
    if (currentTip < tips.length) {
      tips[currentTip].classList.remove("hidden");
      currentTip++;
      updateButton();
    }
  }

  function updateButton() {
    const nextButton = document.querySelector(".next-button");
    nextButton.innerHTML = `Próxima Dica (${
      currentTip + 1
    }/6) <i class="fa-solid fa-arrow-right"></i>`;
  }

  document.addEventListener("DOMContentLoaded", () => {
    updateButton();
  });
});
let currentTipIndex = 1;
const totalTips = 6;

function showNextTip() {
  if (currentTipIndex < totalTips) {
    // Esconde a dica atual
    document.getElementById(`tip-${currentTipIndex}`).classList.add("hidden");

    // Incrementa o índice para a próxima dica
    currentTipIndex++;

    // Mostra a próxima dica
    document
      .getElementById(`tip-${currentTipIndex}`)
      .classList.remove("hidden");

    // Atualiza o texto do botão
    document.getElementById(
      "nextTipButton"
    ).innerHTML = `Próxima Dica (${currentTipIndex}/${totalTips}) <i class="fa-solid fa-arrow-right"></i>`;
  } else {
    // Se todas as dicas já foram mostradas, desabilita o botão
    document.getElementById("nextTipButton").disabled = true;
    document.getElementById("nextTipButton").innerHTML =
      "Todas as dicas foram mostradas";
  }
}

// Função para inicializar a primeira dica visível e as outras escondidas
