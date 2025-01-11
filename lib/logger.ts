import chalk from "chalk";

export function info(message: string): void {
  console.log(chalk.blue("info"), "-", message);
}

export function error(message: string): void {
  console.log(chalk.red("error"), "-", message);
}

export function success(message: string): void {
  console.log(chalk.green("success"), "-", message);
}
