#!/bin/bash
#Parameter : 1=Server version 2=Minecraft version 3="Server name" 4="Server memory"

if [ $1 -eq 0 ]; then
    minecraftServer="spigot"
    downloadUrl="https://cdn.getbukkit.org/spigot/spigot-$2.jar"
elif [ $1 -eq 1 ]; then
    minecraftServer="forge"
    listDownloadUrl="https://files.minecraftforge.net/net/minecraftforge/forge/index_$2.html"
    downloadUrl=$(curl -s "$listDownloadUrl" | grep -A 10 "Download Latest" | grep -oP '(?<=href=")https://adfoc.us/serve/sitelinks/\?id=271228&url=https://maven\.minecraftforge\.net/net/minecraftforge/forge/[^"]*installer\.jar' | sed 's|.*url=||')
elif [ $1 -eq 2 ]; then
    minecraftServer="mohist"
    downloadUrl="https://mohistmc.com/api/v2/projects/mohist/$2/builds/latest/download"
else 
    echo "Error invalid server version"
    exit
fi

if ! test -f /servers/$minecraftServer/versions/$minecraftServer-$2.jar; then
  wget $downloadUrl -O /servers/$minecraftServer/versions/$minecraftServer-$2.jar
elif test -f /servers/$minecraftServer/versions/$minecraftServer-$2.jar; then
  echo "File exists."
else 
    echo "Error to Download"
    exit
fi

/servers/createServer.sh "$minecraftServer" "$3" "$2" "$4"