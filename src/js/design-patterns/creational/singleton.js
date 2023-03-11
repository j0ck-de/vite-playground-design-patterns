const logger = () => {
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
  logger.log("How are you!");
  logger.printLogs(); // [Logger] Logs: Hello World!, How are you!

  const logger2 = new Logger(); // Singleton-Instanz

  console.log(logger === logger2); // true, da es nur eine Singleton-Instanz gibt
};

export default logger;
