export enum LogLevel {
  INFO = "INFO",
  WARN = "WARN",
  ERROR = "ERROR",
  SUCCESS = "SUCCESS",
}

export class Logger {
  private static formatMessage(level: LogLevel, message: string): string {
    const timestamp = new Date().toISOString();
    return `[${timestamp}] [${level}] ${message}`;
  }

  public static info(message: string): void {
    console.log(this.formatMessage(LogLevel.INFO, message));
  }

  public static warn(message: string): void {
    console.warn(this.formatMessage(LogLevel.WARN, message));
  }

  public static error(message: string, error?: any): void {
    console.error(this.formatMessage(LogLevel.ERROR, message));
    if (error) {
      console.error(error);
    }
  }

  public static success(message: string): void {
    console.log(this.formatMessage(LogLevel.SUCCESS, message));
  }
}
