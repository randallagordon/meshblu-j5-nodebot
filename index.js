"use strict";

var five = require("johnny-five");
var skynet = require("skynet");

//var uuid = "1b5c5470-5583-11e4-9800-a3e0cec37746"
//var token = "03oh8d3k5e4br19k9sxqrwjw2ziod2t9"
var uuid = "40af6231-5583-11e4-9f48-19535f670e40";
var token = "vb7kmdfp4mv4pldib5cz3shjlv8l4n29";

// Setup johnny-five nodebot
var board = new five.Board();
var nodebot = null;

board.on("ready", function () {
  nodebot = new five.Nodebot({
    right: 10,
    left: 11
  });
});

// Setup Meshblu/Skynet connection
var conn = skynet.createConnection({
  "uuid": uuid,
  "token": token
});

conn.on("ready", function(data){
  console.log("Ready");

  conn.status(function (data) {
    console.log(data);
  });

  conn.on("message", function(data){
    if (data.gamma) {
      var gamma = ( Math.abs( data.gamma ) > 45 ) ? 90 : data.gamma * 2;
      var beta  = ( Math.abs( data.beta  ) > 45 ) ? 90 : data.beta  * 2;
      nodebot.move( 90 + gamma + beta, 90 - gamma + beta );
    } else {
      console.log(data);
    }
  });

});
