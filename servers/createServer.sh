#!/bin/bash
# Parameter : 1=Server Version 2=server Name 3=Minecraft Version 4=Server memory

checkVersion=${3:2:2}
if [ "$checkVersion" -lt 17 ]; then
    java_command="/servers/java/jdk8u412-b08/bin/java"
else
    java_command="/bin/java"
fi

cd /servers/$1
mkdir $2
cd $2
echo "eula=true" >> eula.txt

if [ "$1" == "forge" ]; then
    $java_command -jar /servers/forge/versions/forge-$3.jar --installServer
    startServer=$(find . -maxdepth 1 -name forge*.jar)
    screen -dmS $2 sh
    screen -S $2 -X stuff "$java_command -Xms$4G -Xmx$4G -XX:+UseG1GC -jar $startServer nogui\n"
else
    screen -dmS $2 sh
    screen -S $2 -X stuff "$java_command -Xms$4G -Xmx$4G -XX:+UseG1GC -jar /servers/$1/versions/$1-$3.jar nogui\n"
fi
