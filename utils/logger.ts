class Logger {
  // eslint-disable-next-line class-methods-use-this
  log(...args: string[]) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

const logger = new Logger();
export default logger;
