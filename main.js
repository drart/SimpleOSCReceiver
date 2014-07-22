// Use Chrome's system.network API to display local IP to the user
chrome.system.network.getNetworkInterfaces( function(interfaces){
  
  for ( var i = 0 ; i < interfaces.length; i++){
    
    if ( interfaces[i].prefixLength === 24){ // only print the IP4 address
      document.getElementById("list").innerText = interfaces[i].address;
    }
    //console.log(interfaces[i]);  
  }
});

var udpPort = new osc.UDPPort({
    localAddress: "0.0.0.0",
    localPort: 57110
});

udpPort.on("open", function () {
    document.getElementById("message").innerText = "Listening for UDP on port " + udpPort.options.localPort;
});

udpPort.on("message", function(message){
  document.getElementById("message").innerText = message.address + "<br \>" + message.args;
});

udpPort.on("error", function (err) {
    throw new Error(err);
});

udpPort.open();

