# -*- coding: utf-8 -*-
"""Myntra api 2.ipynb

Automatically generated by Colaboratory.

Original file is located at
    https://colab.research.google.com/drive/1jmImDj-6z7fn0Xu3Y8WkRqaNj8zLZiX4
"""

!pip install flask-ngrok

from sklearn.cluster import KMeans
import matplotlib.pyplot as plt
import numpy as np
import cv2
from collections import Counter
from skimage.color import rgb2lab, deltaE_cie76
from PIL import Image
import requests
import cv2
from flask import Flask, jsonify, request
from flask_ngrok import run_with_ngrok
from keras.preprocessing.image import img_to_array
from json import JSONEncoder
import json
from io import BytesIO
import base64

app = Flask(__name__)
run_with_ngrok(app)

@app.route("/", methods=["POST"])
def home():
  data = request.json
  img = data["image"]
  # img = Image.open(requests.get(url, stream=True).raw)
  img = Image.open(BytesIO(base64.b64decode(img)))
  img = np.array(img)
  img = cv2.cvtColor(img, cv2.COLOR_BGR2RGB)
  colors = get_colors(img,3)

  return str(colors)

def RGB2HEX(color):
  return "#{:02x}{:02x}{:02x}".format(int(color[0]), int(color[1]), int(color[2]))

def get_colors(img, number_of_colors):
    
  modified_img = cv2.resize(img, (600, 400), interpolation = cv2.INTER_AREA)
  modified_img = modified_img.reshape(modified_img.shape[0]*modified_img.shape[1], 3)
  
  clf = KMeans(n_clusters = number_of_colors)
  labels = clf.fit_predict(modified_img)
  
  counts = Counter(labels)
  counts = dict(sorted(counts.items()))
  center_colors = clf.cluster_centers_
  ordered_colors = [center_colors[i] for i in counts.keys()]
  hex_colors = [RGB2HEX(ordered_colors[i]) for i in counts.keys()]
  rgb_colors = [ordered_colors[i][::-1] for i in counts.keys()]
  rgb_colors = np.ceil(list(rgb_colors))
  values = list(counts.values())
  dic = {'rgb':rgb_colors, 'values': values}
  return json.dumps(dic,cls=NumpyArrayEncoder)

class NumpyArrayEncoder(JSONEncoder):
    def default(self, obj):
        if isinstance(obj, np.ndarray):
            return obj.tolist()
        return JSONEncoder.default(self, obj)

app.run()

