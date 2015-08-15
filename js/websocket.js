(function (cloudmud, undefined) {
	cloudmud.WebSocket = function () {
    
    var that = this;
    
		this.connected = false;
		this.socket = undefined;
    
    
    this.lowerLayer = null;
    this.higherLayer = null;
    
		var decoder = new TextDecoder('utf-8');
    
		this.connect = function (url) {
			that.socket = new WebSocket(url);
			that.socket.binaryType = 'arraybuffer';
			that.connected = true;
			that.socket.onmessage = function (event) {
				var message = decoder.decode(new Uint8Array(event.data));
				that.recieve(message);
			}
			that.socket.onerror = function (error) {
				console.log('Websocket Error: ' + error);
			}
			that.socket.onclose = function (event) {
        that.connected = false;
				console.log('Websocket Closed:' + event);
			}
		}
    
    this.send = function(message) {
      that.socket.send(message);
      console.log('Websocket Sent: ' + message);
		};

		this.recieve = function(message) {
      console.log('Websocket Recieved: ' + message);
      if (that.higherLayer) {
        that.higherLayer.recieve(message);
      }
		};
	}
}(window.cloudmud = window.cloudmud || {}))
