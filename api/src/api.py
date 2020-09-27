from flask import Flask, jsonify, request, render_template
from flask_cors import CORS, cross_origin

from broadlink_service import discover_devices, learn_command, send_command, delete_command, rename_device

app = Flask(__name__, static_url_path='',
                  static_folder='build',
                  template_folder='build')
CORS(app)

@app.route("/")
def index():
    return render_template("index.html", flask_token="Hello   world")

@app.route('/discover', methods=['POST'])
def discover():
    return jsonify(discover_devices())

@app.route('/learn', methods=['POST'])
def learn():
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_name = req_data['commandName']
    return jsonify(learn_command(ip_address, command_name))

@app.route('/command', methods=['POST'])
def command():
    request.method == 'POST'
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_id = req_data['commandId']
    return jsonify(send_command(ip_address, command_id))

@app.route('/delete', methods=['POST'])
def delete():
    request.method == 'POST'
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_id = req_data['commandId']
    return jsonify(delete_command(ip_address, command_id))

@app.route('/rename', methods=['POST'])
def rename():
    request.method == 'POST'
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    device_name = req_data['deviceName']
    return jsonify(rename_device(ip_address, device_name))


# dev server
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8080)

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
