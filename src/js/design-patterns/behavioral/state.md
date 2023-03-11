# STATE

Gerne! Hier ist ein kleines Beispiel für das State Design Pattern im Zusammenhang mit einer einfachen UI-Komponente:

```js
// Definieren des State-Objekts
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

// Die UI-Komponente, die den Zustand verwaltet
class ProcessComponent {
  constructor(elementId) {
    this.element = document.getElementById(elementId);
    this.currentState = states.idle;
    this.render();
  }

  // Aktualisiert die UI-Komponente, um den aktuellen Zustand widerzuspiegeln
  render() {
    this.element.innerHTML = `
      <div>${this.currentState.message}</div>
      <button style="background-color: ${this.currentState.buttonColor}">${this.currentState.buttonLabel}</button>
    `;
  }

  // Ändert den Zustand auf den übergebenen Zustand
  changeState(newState) {
    this.currentState = newState;
    this.render();
  }
}

// Beispielanwendung
const processComponent = new ProcessComponent("process-component");

document.querySelector("button").addEventListener("click", () => {
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
```

In diesem Beispiel wird der Zustand einer einfachen UI-Komponente, die einen Prozess darstellt, mithilfe des State Design Patterns verwaltet. Das State-Objekt definiert die verschiedenen Zustände, die die Komponente annehmen kann, und die Komponente selbst ändert ihren Zustand und aktualisiert ihre Darstellung entsprechend. Der Benutzer kann durch Klicken auf den Button zwischen den verschiedenen Zuständen wechseln.
