const templateMethod = () => {
  class Form {
    // Die Template-Methode, die den Validierungsprozess steuert
    validate() {
      const formData = this.getFormData();
      const validationRules = this.getValidationRules();
      const validationResult = {};

      // Iteration über alle Eingabefelder und Validierung
      for (let fieldName in formData) {
        const fieldValue = formData[fieldName];
        const validationFunction = validationRules[fieldName];
        if (validationFunction) {
          validationResult[fieldName] = validationFunction(fieldValue);
        }
      }

      // Aufruf einer Hook-Methode für die Nachbearbeitung des Ergebnisses
      this.afterValidation(validationResult);
    }

    // Hook-Methode, die nach der Validierung aufgerufen wird
    afterValidation(validationResult) {
      // Default-Implementierung: Ausgabe der Validierungsergebnisse in der Konsole
      console.log("Validierungsergebnisse:", validationResult);
    }

    // Abstrakte Methode, die von den konkreten Formularklassen implementiert werden muss
    getFormData() {
      throw new Error(
        "getFormData muss von einer Unterklasse implementiert werden"
      );
    }

    // Abstrakte Methode, die von den konkreten Formularklassen implementiert werden muss
    getValidationRules() {
      throw new Error(
        "getValidationRules muss von einer Unterklasse implementiert werden"
      );
    }
  }

  // Konkrete Implementierung für ein Login-Formular
  class LoginForm extends Form {
    getFormData() {
      return {
        username: document.getElementById("username").value,
        password: document.getElementById("password").value,
      };
    }

    getValidationRules() {
      return {
        username: (value) => !!value, // Das Feld darf nicht leer sein
        password: (value) => value.length >= 8, // Das Passwort muss mindestens 8 Zeichen lang sein
      };
    }

    afterValidation(validationResult) {
      // Rendern der Validierungsergebnisse in der UI
      const validationMessageContainer = document.getElementById(
        "validation-messages"
      );
      validationMessageContainer.innerHTML = "";
      for (let fieldName in validationResult) {
        const fieldValidationResult = validationResult[fieldName];
        if (fieldValidationResult !== true) {
          const errorMessage = document.createElement("div");
          errorMessage.classList.add("error-message");
          errorMessage.innerHTML = `Fehler im Feld "${fieldName}": ${fieldValidationResult}`;
          validationMessageContainer.appendChild(errorMessage);
        }
      }
    }
  }

  // Initialisierung des Login-Formulars und Hinzufügen des Event-Handlers für den Submit-Button
  const loginForm = new LoginForm();
  document.getElementById("login-form").addEventListener("submit", (event) => {
    event.preventDefault();
    loginForm.validate();
  });
};

export default templateMethod;
