[![Docker Build Status](https://img.shields.io/docker/pulls/timothystewart6/techno-broadlink.svg)](https://hub.docker.com/r/timothystewart6/techno-broadlink/)

# techno-broadlink

A Docker container for Broadlink devices that hosts a Web API and a UI to send commands locally.

For instructions, please see https://www.youtube.com/watch?v=4MJW29mR-Xc

## Usage

```
docker run \
  -e HOST_IP=your.docker.host.ip \
  -p 10981:10981 \
  -v </path/to/config>:/app/config \
  --network host \
  timothystewart6/techno-broadlink
```

## Credits
Created by Techno Tim with 💛

This would not be possible without [mjg59/python-broadlink](https://github.com/mjg59/python-broadlink) which is used by [Home Assistant](https://www.home-assistant.io/).

🔔 Social Media 🔔

► Twitch https://www.twitch.tv/TechnoTim

► Twitter  https://twitter.com/TechnoTimLive

► Discord https://discord.gg/DJKexrJ

► Instagram https://www.instagram.com/techno.tim/

► Facebook https://www.facebook.com/TechnoTimLive/

► GitHub https://github.com/timothystewart6

