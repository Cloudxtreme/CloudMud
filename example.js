$(document).ready(function() {
  var protocol_stack = new cloudmud.ProtocolStack();
  var socket = new cloudmud.WebSocket();
  var telnet = new cloudmud.telnet.Telnet();
  var echo = new cloudmud.Echo();
  var terminal = new cloudmud.terminal.Terminal();
  var output = new cloudmud.terminal.OutputWindow($('#telnet-output-1'));
  var input = new cloudmud.terminal.InputWindow($('#telnet-input-1'));

  protocol_stack.addProtocol(socket, 'BOTTOM');
  protocol_stack.addProtocol(telnet, 'ABOVE', socket);
  protocol_stack.addProtocol(echo, 'ABOVE', telnet);
  protocol_stack.addProtocol(terminal, 'TOP');

  input.terminal = terminal;
  terminal.output = output;
  terminal.intput = input;
  telnet.addOption(echo);

  socket.connect('ws://discworld.starturtle.net:4243');
});
