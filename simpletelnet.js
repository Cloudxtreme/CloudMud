(function(simpletelnet, $, undefined){
	var ST = simpletelnet;

	ST.codes = {};
	ST.rcodes = {};
	var codes = ST.codes;
	var rcodes = ST.rcodes;

	var addCode = function(name, code) {
		codes[name] = code;
		rcodes[code] = name;
	}

	addCode('SE', '\xF0'); // 240 Subnegotiation end
	addCode('NOP', '\xF1'); // 241 No operation
	addCode('DM', '\xF2'); // 242 Data mark
	addCode('Break', '\xF3'); // 243 Break
	addCode('IP', '\xF4'); // 244 Interrupt process
	addCode('AO', '\xF5'); // 245 Abort output
	addCode('AYT', '\xF6'); // 246 Are you there
	addCode('EC', '\xF7'); // 247 Erase character
	addCode('EL', '\xF8'); // 248 Erase line
	addCode('GA', '\xF9'); // 249 Go ahead
	addCode('SB', '\xFA'); // 250 Subnegotiation begin
	addCode('WILL', '\xFB'); // 251 Will
	addCode('WONT', '\xFC'); // 252 Won't
	addCode('DO', '\xFD'); // 253 Do
	addCode('DONT', '\xFE'); // 254 Don't
	addCode('IAC', '\xFF'); // 255 Interpret as command

	simpletelnet.SimpleTelnet = function() {
		this.willHandlers = [];
		this.wontHandlers = [];
		this.doHandlers = [];
		this.dontHandlers = [];
		this.sbHandlers = [];

		this.connected = false;
		this.socket = undefined;

		this.outputWindow = undefined;

		var encoder = new TextEncoder('utf-8');
		var decoder = new TextDecoder('utf-8');

		this.connect = function(url) {
			this.socket = new WebSocket(url);
			this.socket.binaryType = 'arraybuffer';
			this.connected = true;
			var telnet = this;
			this.socket.onmessage = function(event) {
				var message = decoder.decode(new Uint8Array(event.data));
				telnet.recieve(message);
			}
			this.socket.onerror = function(error) {
				console.log('Websocket Error: ' + error)
			}
		}

		this.defaultWillHandler = function(code) {
			this.send(codes.IAC + codes.DONT + code);
		};

		this.defaultWontHandler = this.defaultWillHandler;

		this.defaultDoHandler = function(code) {
			this.send(codes.IAC + codes.DONT + code);
		}

		this.defaultDontHandler = this.defaultDoHandler;

		this.send = function(message) {
			this.outputWindow.output('\n>' + message);
			this.socket.send(new ArrayBuffer(encoder.encode(message)));
		}

		this.recieve = function(message) {
			console.log(message.replace(/(\xff)/, '<span class="debug">$1</span>'));
			this.outputWindow.output(message);
		}

		this.process = function(message) {
			return message;
		}
	}

	simpletelnet.OutputWindow = function(element) {
		this.element = element;

		this.output = function(message) {
			$(this.element).append(message);
		}
	}

	simpletelnet.InputWindow = function(element, handler) {
		this.element = element;

		this.oninput = handler;

		this.element.keypress(function(event){
			console.log('Input key pressed: ' + event.keyCode);
			// If enter is pressed without shift then send the message
			if(event.keyCode = 13 && !event.shiftKey) {
				this.oninput(this.innerHTML);
				event.stopPropagation();
			}
		});
	}





}(window.simpletelnet = window.simpletelnet || {}, jQuery))
