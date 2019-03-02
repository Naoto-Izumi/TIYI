//`use strict`
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
 function createPicture(pictureName,){
	let  express = require('express');
	let router = express.Router();
	//コマンドラインを利用する為child_processの使用許可
	let spawn = require('child_process').spawn;
	let raspistill = spawn('raspistill', [ '-t','5','-o' , pictureName]);

	module.exports = router;
}


//jpgフォルダを、カレントディレクトリから、任意のフォルダに移動する。
function movePicture(pictureName){

	const exec = require('child_process').exec;
	const command = `sudo mv ${pictureName} ../picture`;
	exec(command,(err,stdot,stderr) =>{
		if(err) {console.log(`${command}\r\n${err}`)};
	});
}

function sleep(time){
	const d1 = new Date();
		while (true) {
			const d2 = new Date();
			if (d2 - d1 > time) {
				break;
		}
	}
}

function main(){
	const currentDateSet =createDate() ;
	const pictureName =getPictureName(currentDateSet.dateForPicture);
	let fs = require("fs");
	createPicture(pictureName);
	sleep(1000);
	movePicture(pictureName);
}

main();








