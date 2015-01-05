
$(document).ready(function() {

    telnet = new simpletelnet.SimpleTelnet();
    output = new simpletelnet.OutputWindow($('#telnet-output-1'));
    telnet.outputWindow = output;
    telnet.connect('ws://discworld.starturtle.net:4243');

    input = new simpletelnet.InputWindow($('telnet-input-1'), telnet.input);

    $('#wrapper').css('height', $(window).height());

    $(window).resize(function() {
        $('#wrapper').css('height', $(window).height());
    });

});
