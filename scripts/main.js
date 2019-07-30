//　通信ダミー
var serif = new Array();
serif[1] = "こんにちは！";
serif[2] = "おはよっ！";
serif[3] = "たのしい？";
serif[4] = "おなかへってる？";
serif[5] = "暑くない？";
serif[6] = "じゃあねー";
serif[7] = "タップしたよ";

//ランダムにダミー通信を表示
function msg() {
	var a = Math.floor(Math.random() * 6);
	$(".fukidashi").text(serif[a + 1]);
}


function execute() {
  var username = "user2";
  var password = "456DEF";
  KiiUser.authenticate(username, password).then(
    function(theUser) {
      var development = false;
      return KiiUser.getCurrentUser().pushInstallation().installMqtt(development);
    }
  ).then(
    function(response) {
      var installationID = response.installationID;
      return KiiUser.getCurrentUser().pushInstallation().getMqttEndpoint(installationID);
    }
  ).then(
    function(response) {
      var username = response.username;
      var password = response.password;
      var mqttTopic = response.mqttTopic;

      var endpoint = "wss://" + response.host + ":" + response.portWSS + "/mqtt";
      var clientId = mqttTopic;
      var client = new Paho.MQTT.Client(endpoint, clientId);

      client.onConnectionLost = onConnectionLost;
      client.onMessageArrived = onMessageArrived;

      client.connect({onSuccess:onConnect,
        userName:username,
        password:password,
      });

      function onConnect() {
        console.log("MQTT Connected");
        client.subscribe(mqttTopic);
      }

      function onConnectionLost(responseObject) {
        if (responseObject.errorCode !== 0) {
            alert("MQTT Connection Lost:" + responseObject.errorMessage);
        }
      }

      function onMessageArrived(message) {
        if (message.destinationName === mqttTopic) {
          var payload = JSON.parse(message.payloadString);
          var myMessage = payload.mymessage;
          alert("Message Arrived:" + myMessage);
        }
      }
    }
  ).catch(
    function(error) {
      var errorString = error.message;
      alert("Error in Initialization: " + errorString);
    }
  );
}

