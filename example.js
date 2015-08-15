$(document).ready(function() {
  var protocol_stack = new cloudmud.ProtocolStack();
  var websocket = new cloudmud.WebSocket();
  var telnet = new cloudmud.telnet.Telnet();
  var terminal = new cloudmud.terminal.Terminal();
  var output = new cloudmud.terminal.OutputWindow($('#telnet-output-1'));
  var input = new cloudmud.terminal.InputWindow($('#telnet-input-1'));
  
  protocol_stack.addProtocol(websocket,'BOTTOM');
  protocol_stack.addProtocol(telnet,'ABOVE',websocket);
  protocol_stack.addProtocol(terminal,'TOP');
  
  input.terminal = terminal;
  terminal.output = output;
  terminal.intput = input;
  
  websocket.connect('ws://discworld.starturtle.net:4243');
});