#!/usr/bin/env bash
# Запускает expo start и пишет лог в logs/ с временной меткой

LOGS_DIR="$(dirname "$0")/../logs"
mkdir -p "$LOGS_DIR"

TIMESTAMP=$(date +"%Y-%m-%d_%H-%M-%S")
LOG_FILE="$LOGS_DIR/expo_${TIMESTAMP}.log"

echo "Лог сохраняется в: $LOG_FILE"
echo "=== expo start: $TIMESTAMP ===" > "$LOG_FILE"

# Запускаем expo start, вывод дублируется в терминал и в файл
npx expo start 2>&1 | tee -a "$LOG_FILE"
