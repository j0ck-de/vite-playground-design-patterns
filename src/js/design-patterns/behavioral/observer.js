const observer = () => {
  class Subject {
    constructor() {
      this.observers = [];
    }

    // Fügt einen Observer hinzu
    addObserver(observer) {
      this.observers.push(observer);
    }

    // Benachrichtigt alle registrierten Observers
    notifyObservers() {
      this.observers.forEach((observer) => observer.update());
    }
  }

  // Ein Observer-Objekt
  class Observer {
    constructor(name) {
      this.name = name;
    }

    // Wird aufgerufen, wenn das Subject sich ändert
    update() {
      console.log(`Ich (${this.name}) wurde benachrichtigt!`);
    }
  }

  // Beispielanwendung
  const subject = new Subject();
  const observer1 = new Observer("Observer 1");
  const observer2 = new Observer("Observer 2");

  // Registrieren der Observers beim Subject
  subject.addObserver(observer1);
  subject.addObserver(observer2);

  // Das Subject ändert sich und benachrichtigt die Observers
  subject.notifyObservers();
};

export default observer;
