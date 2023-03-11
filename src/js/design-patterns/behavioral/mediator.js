const mediator = () => {
  // Der zentrale Mediator
  // Der zentrale Mediator
  class UIMediator {
    constructor() {
      this.components = [];
    }

    register(component) {
      this.components.push(component);
    }

    notify(sender, event) {
      console.log(
        `Mediator: Benachrichtige Komponenten über Event '${event}' von Sender:`,
        sender
      );
      this.components.forEach((component) => {
        if (component !== sender) {
          console.log(
            `Mediator: Sende Event '${event}' an Komponente:`,
            component
          );
          component.receiveEvent(sender, event);
        }
      });
    }
  }

  // Eine UI-Komponente
  class Button {
    constructor(mediator) {
      this.mediator = mediator;
      this.enabled = true;
    }

    click() {
      if (this.enabled) {
        console.log("Button: Klick registriert");
        this.mediator.notify(this, "buttonClicked");
      }
    }

    receiveEvent(sender, event) {
      console.log(`Button: Erhalte Event '${event}' von Sender:`, sender);

      if (event === "disableButton") {
        this.enabled = false;
        document.getElementById("button2").style.display = "none";

        console.log("Button: Deaktiviert");
      } else if (event === "enableButton") {
        this.enabled = true;
        document.getElementById("button2").style.display = "inline-block";

        console.log("Button: Aktiviert");
      } else if (event === "colorChange") {
        document.getElementById("button3").style.backgroundColor = "red";
      }
    }
  }

  // Beispielanwendung
  const mediator = new UIMediator();
  const button1 = new Button(mediator);
  const button2 = new Button(mediator);
  const button3 = new Button(mediator);
  mediator.register(button1);
  mediator.register(button2);
  mediator.register(button3);

  // Klick auf Button 1 soll Button 2 deaktivieren
  document.getElementById("button1").addEventListener("click", () => {
    button1.click();
    mediator.notify(button2, "disableButton");
    mediator.notify(button3, "colorChange");
  });

  document.getElementById("button3").addEventListener("click", () => {
    mediator.notify(button2, "enableButton");
  });
};

export default mediator;
