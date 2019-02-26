const { WebClient } = require('@slack/client')
const fs = require('fs')

// (1)アクセストークン（環境変数から取得）
const token = "xoxb-559340730898-559297232996-JBSXnk83btqNqvLLjUHHR80Y"

// (2)WebClientインスタンスの生成
const web = new WebClient(token)

// (3)チャンネル名、またはIDの指定
const conversationId = 'raspberrypi'

const option = {
  //attachments: setAttatchment(),
  channels: conversationId,
  initial_comment: createMessage(),
  file: fs.createReadStream('./sss.jpg'),
  filename: 'sss.jpg'
}

// (4)chat.postMessageの実行
web.files.upload(option)
  .then(res => {
    console.log(`${res.file.name}をアップロードしました`, res.file.timestamp)
  })
  .catch(console.error)


function createMessage() {
  let message = `カメラが通過時の映像を撮影しました。\r日時:${createDate()}`;
  return message;
}

function createDate() {
  let date = new Date();
  let format = `YYYY年MM月DD日 HH時MM分SS秒`;
  format = format.replace(/YYYY/, date.getFullYear());
  format = format.replace(/MM/, date.getMonth() + 1);
  format = format.replace(/DD/, date.getDate());
  format = format.replace(/HH/, date.getHours());
  format = format.replace(/MM/, date.getMinutes());
  format = format.replace(/SS/, date.getSeconds());
  return format;
}

function setAttatchment() {
  return [
    {
      "fallback": "最新記事です",
      "color": "#2eb886",
      "text": "Slack APIでbotを作るための解説その3",
      "fields": [
        {
          "title": "1カラム",
          "value": "1カラムのフィールド",
          "short": false
        },
        {
          "title": "2カラム",
          "value": "2カラム左",
          "short": true
        },
        {
          "title": "2カラム",
          "value": "2カラム右",
          "short": true
        }
      ],
      "image_url": "2000-01-01 00.05.31.jpg",
      "thumb_url": "https://www.dkrk-blog.net/images/thumb.jpg",
    }
  ]
}