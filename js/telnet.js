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

  telnet.getCodeByValue = function(value) {
    for(code in telnet.codes) {
      if (codes[code] == value) {
        return code;
      }
    }
    return null;
  };

  telnet.Telnet = function() {
    this.options = {};

    var that = this;

    this.lowerLayer = null;
    this.higherLayer = null;

    this.logger = null;

    this.send = function(message) {
      if (that.lowerLayer) {
        that.lowerLayer.send(message);
      }
    };

    this.receive = function(message) {
      var output = "";
      var option = null;
      var suboption = null;
      for (var i = 0; i < message.length; i++) {
        if(message.charAt(i) == telnet.codes.IAC) {
          i++;
          if(i < message.length) {
            switch(message.charAt(i)) {
            case telnet.codes.WILL:
              i++;
              if(i < message.length) {
                that.receiveWill(message.charAt(i));
              }
              break;
            case telnet.codes.WONT:
              i++;
              if(i < message.length) {
                that.receiveWont(message.charAt(i));
              }
              break;
            case telnet.codes.DO:
              i++;
              if(i < message.length) {
                that.receiveDo(message.charAt(i));
              }
              break;
            case telnet.codes.DONT:
              i++;
              if(i < message.length) {
                that.receiveDont(message.charAt(i));
              }
              break;
            case telnet.codes.SB:
              i++;
              if(i < message.length) {
                option = message.charAt(i);
              }
              i++;
              while(true) {
                if(i >= message.length) {
                  break;
                }
                if(message.charAt(i) == telnet.codes.SE) {
                  that.receiveSuboption(option, subobtion);
                  break;
                } else {
                  suboption += message.charAt(i);
                  i++;
                  continue;
                }
              }
            case telnet.codes.GA:
              break;
            }
          }
        } else {
          output += message.charAt(i);
          //console.log('Output: ' + output);
        }
      }

      if (that.higherLayer) {
        that.higherLayer.receive(output);
      }
    };

    this.defaultWillHandler = function(option) {
      console.log('Sent DONT ' + option.charCodeAt(0));
      that.send(telnet.codes.IAC + telnet.codes.DONT + option);
    };

    this.defaultWontHandler = function(option) {
      console.log('Sent DONT ' + option.charCodeAt(0));
      that.send(telnet.codes.IAC + telnet.codes.DONT + option);
    };

    this.defaultDoHandler = function(option) {
      console.log('Sent WONT ' + option.charCodeAt(0));
      that.send(telnet.codes.IAC + telnet.codes.WONT + option);
    };

    this.defaultDontHandler = function(option) {
      console.log('Sent WONT ' + option.charCodeAt(0));
      that.send(telnet.codes.IAC + telnet.codes.WONT + option);
    };

    this.defaultSuboptionHandler = function(option, suboption) {
      return;
    }

    this.receiveWill = function(option) {
      //console.log('Recieved will:' + option.charCodeAt(0));
      if(that.options[option]) {
        console.log('Recieved WILL ' + that.options[option].codeString);
        that.options[option].willHandler(option);
      } else {
        console.log('Recieved WILL ' + option.charCodeAt(0));
        that.defaultWillHandler(option);
      }
    }

    this.receiveWont = function(option) {
      if(that.options[option]) {
        console.log('Recieved WONT ' + that.options[option].codeString);
        that.options[option].wontHandler(option);
      } else {
        console.log('Recieved WONT ' + option.charCodeAt(0));
        that.defaultWontHandler(option);
      }
    }

    this.receiveDo = function(option) {
      if(that.options[option]) {
        console.log('Recieved DO ' + that.options[option].codeString);
        that.options[option].doHandler(option);
      } else {
        console.log('Recieved DO ' + option.charCodeAt(0));
        that.defaultDoHandler(option);
      }
    }

    this.receiveDont = function(option) {
      if(that.options[option]) {
        console.log('Recieved DONT ' + that.options[option].codeString);
        that.options[option].dontHandler(option);
      } else {
        console.log('Recieved DONT ' + option.charCodeAt(0));
        that.defaultDontHandler(option);
      }
    }

    this.receiveSuboption = function(option, suboption) {
      if(that.options[option]) {
        console.log('Recieved SB ' + that.options[option].codeString);
        that.options[option].suboptionHandler(option, suboption);
      } else {
        console.log('Recieved SB ' + option.charCodeAt(0));
        that.defaultSuboptionHandler(option, suboption);
      }
    }

    this.sendDo = function(option) {
      if(that.options[option]) {
        console.log('Sending DO ' + that.options[option].codeString);
      } else {
        console.log('Sending DO ' + option.charCodeAt(0));
      }
      this.send(telnet.codes.IAC + telnet.codes.DO + option);
    }

    this.sendDont = function(option) {
      if(that.options[option]) {
        console.log('Sending DONT ' + that.options[option].codeString);
      } else {
        console.log('Sending DONT ' + option.charCodeAt(0));
      }
      this.send(telnet.codes.IAC + telnet.codes.DONT + option);
    }

    this.sendWill = function(option) {
      this.send(telnet.codes.IAC + telnet.codes.WILL + option);
    }

    this.sendWont = function(option) {
      this.send(telnet.codes.IAC + telnet.codes.WONT + option);
    }

    this.sendSuboption = function(option, suboption) {
      this.send(telnet.codes.IAC + telnet.codes.SB +
        option + suboption + telnet.codes.SE);
    }

    this.addOption = function(plugin) {
      this.options[plugin.code] = plugin;
      plugin.telnet = this;
    }

    this.removeOption = function(plugin) {
      this.options[plugin.code] = null;
      plugin.telnet = null;
    }
  };
}(window.cloudmud.telnet = window.cloudmud.telnet || {}))
