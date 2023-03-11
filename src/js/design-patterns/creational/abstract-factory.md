# Abstract Factory

Ein einfacheres Real-World-Beispiel für das Abstract Factory Design Pattern in JavaScript könnte die Erstellung von verschiedenen Arten von Benachrichtigungen in einer Anwendung sein. Angenommen, eine Anwendung muss Benachrichtigungen für verschiedene Ereignisse wie Erfolg, Fehler oder Warnungen anzeigen. Anstatt für jede Art von Benachrichtigung individuelle Code-Blöcke zu schreiben, könnte man das Abstract Factory Design Pattern verwenden, um eine Factory zu erstellen, die für jede Art von Benachrichtigung die entsprechenden Elemente erstellt, z.B. eine Überschrift, einen Text und ein Icon.

Hier ist ein Beispielcode:

```js
// Abstrakte Fabrik für Benachrichtigungen
class NotificationFactory {
  constructor() {
    if (new.target === NotificationFactory) {
      throw new Error("Abstract class cannot be instantiated directly");
    }
  }

  createHeader() {}
  createText() {}
  createIcon() {}
}

// Konkrete Fabrik für Erfolgsbenachrichtigungen
class SuccessNotificationFactory extends NotificationFactory {
  createHeader() {
    const header = document.createElement("h2");
    header.innerText = "Erfolg";
    return header;
  }

  createText() {
    const text = document.createElement("p");
    text.innerText = "Ihre Aktion wurde erfolgreich ausgeführt.";
    return text;
  }

  createIcon() {
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-check", "success-icon");
    return icon;
  }
}

// Konkrete Fabrik für Fehlerbenachrichtigungen
class ErrorNotificationFactory extends NotificationFactory {
  createHeader() {
    const header = document.createElement("h2");
    header.innerText = "Fehler";
    return header;
  }

  createText() {
    const text = document.createElement("p");
    text.innerText =
      "Ein Fehler ist aufgetreten. Bitte versuchen Sie es erneut.";
    return text;
  }

  createIcon() {
    const icon = document.createElement("i");
    icon.classList.add("fas", "fa-exclamation-triangle", "error-icon");
    return icon;
  }
}

// Client-Code
function showNotification(notificationFactory) {
  const header = notificationFactory.createHeader();
  const text = notificationFactory.createText();
  const icon = notificationFactory.createIcon();

  const notification = document.createElement("div");
  notification.classList.add("notification");
  notification.appendChild(header);
  notification.appendChild(icon);
  notification.appendChild(text);

  document.body.appendChild(notification);
}

// Beispielanwendung
const successNotification = new SuccessNotificationFactory();
showNotification(successNotification);

const errorNotification = new ErrorNotificationFactory();
showNotification(errorNotification);
```

In diesem Beispiel wird eine abstrakte Klasse NotificationFactory definiert, die die Methoden createHeader, createText und createIcon hat. Diese Methoden werden von konkreten Fabriken implementiert, die für jede Art von Benachrichtigung spezifische Elemente erstellen. In diesem Beispiel gibt es SuccessNotificationFactory und ErrorNotificationFactory, die jeweils ihre eigenen Überschriften, Texte und Symbole für ihre Benachrichtigungen erstellen. Der Client-Code ruft dann einfach showNotification mit der entsprechenden Fabrik auf, um eine Benachrichtigung anzuzeigen.
