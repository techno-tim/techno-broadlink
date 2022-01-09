[![Docker Build Status](https://img.shields.io/docker/pulls/timothystewart6/techno-broadlink.svg)](https://hub.docker.com/r/timothystewart6/techno-broadlink/)

# techno-broadlink

A Docker container for BroadLink devices that hosts an HTTP Web API and a UI to send commands to devices on your local network.

For instructions, please see https://www.youtube.com/watch?v=4MJW29mR-Xc

## Device Support

I have tested this with an RM3 and RM4.  In theory, all devices listed [here](https://github.com/mjg59/python-broadlink/blob/master/broadlink/__init__.py) should work.

## Usage

```
docker run \
  -e HOST_IP=your.docker.host.ip \
  -p 10981:10981 \
  -v </path/to/config>:/app/config \
  --network host \
  timothystewart6/techno-broadlink
```

The Docker image is [here](https://hub.docker.com/repository/docker/timothystewart6/techno-broadlink)

## Web UI

The web UI will be hosted on port `10981`.

![alt text](https://github.com/techno-tim/techno-broadlink/blob/master/techno-broadlink.jpg?raw=true)

## Web API

The web API will be hosted on port `10981`.  I included a Postman collection [here](https://github.com/techno-tim/techno-broadlink/tree/master/postman)



## Credits
Created by Techno Tim with 💛

This would not be possible without [mjg59/python-broadlink](https://github.com/mjg59/python-broadlink) which is used by [Home Assistant](https://www.home-assistant.io/).

🔔 Social Media 🔔

► YouTube https://www.youtube.com/channel/UCOk-gHyjcWZNj3Br4oxwh0A

► Twitch https://www.twitch.tv/TechnoTim

► Twitter  https://twitter.com/TechnoTimLive

► Discord https://l.technotim.live/discord

► Instagram https://www.instagram.com/techno.tim/

► Facebook https://www.facebook.com/TechnoTimLive/

► GitHub https://github.com/timothystewart6

