# Builder

Hier ist ein Beispiel für die Verwendung des Builder-Patterns bei der Erstellung von GUI-Elementen in JavaScript:

```js
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

console.log(formFields);
```

In diesem Beispiel wird eine FormFieldBuilder-Klasse definiert, die verwendet werden kann, um ein Formularfeld-Objekt zu erstellen. Die Klasse verfügt über verschiedene Methoden, die verwendet werden können, um die verschiedenen Konfigurationsparameter des Formularfelds festzulegen, z.B. setRequired, setMaxLength, setPlaceholder usw.

In der Beispielanwendung wird die FormFieldBuilder-Klasse verwendet, um ein Array von Formularfeldern zu erstellen. Jedes Formularfeld wird dabei mit Hilfe des Builders konfiguriert, indem verschiedene Methoden aufgerufen werden, um die gewünschten Eigenschaften zu setzen. Am Ende wird das vollständige Array von Formularfeldern ausgegeben.

Dieses Beispiel zeigt, wie das Builder-Pattern verwendet werden kann, um die Erstellung von GUI-Elementen wie Formularfeldern zu vereinfachen und zu strukturieren. Durch die Verwendung des Builders wird es leichter, verschiedene Konfigurationsparameter zu setzen und sicherzustellen, dass das erstellte GUI-Element einheitlich und korrekt konfiguriert ist.
