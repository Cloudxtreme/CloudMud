(function (cloudmud, undefined) {
  cloudmud.ProtocolStack = function() {
    var highest_layer = null;
    var lowest_layer = null;

    var that = this;

    this.addProtocol = function (protocol, position, relative) {
      switch (position) {
      case 'TOP':
        if (highest_layer === null) {
          highest_layer = protocol;
          lowest_layer = protcol;
        } else {
          protocol.lowerLayer = highest_layer;
          highest_layer.higherLayer = protocol;
          highest_layer = protocol;
        }
        break;
      case 'BOTTOM':
        if (lowest_layer === null) {
          lowest_layer = protocol;
          highest_layer = protocol;
        } else {
          protocol.higherLayer = lowest_layer;
          lowest_layer.lowerLayer = protocol;
          lowest_layer = protocol;
        }
        break;
      case 'BELLOW':
        protocol.lowerLayer = relative.lowerLayer;
        protocol.higherLayer = relative;
        if (relative.lowerLayer) {
          relative.lowerLayer.higherLayer = protocol;
        }
        relative.lowerLayer = protocol;
        if (lowest_layer === relative) {
          lowest_layer = protocol;
        }
        break;
      case 'ABOVE':
        protocol.lowerLayer = relative;
        protocol.higherLayer = relative.higherLayer;
        if (relative.higherLayer) {
          relative.higherLayer.lowerLayer = protocol;
        }
        relative.higherLayer = protocol;
        if (highest_layer === relative) {
          highest_layer = protocol;
        }
        break;
      }
    }
  }
}(window.cloudmud = window.cloudmud || {}));
