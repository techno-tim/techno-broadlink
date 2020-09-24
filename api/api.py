from flask import Flask, jsonify, request
from flask_cors import CORS, cross_origin

from broadlink_service import discover_devices, learn_command, send_command, delete_command

app = Flask(__name__)
CORS(app)

@app.route('/discover', methods=['POST'])
def discover():
    return jsonify(discover_devices())

@app.route('/learn', methods=['POST'])
def learn():
    req_data = request.get_json()
    ip_address = req_data['ipAddress']
    command_name = req_data['commandName']
    return jsonify(learn_command(ip_address, command_name))


@app.route('/command', methods=['POST', 'DELETE'])
def command():
    if request.method == 'POST':
        req_data = request.get_json()
        ip_address = req_data['ipAddress']
        command_id = req_data['commandId']
        return jsonify(send_command(ip_address, command_id))
    elif request.method == 'DELETE':
        req_data = request.get_json()
        ip_address = req_data['ipAddress']
        command_id = req_data['commandId']
        return jsonify(delete_command(ip_address, command_id))

# dev server
# if __name__ == '__main__':
#     app.run(host='0.0.0.0', port=8080)

if __name__ == "__main__":
    from waitress import serve
    serve(app, host="0.0.0.0", port=8080)
