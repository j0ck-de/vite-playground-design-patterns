const builder = () => {
  // Builder-Klasse für ein Formularfeld
  class FormFieldBuilder {
    constructor(type, label) {
      this.field = { type, label };
    }

    setRequired() {
      this.field.required = true;
      return this;
    }

    setMaxLength(maxLength) {
      this.field.maxLength = maxLength;
      return this;
    }

    setMinLength(minLength) {
      this.field.minLength = minLength;
      return this;
    }

    setPlaceholder(placeholder) {
      this.field.placeholder = placeholder;
      return this;
    }

    build() {
      return this.field;
    }
  }

  // Beispielanwendung: Erstellung eines Formulars
  const formFields = [
    new FormFieldBuilder("text", "Vorname")
      .setRequired()
      .setMaxLength(50)
      .build(),
    new FormFieldBuilder("text", "Nachname")
      .setRequired()
      .setMaxLength(50)
      .build(),
    new FormFieldBuilder("email", "E-Mail-Adresse")
      .setRequired()
      .setPlaceholder("example@domain.com")
      .build(),
    new FormFieldBuilder("password", "Passwort")
      .setRequired()
      .setMinLength(8)
      .build(),
  ];

  return console.log(formFields);
};

export default builder;
