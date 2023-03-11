const prototype = (id) => {
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
  card1.imageUrl = "https://picsum.photos/100";

  const card2 = Object.create(cardPrototype);
  card2.title = "Card 2";
  card2.description = "This is the second card";
  card2.imageUrl = "https://picsum.photos/100";

  // Rendere die Karten auf der Webseite
  const cardContainer = document.querySelector(id);
  cardContainer.appendChild(card1.render());
  cardContainer.appendChild(card2.render());
};

export default prototype;
