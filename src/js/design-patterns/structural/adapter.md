# Adapter

Ja, ein mögliches Real-World-Beispiel für das Adapter-Designmuster in der GUI-Programmierung könnte sein, wenn eine GUI-Bibliothek entwickelt wurde, die bestimmte Steuerelemente und Methoden bereitstellt, aber eine neue Anforderung besteht, um mit einer anderen Bibliothek zu interagieren, die nicht direkt kompatibel ist. In diesem Fall könnte ein Adapter-Designmuster verwendet werden, um die beiden Bibliotheken zu verbinden.

Beispielsweise könnte eine GUI-Bibliothek (Bibliothek A) eine Methode "showMessage" bereitstellen, um eine Nachricht in einem Dialogfeld anzuzeigen. Eine andere Bibliothek (Bibliothek B) verwendet jedoch eine andere Methode "alert", um eine ähnliche Funktionalität bereitzustellen. Um die beiden Bibliotheken zu integrieren, könnte ein Adapter erstellt werden, der die "showMessage"-Methode von Bibliothek A in die "alert"-Methode von Bibliothek B übersetzt.

Ein Beispielcode in JavaScript könnte wie folgt aussehen:

```javascript
// Bibliothek A
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
```

In diesem Beispiel dient der GuiAdapter als Vermittler zwischen den beiden Bibliotheken. Er empfängt den Aufruf der alert-Methode von Bibliothek B, ruft dann die showMessage-Methode von Bibliothek A auf und übersetzt das Argument.
