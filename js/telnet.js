window.cloudmud = window.cloudmud || {};

(function(telnet, undefined){

	telnet.codes = {
    'SE': '\xF0', // 240 Subnegotiation end
    'NOP': '\xF1', // 241 No operation
    'DM': '\xF2', // 242 Data mark
    'Break': '\xF3', // 243 Break
    'IP': '\xF4', // 244 Interrupt process
    'AO': '\xF5', // 245 Abort output
    'AYT': '\xF6', // 246 Are you there
    'EC': '\xF7', // 247 Erase character
    'EL': '\xF8', // 248 Erase line
    'GA': '\xF9', // 249 Go ahead
    'SB': '\xFA', // 250 Subnegotiation begin
    'WILL': '\xFB', // 251 Will
    'WONT': '\xFC', // 252 Won't
    'DO': '\xFD', // 253 Do
    'DONT': '\xFE', // 254 Don't
    'IAC': '\xFF' // 255 Interpret as command
  };
  
  telnet.options = 
  
  telnet.getCodeByValue = function(value) {
    for(code in telnet.codes) {
      if (codes[code] == value) {
        return code;
      }
    }
    return null;
  };

	telnet.Telnet = function() {
		this.willHandlers = [];
		this.wontHandlers = [];
		this.doHandlers = [];
		this.dontHandlers = [];
		this.sbHandlers = [];

	  var that = this;
    
    this.lowerLayer = null;
    this.higherLayer = null;
    
    this.logger = null;
    
    this.send = function(message) {
      console.log('Telnet Sent:' + message);
      if (that.lowerLayer) {
        that.lowerLayer.send(message);
      }
		};

		this.recieve = function(message) {
      console.log('Telnet Recieved:' + message);
      if (that.higherLayer) {
        that.higherLayer.recieve(message);
      }
		};

		this.defaultWillHandler = function(option) {
			that.send(telnet.codes.IAC + telnet.codes.DONT + option);
		};

		this.defaultWontHandler = function(option) {
			that.send(telnet.codes.IAC + telnet.codes.DONT + option);
    };

		this.defaultDoHandler = function(option) {
			that.send(telnet.codes.IAC + telnet.codes.DONT + option);
		};
    
		this.defaultDontHandler = function(option) {
			that.send(telnet.codes.IAC + telnet.codes.DONT + option);
		};
	};
}(window.cloudmud.telnet = window.cloudmud.telnet || {}))
