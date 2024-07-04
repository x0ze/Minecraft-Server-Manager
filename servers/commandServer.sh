#!/bin/bash
# Parameter : 1=Server Name 2=command

sanitize_input() {
  local input="$1"
  sanitized=$(echo "$input" | sed 's/[^a-zA-Z0-9_ -]//g')
  echo "$sanitized"
}

sanitized_command=$(sanitize_input "$2")
sanitized_name=$(sanitize_input "$1")

if [[ "$sanitized_command" == *"stop"* ]]; then
  echo "Error: Command contains forbidden word 'stop'"
  exit
else
    screen -S "$sanitized_name" -X stuff "/$sanitized_command\n"
fi