#!/usr/bin/env python

import argparse
import time
import codecs
import json
import os
import broadlink
import base64
import uuid
import sys
from deepmerge import always_merger
from broadlink.exceptions import ReadError, StorageError

TICK = 32.84
TIMEOUT = 10

def format_durations(data):
    result = ''
    for i in range(0, len(data)):
        if len(result) > 0:
            result += ' '
        result += ('+' if i % 2 == 0 else '-') + str(data[i])
    return result

def to_microseconds(bytes):
    result = []
    #  print bytes[0] # 0x26 = 38for IR
    index = 4
    while index < len(bytes):
        chunk = bytes[index]
        index += 1
        if chunk == 0:
            chunk = bytes[index]
            chunk = 256 * chunk + bytes[index + 1]
            index += 2
        result.append(int(round(chunk * TICK)))
        if chunk == 0x0d05:
            break
    return result

def write_json_file(file, data):
    # create folder if it doesn't exist
    os.makedirs(os.path.dirname(file), exist_ok=True)
    with open(file, 'w') as json_file:
        json.dump(data, json_file)
        print('Updated file')

def discover_devices(host_ip):
    broadcast_address = "255.255.255.255"
    if host_ip == 'localhost':
        host_ip=None
    else:
        broadcast_address = host_ip[:host_ip.rfind('.')+1] + '255'
        print(f'broadcast ip is: {broadcast_address}')

    device_list = []
    parser = argparse.ArgumentParser(fromfile_prefix_chars='@')
    parser.add_argument("--timeout", type=int, default=2, help="timeout to wait for receiving discovery responses")
    parser.add_argument("--ip", default=host_ip, help="ip address to use in the discovery")
    parser.add_argument("--dst-ip", default=broadcast_address, help="destination ip address to use in the discovery")
    args = parser.parse_args()
    print(f'args: {args}')
    print("Discovering...")
    devices = broadlink.discover(timeout=args.timeout, local_ip_address=args.ip, discover_ip_address=args.dst_ip)
    print(f'devices {devices}')
    for device in devices:
        print(f'found {devices}')
        if device.auth():
            # devices.append(device)
            temperature = None
            humidity = None
            print("###########################################")
            print(device.type)
            print("# broadlink_cli --type {} --host {} --mac {}".format(hex(device.devtype), device.host[0],
                                                                        ''.join(format(x, '02x') for x in device.mac)))
            print("Device file data (to be used with --device @filename in broadlink_cli) : ")
            try:
                print("sensors = {}".format(device.check_sensors()))
                sensors = device.check_sensors()
                temperature = sensors['temperature']
                humidity = sensors['humidity']
            except (AttributeError, StorageError):
                pass
                print("")

            mac_address = ''.join(format(x, '02x') for x in device.mac)
            my_device = {
                "ip": device.host[0],
                "mac": ':'.join(mac_address[i:i+2] for i in range(0, len(mac_address), 2)),
                "model": device.model,
                "manufacturer": device.manufacturer,
                "commands": [],
                "name": '',
            }
            file_name = mac_address + '.json'
            script_dir = os.path.dirname(__file__)
            file_path = os.path.join(script_dir, './config/')
            file_with_path = file_path + file_name
            if os.path.exists(file_with_path):
                # we need to merge
                # this is so ugly
                print('File exists, need to merge')
                with open(file_with_path) as existing_file:
                    data = json.load(existing_file)
                    if data and data['mac']:
                        # we have a mac address in the file, should be a valid file
                        # merge new data into old
                        my_device = {
                            "ip": device.host[0],
                            "mac": ':'.join(mac_address[i:i+2] for i in range(0, len(mac_address), 2)),
                            "model": device.model,
                            "manufacturer": device.manufacturer,
                            "commands": data['commands'] or [],
                            "name": data['name'] or '',
                            "temperature": temperature,
                            "humidity": humidity
                        }
                        device_list.append(my_device)
                        merged_device = always_merger.merge(data, my_device)
                        unique_commands = []
                        for i in range(len(my_device['commands'])):
                            if my_device['commands'][i] not in my_device['commands'][i + 1:]:
                                unique_commands.append(my_device['commands'][i])
                        merged_device['commands'] = unique_commands
                        write_json_file(file_with_path, merged_device)
                    else:
                        # not a vlid mac, we need to just write data
                        write_json_file(file_with_path, my_device)

            else:
                # just write
                print('File does not exist, creating')
                write_json_file(file_with_path, my_device)
                device_list.append(my_device)
        else:
            print("Error authenticating with device : {}".format(device.host))

    return device_list

def learn_command(ip_address, command_name, host_ip):
    broadcast_address = "255.255.255.255"
    if host_ip == 'localhost':
        host_ip=None
    else:
        broadcast_address = host_ip[:host_ip.rfind('.')+1] + '255'
        print(f'broadcast ip is: {broadcast_address}')

    parser = argparse.ArgumentParser(fromfile_prefix_chars='@')
    parser.add_argument("--timeout", type=int, default=2, help="timeout to wait for receiving discovery responses")
    parser.add_argument("--ip", default=host_ip, help="ip address to use in the discovery")
    parser.add_argument("--dst-ip", default=broadcast_address, help="destination ip address to use in the discovery")
    args = parser.parse_args()
    print("Discovering...")
    devices = broadlink.discover(timeout=args.timeout, local_ip_address=args.ip, discover_ip_address=args.dst_ip)
    for device in devices:
        if device.auth():
            if device.host[0] == ip_address:
                # found a match
                print("###########################################")
                print('Found a match')
                print("# broadlink_cli --type {} --host {} --mac {}".format(hex(device.devtype), device.host[0],
                                                                        ''.join(format(x, '02x') for x in device.mac)))
                device.enter_learning()
                print("Learning...")
                start = time.time()
                while time.time() - start < TIMEOUT:
                    time.sleep(1)
                    try:
                        data = device.check_data()
                    except (ReadError, StorageError):
                        continue
                    else:
                        break
                else:
                    print("No data received...")
                    # TODO handle better
                    return Exception('No data received...')
                    # exit(1)

                learned = format_durations(to_microseconds(bytearray(data)))
                learned = ''.join(format(x, '02x') for x in bytearray(data))
                # if durations \
                # somerthing = ''.join(format(x, '02x') for x in bytearray(data))
                print("###########################################")
                print("Learned!")
                print(learned)

                # we need to find the device and add a command that we just learned
                mac_address = ''.join(format(x, '02x') for x in device.mac)

                file_name = mac_address + '.json'
                script_dir = os.path.dirname(__file__)
                file_path = os.path.join(script_dir, './config/')
                file_with_path = file_path + file_name
                if os.path.exists(file_with_path):
                        # we need to merge
                        print('File exists')
                        with open(file_with_path) as existing_file:
                            data = json.load(existing_file)
                            if data and data['mac']:
                                my_device = {
                                    "ip": device.host[0],
                                    "mac": ':'.join(mac_address[i:i+2] for i in range(0, len(mac_address), 2)),
                                    "model": device.model,
                                    "manufacturer": device.manufacturer,
                                    "commands": [{ "id": str(uuid.uuid4()), "name": command_name, "data": learned }],
                                }
                                # we have a mac address in the file, should be a valid file
                                # merge new data into old
                                merged_device = always_merger.merge(my_device, data)
                                write_json_file(file_with_path, merged_device)
                                return merged_device
                            else:
                                # not a vlid mac, we need to just write data
                                print('Not a valid mac address')
        else:
            print("Error authenticating with device : {}".format(device.host))


def send_command(ip_address, command_id, host_ip):
    broadcast_address = "255.255.255.255"
    if host_ip == 'localhost':
        host_ip=None
    else:
        broadcast_address = host_ip[:host_ip.rfind('.')+1] + '255'
        print(f'broadcast ip is: {broadcast_address}')

    parser = argparse.ArgumentParser(fromfile_prefix_chars='@')
    parser.add_argument("--timeout", type=int, default=2, help="timeout to wait for receiving discovery responses")
    parser.add_argument("--ip", default=host_ip, help="ip address to use in the discovery")
    parser.add_argument("--dst-ip", default=broadcast_address, help="destination ip address to use in the discovery")
    args = parser.parse_args()
    print("Discovering...")
    devices = broadlink.discover(timeout=args.timeout, local_ip_address=args.ip, discover_ip_address=args.dst_ip)
    for device in devices:
        if device.auth():
            if device.host[0] == ip_address:
                # found a match
                print("###########################################")
                print('Found a match')
                print("# broadlink_cli --type {} --host {} --mac {}".format(hex(device.devtype), device.host[0],
                                                                        ''.join(format(x, '02x') for x in device.mac)))
                # we need to find the device and add a command that we just learned
                mac_address = ''.join(format(x, '02x') for x in device.mac)

                file_name = mac_address + '.json'
                script_dir = os.path.dirname(__file__)
                file_path = os.path.join(script_dir, './config/')
                file_with_path = file_path + file_name
                if os.path.exists(file_with_path):
                        # we need to merge
                        print('File exists')
                        with open(file_with_path) as existing_file:
                            data = json.load(existing_file)
                            existing_command = list(filter(lambda x: x['id'] == command_id, data['commands']))
                            if data and data['mac'] and existing_command and existing_command[0] and existing_command[0]['id']:
                                device.send_data(bytearray.fromhex(''.join(existing_command[0]['data'])))
                                print("###########################################")
                                print("command sent!")
                                command_status = {
                                    "success": True,
                                    "command": existing_command
                                }
                                return command_status
                            else:
                                # not a vlid mac, we need to just write data
                                print('No command with that id exists')
                                command_status = {
                                    "success": False,
                                    "commands": existing_command
                                }
                                return command_status

        else:
            print("Error authenticating with device : {}".format(device.host))


def delete_command(ip_address, command_id, host_ip):
    broadcast_address = "255.255.255.255"
    if host_ip == 'localhost':
        host_ip=None
    else:
        broadcast_address = host_ip[:host_ip.rfind('.')+1] + '255'
        print(f'broadcast ip is: {broadcast_address}')
    parser = argparse.ArgumentParser(fromfile_prefix_chars='@')
    parser.add_argument("--timeout", type=int, default=2, help="timeout to wait for receiving discovery responses")
    parser.add_argument("--ip", default=host_ip, help="ip address to use in the discovery")
    parser.add_argument("--dst-ip", default=broadcast_address, help="destination ip address to use in the discovery")
    args = parser.parse_args()
    print("Discovering...")
    devices = broadlink.discover(timeout=args.timeout, local_ip_address=args.ip, discover_ip_address=args.dst_ip)
    for device in devices:
        if device.auth():
            if device.host[0] == ip_address:
                # found a match
                print("###########################################")
                print('Found a match')
                print("# broadlink_cli --type {} --host {} --mac {}".format(hex(device.devtype), device.host[0],
                                                                        ''.join(format(x, '02x') for x in device.mac)))
                mac_address = ''.join(format(x, '02x') for x in device.mac)
                file_name = mac_address + '.json'
                script_dir = os.path.dirname(__file__)
                file_path = os.path.join(script_dir, './config/')
                file_with_path = file_path + file_name
                if os.path.exists(file_with_path):
                    # we can update it
                    print('File exists, need update commands')
                    with open(file_with_path) as existing_file:
                        data = json.load(existing_file)
                        if data and data['mac'] and data['commands'] and data['commands'][0]:
                            # we have some commands
                            remaining_commands = list(filter(lambda x: x['id'] != command_id, data['commands']))

                            updated_device = {
                                "ip": data['ip'],
                                "mac": data['mac'],
                                "model": data['model'],
                                "manufacturer": data['manufacturer'],
                                "commands": remaining_commands,
                                "name": data['name'],
                            }
                            write_json_file(file_with_path, updated_device)
                            return updated_device
        else:
            print("Error authenticating with device : {}".format(device.host))


def rename_device(ip_address, device_name, host_ip):
    broadcast_address = "255.255.255.255"
    if host_ip == 'localhost':
        host_ip=None
    else:
        broadcast_address = host_ip[:host_ip.rfind('.')+1] + '255'
        print(f'broadcast ip is: {broadcast_address}')
    parser = argparse.ArgumentParser(fromfile_prefix_chars='@')
    parser.add_argument("--timeout", type=int, default=2, help="timeout to wait for receiving discovery responses")
    parser.add_argument("--ip", default=host_ip, help="ip address to use in the discovery")
    parser.add_argument("--dst-ip", default=broadcast_address, help="destination ip address to use in the discovery")
    args = parser.parse_args()
    print("Discovering...")
    devices = broadlink.discover(timeout=args.timeout, local_ip_address=args.ip, discover_ip_address=args.dst_ip)
    for device in devices:
        if device.auth():
            if device.host[0] == ip_address:
                # found a match
                print("###########################################")
                print('Found a match')
                print("# broadlink_cli --type {} --host {} --mac {}".format(hex(device.devtype), device.host[0],
                                                                        ''.join(format(x, '02x') for x in device.mac)))
                mac_address = ''.join(format(x, '02x') for x in device.mac)
                file_name = mac_address + '.json'
                script_dir = os.path.dirname(__file__)
                file_path = os.path.join(script_dir, './config/')
                file_with_path = file_path + file_name
                if os.path.exists(file_with_path):
                                # we need to merge
                                print('File exists')
                                with open(file_with_path) as existing_file:
                                    data = json.load(existing_file)
                                    data['name'] = device_name
                                    if data and data['mac']:
                                        write_json_file(file_with_path, data)
                                        return data
                                    else:
                                        # not a vlid mac, we need to just write data
                                        print('Not a valid mac address')
                else:
                    print("Error authenticating with device : {}".format(device.host))
