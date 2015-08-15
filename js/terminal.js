window.cloudmud = window.cloudmud || {};

(function(terminal, $, undefined) {

  terminal.Terminal = function () {
    var that = this;

    this.output = null;
    this.input = null;

    this.lower_layer = null;
    this.higher_layer = null;

    this.send = function(message) {
      if (that.lowerLayer) {
        that.lowerLayer.send(message);
      }
		};

		this.receive = function(message) {
      if (that.output) {
        that.output.output(message);
      }
		};

    this.input = function(message) {
      this.send(message);
    }
  }

	terminal.OutputWindow = function(element) {
    this.terminal = null;
		this.element = element;

		this.output = function(message) {
			$(this.element).append(message);
      $(this.element).scrollTop($(this.element)[0].scrollHeight);
		}
	}

	terminal.InputWindow = function(element) {
	  var that = this;

    this.terminal = null;

		this.element = element;

		$(this.element).keydown(function(e){
			console.log('Input key pressed: ' + e.keyCode);
			// If enter is pressed without shift then send the message
			if(e.keyCode == 13 && !e.shiftKey) {
        console.log(that);
        var message = $(that.element).val();
        console.log('Terminal Input:' + message);
				if (that.terminal) {
          that.terminal.input(message + '\r\n');
        }
        $(that.element).val('');
        that.terminal.output.output(message + '\n');
				e.stopPropagation();
			}
		});
	}
}(window.cloudmud.terminal = window.cloudmud.terminal || {}, jQuery));
