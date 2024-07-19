class Logger {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  log(...args: any[]) {
    // eslint-disable-next-line no-console
    console.log(...args);
  }
}

const logger = new Logger();
export default logger;
