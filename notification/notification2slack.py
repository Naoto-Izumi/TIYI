# -*- coding: utf-8 -*-

import sys
import requests
import os
import subprocess

argvs = sys.argv  # コマンドライン引数を格納したリストの取得
argc = len(argvs)

my_file = {
  'file' : (argvs[1], open(argvs[1], 'rb'), 'jpg')
}

payload={
  "filename":"example.jpg", 
  "token":os.environ['HACKASON_TOKEN'], 
  "channels":['#hackathon'], 
}

r = requests.post("https://slack.com/api/files.upload", params=payload, files=my_file)
print(r.text)
text = {
	"token":os.environ['HACKASON_TOKEN'],
	"channel":"CG36QU63F",
	"text":"外出を検知しました",
}
r = requests.post("https://slack.com/api/chat.postMessage", params=text)
print(r.text)
