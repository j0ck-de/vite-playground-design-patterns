const adapter = () => {
  class GuiLibraryA {
    showMessage(message) {
      console.log(`Showing message: ${message}`);
    }
  }

  // Bibliothek B
  class GuiLibraryB {
    alert(message) {
      console.log(`Alerting message: ${message}`);
    }
  }

  // Adapter, der Bibliothek A an Bibliothek B anpasst
  class GuiAdapter {
    constructor(guiLibraryA) {
      this.guiLibraryA = guiLibraryA;
    }

    alert(message) {
      this.guiLibraryA.showMessage(message);
    }
  }

  // Verwendung des Adapters
  const guiLibraryA = new GuiLibraryA();
  const guiAdapter = new GuiAdapter(guiLibraryA);

  guiAdapter.alert("Hello, world!"); // zeigt "Showing message: Hello, world!" in der Konsole an
};

export default adapter;
