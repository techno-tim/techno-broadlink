# techno-broadlink

A Docker container for Broadlink devices that hosts a Web API and a UI to send commands locally.

# Usage

```
docker run \
  -p 8080:8080 \
  -v </path/to/config>:/app/config \
  --network host \
  timothystewart6/techno-broadlink
```