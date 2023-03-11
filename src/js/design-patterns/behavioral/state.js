const state = () => {
  const states = {
    idle: {
      buttonLabel: "Start",
      buttonColor: "green",
      message: "Klicken Sie auf 'Start', um den Vorgang zu starten.",
    },
    running: {
      buttonLabel: "Stopp",
      buttonColor: "red",
      message: "Der Vorgang läuft...",
    },
    paused: {
      buttonLabel: "Weiter",
      buttonColor: "orange",
      message: "Der Vorgang ist angehalten.",
    },
  };

  class ProcessComponent {
    constructor(elementId) {
      this.element = document.getElementById(elementId);
      this.currentState = states.idle;
      this.render();
    }
    render() {
      console.log("Aktualisiere die UI-Komponente mit dem aktuellen Zustand");
      this.element.innerHTML = `
    <div>${this.currentState.message}</div>
    <button style="background-color: ${this.currentState.buttonColor}">${this.currentState.buttonLabel}</button>
  `;
    }

    changeState(newState) {
      console.log(`Ändere den Zustand von ${this.currentState} zu ${newState}`);
      this.currentState = newState;
      this.render();
    }
  }

  const processComponent = new ProcessComponent("process-component");

  console.log("Füge den Klick-Event-Listener zum Button hinzu");
  document.querySelector(".button-state").addEventListener("click", () => {
    console.log("Button wurde geklickt");
    switch (processComponent.currentState) {
      case states.idle:
        processComponent.changeState(states.running);
        break;
      case states.running:
        processComponent.changeState(states.paused);
        break;
      case states.paused:
        processComponent.changeState(states.running);
        break;
      default:
        break;
    }
  });
};

export default state;
