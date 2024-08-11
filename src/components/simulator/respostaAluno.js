document.addEventListener("DOMContentLoaded", function () {
  const actionButtons = document.querySelectorAll(".case-actions .btnExame");

  // Apply click event listeners to all buttons
  actionButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remove 'selected' from all buttons
      actionButtons.forEach((b) => b.classList.remove("selected"));

      // Mark this button as selected
      this.classList.add("selected");

      // You can call other functions here to update based on the selected button
      updateSelectedButton(this);
    });
  });

  // Ensure the initially selected button is recognized if needed
  updateSelectedButton(
    document.querySelector(".case-actions .btnExame.selected")
  );
});

// Example function to handle changes when a new button is selected
function updateSelectedButton(button) {
  console.log("Selected diagnosis: " + button.textContent.trim());
  // Additional logic for updating other parts of the page can go here
}

document.addEventListener("DOMContentLoaded", function () {
  // Get buttons
  const btnDiagnostico = document.getElementById("btnDiagnostico");
  const btnPrescricao = document.getElementById("btnPrescricao");
  const btnExame = document.getElementById("btnExame");
  const btnVideo = document.getElementById("btnVideo");

  // Get sections
  const diagnosticoSection = document.querySelector(".diagnostico-section");
  const prescricaoSection = document.querySelector(".prescricao-section");
  const exameSection = document.querySelector(".exame-section");
  const videoSection = document.getElementById("videoSection");

  let player;
  let videoCurrentTime = 0;

  function onYouTubeIframeAPIReady() {
    player = new YT.Player("videoIframe", {
      events: {
        onReady: onPlayerReady,
        onStateChange: onPlayerStateChange,
      },
    });
  }

  function onPlayerReady(event) {
    event.target.seekTo(videoCurrentTime, true);
  }

  function onPlayerStateChange(event) {
    if (
      event.data === YT.PlayerState.PAUSED ||
      event.data === YT.PlayerState.ENDED
    ) {
      videoCurrentTime = event.target.getCurrentTime();
    }
  }

  // Function to show only one section
  function showSection(section) {
    // Hide all sections
    diagnosticoSection.style.display = "none";
    prescricaoSection.style.display = "none";
    exameSection.style.display = "none";
    videoSection.style.display = "none";

    // Show the requested section
    section.style.display = "block";

    if (section !== videoSection && player) {
      videoCurrentTime = player.getCurrentTime();
      player.pauseVideo();
    } else if (section === videoSection && player) {
      player.seekTo(videoCurrentTime, true);
      player.playVideo();
    }
  }

  // Event listeners for buttons
  btnDiagnostico.addEventListener("click", function () {
    showSection(diagnosticoSection);
  });

  btnPrescricao.addEventListener("click", function () {
    showSection(prescricaoSection);
  });

  btnExame.addEventListener("click", function () {
    showSection(exameSection);
  });

  btnVideo.addEventListener("click", function () {
    showSection(videoSection);
  });

  // Initially show the diagnostico section
  showSection(diagnosticoSection);

  // Load YouTube IFrame API
  const tag = document.createElement("script");
  tag.src = "https://www.youtube.com/iframe_api";
  const firstScriptTag = document.getElementsByTagName("script")[0];
  firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
});

document.addEventListener("DOMContentLoaded", function () {
  const popups = document.querySelectorAll(".popup-overlay");
  const closeButtons = document.querySelectorAll(".close-button");

  function togglePopup(popupId) {
    const popup = document.getElementById(popupId);
    if (popup.style.display === "none") {
      popup.style.display = "flex";
    } else {
      popup.style.display = "none";
    }
  }

  // Close popups when clicking on the overlay or the close button
  popups.forEach((popup) => {
    popup.addEventListener("click", function (event) {
      if (
        event.target.classList.contains("popup-overlay") ||
        event.target.classList.contains("close-button")
      ) {
        popup.style.display = "none";
      }
    });
  });

  // Example button triggers - replace or add according to your actual buttons
  document
    .getElementById("btnDiagnosticoAlternatives")
    .addEventListener("click", function () {
      togglePopup("popup-diagnostico");
    });

  document
    .getElementById("btnPrescricaoAlternatives")
    .addEventListener("click", function () {
      togglePopup("popup-prescricao");
    });

  document
    .getElementById("btnExameAlternatives")
    .addEventListener("click", function () {
      togglePopup("popup-exame");
    });
});
