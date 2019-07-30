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
  var username = "user1";
  var password = "123ABC";
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
      alert("Success installation username:" + username + ", password: " + password + ", mqttTopic:" + mqttTopic);
    }
  ).catch(
    function(error) {
      var errorString = error.message;
      alert("Error in Initialization: " + errorString);
    }
  );
}

