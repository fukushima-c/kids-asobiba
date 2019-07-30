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
	var user = KiiUser.userWithUsername(username, password);
	user.register().then(
		function(theUser) {
			alert("Succeeded");
		}
	).catch(
		function(error) {
			var errorString = error.message;
			alert("Error: " + errorString);
		}
	);
}

