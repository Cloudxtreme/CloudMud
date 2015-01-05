(function(simpletelnet, $, undefined){
	var ST = simpletelnet;

	ST.codes = {};
	var codes = ST.codes;

	codes.SE =    '\xF0'; // 240 Subnegotiation end
	codes.NOP =   '\xF1'; // 241 No operation
	codes.DM =    '\xF2'; // 242 Data mark
	codes.Break = '\xF3'; // 243 Break
	codes.IP =    '\xF4'; // 244 Interrupt process
	codes.AO =    '\xF5'; // 245 Abort output
	codes.AYT =   '\xF6'; // 246 Are you there
	codes.EC =    '\xF7'; // 247 Erase character
	codes.EL =    '\xF8'; // 248 Erase line
	codes.GA =    '\xF9'; // 249 Go ahead
	codes.SB =    '\xFA'; // 250 Subnegotiation begin
	codes.WILL =  '\xFB'; // 251 Will
	codes.WONT =  '\xFC'; // 252 Won't
	codes.DO =    '\xFD'; // 253 Do
	codes.DONT =  '\xFE'; // 254 Don't
	codes.IAC =   '\xFF'; // 255 Interpret as command

	

}(window.simpletelnet = window.simpletelnet || {}, JQuery))
