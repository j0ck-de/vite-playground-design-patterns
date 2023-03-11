# Factory

Ein Beispiel für eine Anwendung des Factory Method Design Patterns in JavaScript könnte die Erstellung von verschiedenen Arten von Benutzern sein. Wir könnten eine Factory-Klasse erstellen, die eine Methode zur Erstellung von Benutzern bereitstellt, je nach Typ des Benutzers.

Hier ist ein Beispielcode:

```js
// Basisklasse für einen Benutzer
class User {
  constructor(name) {
    this.name = name;
  }

  sayHello() {
    console.log(`Hallo, ich bin ${this.name}`);
  }
}

// Konkrete Benutzer-Typen
class AdminUser extends User {
  constructor(name) {
    super(name);
    this.role = "admin";
  }
}

class RegularUser extends User {
  constructor(name) {
    super(name);
    this.role = "regular";
  }
}

// Factory-Klasse zur Erstellung von Benutzern
class UserFactory {
  static createUser(name, type) {
    switch (type) {
      case "admin":
        return new AdminUser(name);
      case "regular":
        return new RegularUser(name);
      default:
        throw new Error(`Ungültiger Benutzertyp: ${type}`);
    }
  }
}

// Beispielanwendung
const adminUser = UserFactory.createUser("Max", "admin");
adminUser.sayHello(); // Ausgabe: Hallo, ich bin Max

const regularUser = UserFactory.createUser("Anna", "regular");
regularUser.sayHello(); // Ausgabe: Hallo, ich bin Anna
```

In diesem Beispiel erstellen wir eine Basisklasse User und zwei konkrete Klassen AdminUser und RegularUser, die von User erben und jeweils spezifische Eigenschaften hinzufügen.

Dann haben wir die Factory-Klasse UserFactory, die eine Methode createUser bereitstellt, die je nach übergebenem Typ einen Benutzer erstellt. In diesem Beispiel haben wir zwei Benutzertypen definiert: admin und regular.

Schließlich haben wir eine Beispielanwendung, in der wir mit Hilfe der UserFactory-Klasse verschiedene Benutzer erstellen und deren sayHello-Methode aufrufen.

Dies ist ein einfaches Beispiel für die Verwendung des Factory Method Design Patterns in einer realen Anwendung. Es ist wichtig zu beachten, dass die Verwendung dieses Patterns von der Komplexität der Anwendung abhängt und nicht immer notwendig oder sinnvoll ist.
