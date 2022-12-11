# flake8: noqa
import broadlink as blk

d = blk.hello("192.168.0.98")  # Device IP address.
print(d)
d.hello()
devices = blk.discover(timeout=10, local_ip_address="192.168.0.150")

for device in devices:
    print(f'device.enter_learning: {device.enter_learning}')
    if device.auth():
        device.enter_learning()
