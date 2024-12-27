import chalk from "chalk";

export const logger = {
  info: (message: string): void => {
    console.log(chalk.blue(`[INFO] ${message}`)); // Blue for info messages
  },
  success: (message: string): void => {
    console.log(chalk.green(`[SUCCESS] ${message}`)); // Green for success
  },
  warn: (message: string): void => {
    console.log(chalk.yellow(`[WARN] ${message}`)); // Yellow for warnings
  },
  error: (message: string): void => {
    console.log(chalk.red(`[ERROR] ${message}`)); // Red for errors
  },
  debug: (message: string): void => {
    console.log(chalk.magenta(`[DEBUG] ${message}`)); // Magenta for debug messages
  },
  custom: (color: string, label: string, message: string) => {
    console.log(chalk.hex(color)(`[${label}] ${message}`)); // Custom colored message
  },
};
