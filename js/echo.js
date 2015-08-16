(function(cloudmud, undefined) {
  cloudmud.Echo = function() {
    var that = this;

    this.code = '\x01';
    this.codeString = 'ECHO';

    var WILL = false;
    var DO = false;

    this.localEcho = true;

    this.higherLayer = null;
    this.lowLayer = null;

    this.telnet = null;

    this.receive = function (message) {
      if (this.higherLayer) {
        this.higherLayer.receive(message);
      }
    }

    this.send = function (message) {
      if (this.localEcho && !DO && this.higherLayer) {
        this.higherLayer.receive('<span class="echo">' + message + '</span>');
      }
      if (this.lowerLayer) {
        this.lowerLayer.send(message);
      }
    }

    this.doHandler = function(option) {
      if(option == this.code && !WILL && this.telnet) {
        WILL = true;
        this.telnet.sendWill(option);
      }
    }

    this.dontHandler = function(option) {
      if(option == this.code && WILL && this.telnet) {
        WILL = false;
        this.telnet.sendWont(option);
      }
    }

    this.willHandler = function(option) {
      if(option == this.code && !DO && this.telnet) {
        DO = true;
        this.telnet.sendDo(option);
      }
    }

    this.wontHandler = function(option) {
      if(option == this.code && DO && this.telnet) {
        DO = false;
        this.telnet.sendDont(option);
      }
    }
  }
}(window.cloudmud = window.cloudmud || {}));
