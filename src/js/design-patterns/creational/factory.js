const factory = () => {
  // Basisklasse für einen Benutzer
  class User {
    constructor(name) {
      this.name = name;
    }

    sayHello() {
      console.log(
        `Hallo, ich bin ${this.name} und habe die Rolle ${this.role}`
      );
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
};

export default factory;
