# techno-broadlink

A Docker container for Broadlink devices that hosts a Web API and a UI to send commands locally.

# Usage

```
docker run \
  -e HOST_IP=your.docker.host.ip \
  -p 9098:9098 \
  -v </path/to/config>:/app/config \
  --network host \
  timothystewart6/techno-broadlink
```
