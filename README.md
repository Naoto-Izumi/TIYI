# IoT Web Hackason in Tokyo **team F**

## システム名称
* 未定

## 目的
* 認知症等による徘徊をいち早く検知し、家族/介護師に知らせる

## システム構成
* Raspberry Pi 3 model B+
  * OS : CHIRIMEN for Raspberry Pi 3
* Web Camera
* レーザセンサ
* 圧力センサ(仮)
  * 圧力センサを使うと決まったわけではないので仮。

## フォルダ構成
TIYI/  
　├ go_out_detection/  
　├ notification/  
　├ picture/  
　└ pressure_sensor/  

### 各フォルダの説明
* go_out_detection
  * 外出を検知するシステムを置くフォルダ
* notification
  * 通知系のシステムを置くフォルダ
* picture
  * go_out_detectionで検知した際に撮影した写真を置くフォルダ
* pressure_sensor
  * 圧力センサを扱うシステムを置くフォルダ

## pictureフォルダに関する指定
* ファイル名
  * YYYYMMDD_HHmmss.jpg
  * 拡張子は、扱うカメラによって変わるため仮。
  * example
    * 20190201_193158.jpg
    * 2019年2月1日 19時31分58秒に撮影した写真を表す

## 通知系について
* 人体を検知して写真を撮影すると、その写真とともに事前に設定していたユーザに通知を行う
  * mustはslack。wantでLINEやメール。

