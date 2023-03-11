const abstractFactory = () => {
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
    createColor() {}
  }

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

    createColor() {
      return "green";
    }
  }

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

    createColor() {
      return "red";
    }
  }

  function showNotification(notificationFactory) {
    const header = notificationFactory.createHeader();
    const text = notificationFactory.createText();
    const icon = notificationFactory.createIcon();
    const color = notificationFactory.createColor();

    const notification = document.createElement("div");
    notification.classList.add("notification");
    notification.style.backgroundColor = color;
    notification.appendChild(header);
    notification.appendChild(icon);
    notification.appendChild(text);

    document.body.appendChild(notification);
  }

  const successNotification = new SuccessNotificationFactory();
  showNotification(successNotification);

  const errorNotification = new ErrorNotificationFactory();
  showNotification(errorNotification);
};

export default abstractFactory;
