# Singleton

Ein einfaches Real-World-Beispiel für das Singleton-Muster in JavaScript wäre die Implementierung einer Logger-Klasse, die eine einzige Instanz hat und von überall im Code aufgerufen werden kann, um Log-Nachrichten zu schreiben.

Hier ist ein Beispielcode, der das demonstriert:

```js
class Logger {
  constructor() {
    if (!Logger.instance) {
      this.logs = [];
      Logger.instance = this;
    }
    return Logger.instance;
  }

  log(message) {
    this.logs.push(message);
    console.log(`[Logger] ${message}`);
  }

  printLogs() {
    console.log("[Logger] Logs:");
    this.logs.forEach((log) => console.log(log));
  }
}

const logger = new Logger(); // Singleton-Instanz

logger.log("Hello World!");
logger.printLogs(); // gibt "[Logger] Logs:\nHello World!" aus

const logger2 = new Logger(); // Singleton-Instanz

console.log(logger === logger2); // true, da es nur eine Singleton-Instanz gibt
```

In diesem Beispiel wird die Logger-Klasse als Singleton implementiert, indem die Konstruktorfunktion so modifiziert wird, dass sie nur eine einzige Instanz erzeugt. Wenn Logger.instance bereits existiert, wird einfach diese Instanz zurückgegeben, anstatt eine neue Instanz zu erstellen. Dadurch kann auf dieselbe Logger-Instanz von überall im Code zugegriffen werden, ohne dass mehrere Instanzen erstellt werden müssen. In diesem Beispiel wird die Logger-Instanz verwendet, um eine Log-Nachricht hinzuzufügen und alle bisherigen Log-Nachrichten auszugeben.
