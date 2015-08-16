(function (cloudmud, undefined) {
  cloudmud.WebSocket = function () {

    var that = this;

    this.connected = false;
    this.socket = undefined;


    this.lowerLayer = null;
    this.higherLayer = null;

    this.connect = function (url) {
      that.socket = new WebSocket(url);
      that.socket.binaryType = 'arraybuffer';
      that.connected = true;
      that.socket.onmessage = function (event) {
        var message = "";
        var bufView = new Uint8Array(event.data);
        for (var i = 0; i < bufView.length; i++) {
          message += String.fromCharCode(bufView[i]);
        }
        that.receive(message);
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
      console.log(message);
      var array = message.split('');
      for(var i = 0; i < message.length; i++) {
        array[i] = message.charCodeAt(i);
      }
      var view = new Uint8Array(array);
      console.log(view);
      that.socket.send( view.buffer );
      //that.socket.send( message );
    };

    this.receive = function(message) {
      //console.log('Websocket received: ' + message);
      if (that.higherLayer) {
        that.higherLayer.receive(message);
      }
    };
  }
}(window.cloudmud = window.cloudmud || {}))
