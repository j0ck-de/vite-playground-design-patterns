# Mediator

Das Mediator Design Pattern kann in der UI-Entwicklung eingesetzt werden, um die Interaktion zwischen verschiedenen UI-Komponenten zu vereinfachen und zu organisieren. Ein zentraler Mediator wird erstellt, der als Vermittler zwischen den verschiedenen UI-Komponenten dient. Jede UI-Komponente kommuniziert nur noch mit dem Mediator und nicht direkt mit anderen UI-Komponenten.

Hier ist ein Beispiel, wie der Mediator in der UI eingesetzt werden kann:

```js
// Der zentrale Mediator
class UIMediator {
  constructor() {
    this.components = [];
  }

  register(component) {
    this.components.push(component);
  }

  notify(sender, event) {
    this.components.forEach((component) => {
      if (component !== sender) {
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
      this.mediator.notify(this, "buttonClicked");
    }
  }

  receiveEvent(sender, event) {
    if (event === "disableButton") {
      this.enabled = false;
    } else if (event === "enableButton") {
      this.enabled = true;
    }
  }
}

// Beispielanwendung
const mediator = new UIMediator();
const button1 = new Button(mediator);
const button2 = new Button(mediator);
mediator.register(button1);
mediator.register(button2);

// Klick auf Button 1 soll Button 2 deaktivieren
button1.click();
mediator.notify(button2, "disableButton");
```

In diesem Beispiel gibt es zwei Buttons, die beide beim zentralen Mediator registriert sind. Wenn der erste Button geklickt wird, benachrichtigt er den Mediator, der dann den zweiten Button deaktiviert. Die Buttons kommunizieren nicht direkt miteinander, sondern nur über den zentralen Mediator. Dadurch wird die Kommunikation und Abhängigkeit zwischen den UI-Komponenten vereinfacht und organisiert.
