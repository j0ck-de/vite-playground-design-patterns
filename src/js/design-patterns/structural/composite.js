const composite = () => {
  // Abstrakte Komponente für UI-Elemente
  class UIComponent {
    constructor(name) {
      this.name = name;
    }

    render() {}
  }

  // Blattkomponente für Textelemente
  class UIText extends UIComponent {
    constructor(name, text) {
      super(name);
      this.text = text;
    }

    render() {
      const textElement = document.createElement("p");
      textElement.innerText = this.text;
      return textElement;
    }
  }

  // Blattkomponente für Bild-Elemente
  class UIImage extends UIComponent {
    constructor(name, src) {
      super(name);
      this.src = src;
    }

    render() {
      const imageElement = document.createElement("img");
      imageElement.setAttribute("src", this.src);
      return imageElement;
    }
  }

  // Kompositum für UI-Container (z.B. Div-Elemente)
  class UIContainer extends UIComponent {
    constructor(name, children = []) {
      super(name);
      this.children = children;
    }

    add(child) {
      this.children.push(child);
    }

    remove(child) {
      const index = this.children.indexOf(child);
      if (index !== -1) {
        this.children.splice(index, 1);
      }
    }

    render() {
      const containerElement = document.createElement("div");
      containerElement.classList.add("ui-container");
      containerElement.setAttribute("id", this.name);

      for (const child of this.children) {
        containerElement.appendChild(child.render());
      }

      return containerElement;
    }
  }

  // Client-Code
  const pageContainer = new UIContainer("page-container");

  const header = new UIText("header", "Welcome to my page!");
  const image = new UIImage("image", "https://picsum.photos/100");
  const contentContainer = new UIContainer("content-container");
  const paragraph1 = new UIText("paragraph1", "Lorem ipsum dolor sit amet.");
  const paragraph2 = new UIText("paragraph2", "Consectetur adipiscing elit.");
  contentContainer.add(paragraph1);
  contentContainer.add(paragraph2);

  pageContainer.add(header);
  pageContainer.add(image);
  pageContainer.add(contentContainer);

  document.body.appendChild(pageContainer.render());
};

export default composite;
