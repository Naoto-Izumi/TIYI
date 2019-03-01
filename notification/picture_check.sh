#!/bin/bash

# 定数宣言
SLEEP_TIME=3s
prev_picture_name=""
i=0
picture_directory="/root/hackason/TIYI/picture"
program_directory="/root/hackason/TIYI/notification"
old_file=""

# gmailのパスワード入力
read -sp "Password: " pass

# ファイルに更新があるか確認する
while [ $i -lt 5 ]
do
	i=`expr $i + 1`
	latest_file=`ls -t ${picture_directory} | head -1`
	if [ "${latest_file}" != "${old_file}" ]; then
		`python ${program_directory}/notification2slack.py ${picture_directory}/${latest_file}`
		`python ${program_directory}/send_mail.py ${picture_directory}/${latest_file} ${pass}`
		echo diff
		old_file=$latest_file
	fi
    echo $old_file
	sleep $SLEEP_TIME
done
