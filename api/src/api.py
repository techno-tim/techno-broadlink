import os
import fileinput
import fnmatch

from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin

from broadlink_service import discover_devices, learn_command, send_command, delete_command, rename_device

# this is a workaround for passing the server IP into a client side reactjs app
host_ip =os.environ.get('HOST_IP')
if host_ip:
    print(f'host_ip is {host_ip}')
    print('updating with host ip')
    for root, dirs, files in os.walk("."):
        for file in files:
            if fnmatch.fnmatch(file, 'main.*.js'):
                # print(os.path.join(root, file))
                print(f'updated {file} with {host_ip}')
                with open(os.path.join(root, file)) as r:
                    text = r.read().replace("localhost", host_ip)
                with open(os.path.join(root, file), "w") as w:
                    w.write(text)
else:
    print(f'{host_ip} does not exist')
    print(f'setting host_ip to localhost')
    host_ip='localhost'

app = Flask(__name__, static_url_path='',
                  static_folder='build',
                  template_folder='build')
CORS(app)

@app.route("/")
def index():
    return render_template("index.html", flask_token="Hello   world")

@app.route('/discover', methods=['POST'])
def discover():
    #pylint: disable=too-many-arguments
    return jsonify(discover_devices(host_ip))

@app.route('/learn', methods=['POST'])
def learn():
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_name = req_data['commandName']
    #pylint: disable=too-many-arguments
    return jsonify(learn_command(ip_address, command_name, host_ip))

@app.route('/command', methods=['POST'])
def command():
    request.method == 'POST'
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_id = req_data['commandId']
    #pylint: disable=too-many-arguments
    return jsonify(send_command(ip_address, command_id, host_ip))

@app.route('/delete', methods=['POST'])
def delete():
    request.method == 'POST'
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_id = req_data['commandId']
    #pylint: disable=too-many-arguments
    return jsonify(delete_command(ip_address, command_id, host_ip))

@app.route('/rename', methods=['POST'])
def rename():
    request.method == 'POST'
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    device_name = req_data['deviceName']
    #pylint: disable=too-many-arguments
    return jsonify(rename_device(ip_address, device_name, host_ip))


# dev server
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8080)

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
