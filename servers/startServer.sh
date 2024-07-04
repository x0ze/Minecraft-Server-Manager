#!/bin/bash
# Parameter : 1=Server Version 2=server Name 3=Minecraft Version 4=Server memory

if [ $1 -eq "0" ]; then
    minecraftServer="spigot"
elif [ $1 -eq "1" ]; then
    minecraftServer="forge"
elif [ $1 -eq "2" ]; then
    minecraftServer="mohist"
else 
    echo "Error invalid server version"
    exit
fi

checkVersion=${3:2:2}
if [ "$checkVersion" -lt 17 ]; then
    java_command="/servers/java/jdk8u412-b08/bin/java"
else
    java_command="/bin/java"
fi

cd /servers/$minecraftServer/$2

if [ "$minecraftServer" == "forge" ]; then
    startServer=$(find . -maxdepth 1 -name forge*.jar)
    screen -dmS $2 sh
    screen -S $2 -X stuff "$java_command -Xms$4G -Xmx$4G -XX:+UseG1GC -jar $startServer nogui\n"
else
    screen -dmS $2 sh
    screen -S $2 -X stuff "$java_command -Xms$4G -Xmx$4G -XX:+UseG1GC -jar /servers/$minecraftServer/versions/$minecraftServer-$3.jar nogui\n"
fi