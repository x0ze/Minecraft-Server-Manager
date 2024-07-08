#!/bin/bash
# Parameter : 1=Server Version 2=Server Name

pkill screen
cd /servers/$1
rm -rf $2