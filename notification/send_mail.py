#!/Usr/bin/env python                                                                                  
# -*- coding: utf-8 -*-  

import sys
import os.path
import datetime
import smtplib

argvs = sys.argv  # コマンドライン引数を格納したリストの取得
argc = len(argvs)

from email import Encoders
from email.MIMEBase import MIMEBase
from email.MIMEMultipart import MIMEMultipart
from email.MIMEText import MIMEText

def create_message(from_addr, to_addr, subject, body, mine, attach_file):
    """
    Mailのメッセージを構築する
    """
    msg = MIMEMultipart()
    msg["Subject"] = subject
    msg["From"] = from_addr
    msg["To"] = to_addr


    body = MIMEText(body)
    msg.attach(body)

    #添付ファイルのMIMEタイプを指定する
    attachment = MIMEBase(mine['type'],mine['subtype'])

    file = open(attach_file['path'])
    attachment.set_payload(file.read())
    file.close()
    Encoders.encode_base64(attachment)
    msg.attach(attachment)
    attachment.add_header("Content-Dispositon","attachment",filename=attach_file['name'])

    return msg

def sendGmail(from_addr, to_addr, msg):
    """
    mailを送信する
    """
    smtp = smtplib.SMTP_SSL(host, port)
    smtp.ehlo()
    smtp.login(username, password)
    smtp.sendmail(from_addr, to_addr, msg.as_string())
    smtp.quit()


if __name__ == '__main__':

    host, port = 'shoin.fam.cx', 465
    username = 'tatsuya'
    password = argvs[2]

    from_addr = "tatsuya@shoin.fam.cx"
    to_addr = "314159.ryu@gmail.com"
    subject = "ファイル添付"
    body = "test body"
    mine={'type':'text','subtype':'comma-separated-values'}

    attach_file={'name':'detect.jpg','path':argvs[1]}
    msg = create_message(from_addr, to_addr, subject, body, mine, attach_file)
    sendGmail(from_addr, to_addr, msg)
