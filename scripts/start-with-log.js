const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const logsDir = path.join(__dirname, '..', 'logs');
fs.mkdirSync(logsDir, { recursive: true });

const timestamp = new Date().toISOString().replace(/[:.]/g, '-').slice(0, 19);
const logFile = path.join(logsDir, `expo_${timestamp}.log`);
const stream = fs.createWriteStream(logFile, { flags: 'a' });

console.log(`Лог сохраняется в: ${logFile}`);
stream.write(`=== expo start: ${new Date().toISOString()} ===\n`);

const proc = spawn('npx expo start --tunnel', [], {
  stdio: ['inherit', 'pipe', 'pipe'],
  shell: true,
});

proc.stdout.on('data', (data) => {
  process.stdout.write(data);
  stream.write(data);
});

proc.stderr.on('data', (data) => {
  process.stderr.write(data);
  stream.write(data);
});

proc.on('close', (code) => {
  stream.end();
  process.exit(code ?? 0);
});
