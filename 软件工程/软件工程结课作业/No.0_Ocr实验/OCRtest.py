'''
Author: your name
Date: 2020-11-02 10:32:08
LastEditTime: 2020-11-02 10:51:35
LastEditors: Please set LastEditors
Description: In User Settings Edit
'''
import pytesseract
from PIL import Image

#tessdata_dir_config = '--tessdata-dir "D://Tesseract//Tesseract-OCR//tessdata"'
image = Image.open('example.png')
#code = pytesseract.image_to_string(image,config=tessdata_dir_config)
code = pytesseract.image_to_string(image,lang='chi_sim')
print(code)