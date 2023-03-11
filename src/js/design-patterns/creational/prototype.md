# Prototype

Ein komplexeres Beispiel für die Verwendung des Prototype Patterns in der Praxis ist die Erstellung von wiederkehrenden Elementen auf einer Webseite. Nehmen wir an, dass wir eine Webseite haben, auf der wir mehrere ähnliche Elemente erstellen müssen, z.B. mehrere Karten mit ähnlichem Inhalt. Anstatt jedes Mal von Grund auf neu zu beginnen, können wir den Prototype Pattern verwenden, um ein einmaliges Element zu erstellen und dann Klone davon zu erstellen.

Hier ist ein Beispiel in JavaScript:

```js
// Erstelle einen Prototypen des zu klonenden Elements
const cardPrototype = {
  title: "",
  description: "",
  imageUrl: "",
  render: function () {
    const cardContainer = document.createElement("div");
    const cardTitle = document.createElement("h3");
    const cardDescription = document.createElement("p");
    const cardImage = document.createElement("img");

    cardTitle.textContent = this.title;
    cardDescription.textContent = this.description;
    cardImage.src = this.imageUrl;

    cardContainer.appendChild(cardTitle);
    cardContainer.appendChild(cardDescription);
    cardContainer.appendChild(cardImage);

    return cardContainer;
  },
};

// Erstelle mehrere Klone des Prototyps
const card1 = Object.create(cardPrototype);
card1.title = "Card 1";
card1.description = "This is the first card";
card1.imageUrl = "https://example.com/card1.jpg";

const card2 = Object.create(cardPrototype);
card2.title = "Card 2";
card2.description = "This is the second card";
card2.imageUrl = "https://example.com/card2.jpg";

// Rendere die Karten auf der Webseite
const cardContainer = document.getElementById("card-container");
cardContainer.appendChild(card1.render());
cardContainer.appendChild(card2.render());
```

In diesem Beispiel erstellen wir einen Prototypen für eine Karte auf unserer Webseite. Der Prototyp hat Eigenschaften wie Titel, Beschreibung und URL des Bildes und eine render()-Methode, die das HTML-Element erstellt, das auf der Webseite gerendert wird.

Anschließend erstellen wir mehrere Klone des Prototyps und setzen die Eigenschaften der Klone auf die Werte, die wir benötigen. Schließlich rendern wir die Karten und fügen sie dem HTML-Element hinzu, das als Container für die Karten dient.

Indem wir den Prototype Pattern verwenden, können wir schnell und effizient viele ähnliche Elemente erstellen, ohne jedes Mal den gleichen Code zu schreiben.
