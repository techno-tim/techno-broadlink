[![Docker Build Status](https://img.shields.io/docker/pulls/timothystewart6/techno-broadlink.svg)](https://hub.docker.com/r/timothystewart6/techno-broadlink/) [![Build Status](https://img.shields.io/endpoint.svg?url=https%3A%2F%2Factions-badge.atrox.dev%2Ftechno-tim%2Ftechno-broadlink%2Fbadge%3Fref%3Dmastter&style=flat)](https://actions-badge.atrox.dev/techno-tim/techno-broadlink/goto?ref=mastter)

# techno-broadlink

A Docker container for Broadlink devices that hosts a Web API and a UI to send commands locally.

# Usage

```
docker run \
  -e HOST_IP=your.docker.host.ip \
  -p 10981:10981 \
  -v </path/to/config>:/app/config \
  --network host \
  timothystewart6/techno-broadlink
```
