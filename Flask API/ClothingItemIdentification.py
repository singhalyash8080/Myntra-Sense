# -*- coding: utf-8 -*-
"""Myntra api 1.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1bjpIb68jxks1Mwtx0u9AS0RbS8vfw-U3
"""

!pip install flask-ngrok

import tensorflow as tf
from tensorflow import keras
import numpy as np
import matplotlib.pyplot as plt
from PIL import Image
import requests
import cv2
from flask import Flask, jsonify, request
from flask_ngrok import run_with_ngrok
from keras.preprocessing.image import img_to_array
from io import BytesIO
import base64

model = keras.models.load_model('/content/drive/MyDrive/projects/model.h5')

app = Flask(__name__)
run_with_ngrok(app)

@app.route("/", methods=["POST"])
def home():
  data = request.json
  img = data["image"]
  # img = Image.open(requests.get(url, stream=True).raw)
  img = Image.open(BytesIO(base64.b64decode(img)))
  img = img.resize((28,28))
  img = img_to_array(img)
  img = img[:,:,0]
  img = img.reshape(1, 28, 28, 1)
  img = img.astype('float32') / 255.0
  predict = model.predict(img)
  classes = ['T-shirt','Trouser','T-shirt','Dress','Blazer','Shoes','Shirt','Bag','Shoes','Shoes']
  predict[0][0] = predict[0][0] + predict[0][2]
  predict[0][2] = 0
  predict[0][5] = predict[0][8] + predict[0][9] + predict[0][5]
  predict[0][8] = 0
  predict[0][9] = 0
  print(predict)
  return str(classes[np.argmax(predict[0])])

app.run()
