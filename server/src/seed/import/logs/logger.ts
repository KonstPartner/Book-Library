import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import util from 'util';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const logFilePath = path.resolve(__dirname, 'logs.txt');
const logStream = fs.createWriteStream(logFilePath, { flags: 'a' });

const originalConsoleLog = console.log;
const originalConsoleError = console.error;
const originalConsoleWarn = console.warn;
const originalConsoleInfo = console.info;

const formatArgs = (args: any[]) =>
  args.map((arg) =>
    typeof arg === 'object' ? util.inspect(arg, { depth: null, colors: false }) : arg
  ).join(' ');

console.log = (...args: any[]) => {
  const logMessage = `[LOG] ${new Date().toISOString()} - ${formatArgs(args)}\n`;
  logStream.write(logMessage);
  originalConsoleLog(...args);
};

console.error = (...args: any[]) => {
  const logMessage = `[ERROR] ${new Date().toISOString()} - ${formatArgs(args)}\n`;
  logStream.write(logMessage);
  originalConsoleError(...args);
};

console.warn = (...args: any[]) => {
  const logMessage = `[WARN] ${new Date().toISOString()} - ${formatArgs(args)}\n`;
  logStream.write(logMessage);
  originalConsoleWarn(...args);
};

console.info = (...args: any[]) => {
  const logMessage = `[INFO] ${new Date().toISOString()} - ${formatArgs(args)}\n`;
  logStream.write(logMessage);
  originalConsoleInfo(...args);
};

process.on('exit', () => {
  logStream.end();
});
