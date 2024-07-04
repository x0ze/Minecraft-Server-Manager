#!/bin/bash
# Parameter : 1=Server Name

screen -S $1 -X stuff "/stop\n"
screen -S $1 -X stuff "exit\n"