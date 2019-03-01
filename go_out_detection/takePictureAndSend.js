//日付を作成する。
//写真のjpgフォルダ名用とSlackメッセージ用を作成する。
function createDate() {
		let date = new Date();
		let dateSet = {
		 	dateForPicture : getDateForPicture(date),
			dateForSlack : getDateFormatForSlack(date)
		};
		return dateSet;
	
		  function getDateForPicture(date) {
					let format = `YYYYMMDD_HHMMSS`;
					format = format.replace(/YYYY/, date.getFullYear());
					format = format.replace(/MM/, date.getMonth() + 1);
					format = format.replace(/DD/, date.getDate());
					format = format.replace(/HH/, date.getHours());
					format = format.replace(/MM/, date.getMinutes());
					format = format.replace(/SS/, date.getSeconds());
				  return format;
		}
		
		function getDateFormatForSlack(date){
			let format = `YYYY年MM月DD日 HH時MM分SS秒`;
			format = format.replace(/YYYY/, date.getFullYear());
			format = format.replace(/MM/, date.getMonth() + 1);
			format = format.replace(/DD/, date.getDate());
			format = format.replace(/HH/, date.getHours());
			format = format.replace(/MM/, date.getMinutes());
			format = format.replace(/SS/, date.getSeconds());
		    return format;
		}
}

//写真のjpgフォルダ名作成
function getPictureName(dateString){
	return `${dateString}.jpg`;
}

//写真を撮影する。
//jpgフォルダは、カレントディレクトリに作成する。
function takePicture(pictureName){
		let  express = require('express');
		let router = express.Router();
		
		//コマンドラインを利用する為child_processの使用許可
		let spawn = require('child_process').spawn;
		let raspistill = spawn('raspistill', [ '-t','10','-o' , pictureName]);
		module.exports = router;
}

//Slackにメッセージと写真を送信する。
function sendReportToSlack(currentDate,pictureName){
	const { WebClient } = require('@slack/client')
	const fs = require('fs')

	// (1)アクセストークン（環境変数から取得）
	const token = "xoxb-559340730898-559297232996-tcK7OeaEgjWK9wx758NCUxPS"

	// (2)WebClientインスタンスの生成
	const web = new WebClient(token)

	const option ={
		channels: 'raspberrypi',
		initial_comment: createMessage(currentDate),
		file: fs.createReadStream(`${pictureName}`),
		filename: `${pictureName}.jpg`
	}

	// (4)chat.postMessageの実行
	web.files.upload(option)
	  .then(res => {
		console.log(`${res.file.name}をアップロードしました`, res.file.timestamp)
	  }).catch(console.error)  

	function createMessage(currentDate) {
		let message = `カメラが通過時の映像を撮影しました。\r日時:${currentDate}`;
		return message;
	}
}

//jpgフォルダを、カレントディレクトリから、任意のフォルダに移動する。
function movePicture(pictureName){
	const exec = require('child_process').exec;
	exec(`mv ${pictureName} ../picture`,(err,stdot,stderr) =>{
	if(err) {console.log(err)};
});
}

const currentDateSet =createDate() ;
const pictureName =getPictureName(currentDateSet.dateForPicture);
takePicture(pictureName);
sendReportToSlack(currentDateSet.dateForSlack,pictureName);
movePicture(pictureName);









