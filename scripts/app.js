// ボタンの要素を取得
var cbtn = document.getElementById("culcbtn");
var clrb = document.getElementById("clrbtn");
var objdia = document.getElementById('screeninchInput');
var objwd = document.getElementById('widthpixInput');
var objht = document.getElementById('heightpixInput');

// 計算ボタンをクリックした時の処理
cbtn.addEventListener("click", function(e) {
 
    e.preventDefault();

	var diainch = objdia.value;
	var wdpix = objwd.value;
	var htpix = objht.value;
    var diacm = diainch * 25.4;
	var tanA = wdpix/htpix;
	// 横cm = 対角mm × tanθ / √( 1+tan^2 θ )
	// 縦cm = 対角mm × 1 / √( 1+tan^2 θ )
	var wdcm = diacm * tanA/Math.sqrt(1+Math.pow(tanA, 2));
	var htcm = diacm * 1/Math.sqrt(1+Math.pow(tanA, 2));
//	alert(tanA);
	document.getElementById('diagonal').textContent = diacm.toFixed(1) + " mm";
	document.getElementById('widthcm').textContent =  wdcm.toFixed(1) + " mm";
	document.getElementById('heightcm').textContent = htcm.toFixed(1) + " mm";
 
});

clrb.addEventListener("click", function(e) {
 
    e.preventDefault();

	objdia.value = 0;
	objwd.value = 0;
	objht.value = 0;
	document.getElementById('diagonal').textContent = "";
	document.getElementById('widthcm').textContent =  "";
	document.getElementById('heightcm').textContent = "";
});

function rdchange() {
  //ラジオボタンオブジェクトを取得する
	let sizestr = "";
	const radios = document.rdform.rdgroup;
 
  //取得したラジオボタンオブジェクトから選択されたものを探し出す
	for (let i = 0; i < radios.length; i++){
		if(radios[i].checked == true){
			sizestr = radios[i].value;
			break;
		}
	}

	switch(sizestr) {
		case "HD":  objdia.value = 0;
					objwd.value = 1920;
        			objht.value = 1080;
        			break;
 		case "forK":objdia.value = 0;
 					objwd.value = 3840;
        			objht.value = 2160;
        			break;
  		case "ip8": objdia.value = 4.7;
        			objwd.value = 750;
        			objht.value = 1334;
        			break;
  		case "ip8P": objdia.value = 5.5;
        			objwd.value = 1080;
        			objht.value = 1920;
        			break;
  		case "ip8X": objdia.value = 5.8;
        			objwd.value = 1125;
        			objht.value = 2436;
        			break;
  		case "ipad3": objdia.value = 9.7;
        			objwd.value = 1536;
        			objht.value = 2048;
        			break;
      	default:	// sizestr == "none"
      				objdia.value = 0;
        			objwd.value = 0;
        			objht.value = 0;
	}
	document.getElementById('diagonal').textContent = "";
	document.getElementById('widthcm').textContent =  "";
	document.getElementById('heightcm').textContent = "";
}

	//プッシュ通信受信承認
Notification.requestPermission(function(status) {
	console.log('Notification permission requested:', status);
});