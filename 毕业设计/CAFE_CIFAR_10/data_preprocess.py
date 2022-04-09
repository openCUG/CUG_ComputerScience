#!/usr/bin/python
# -*- coding: utf-8 -*-
"""
@author: Xiao Jin
In this file we load CIFAR-100 data
"""
from config import *
import gc
import pathlib
import random as r
import tensorflow as tf
import os

train_data_dir = 'train/'
test_data_dir = 'test/'
AUTOTUNE = tf.data.experimental.AUTOTUNE

def preprocess_image(image):
    data_image = tf.cast(tf.image.decode_jpeg(image, channels=3), tf.float32)
    # size = data_image.numpy().shape()
    # data_image = tf.image.resize(data_image, [64, 64])
    return data_image


def load_and_preprocess_image(path):
    image = tf.io.read_file(path)
    return preprocess_image(image)


def load_data(data_path):
    '''
    Load data
    '''
    (train_data, train_label), (test_images, test_labels) = tf.keras.datasets.cifar10.load_data()
    
    # train_data = tf.image.resize(train_data,[28,28])
    # test_images = tf.image.resize(test_images,[28,28])
    # train_data = tf.image.rgb_to_grayscale(train_data)
    # test_images = tf.image.rgb_to_grayscale(test_images)

    N_train = train_data.shape[0]
    N_test = test_images.shape[0]

    train_dataset = (
        tf.data.Dataset.from_tensor_slices((train_data, train_label)).batch(N_train)
    )
    test_dataset = (
        tf.data.Dataset.from_tensor_slices((test_images, test_labels)).batch(N_test)
    )
    train_dataset = (
        train_dataset.map(lambda x, y:
                          (tf.divide(tf.cast(x, tf.float32), 255.0),
                           tf.reshape(tf.one_hot(y, 10), (-1, 10))))
    )

    test_dataset = (
        test_dataset.map(lambda x, y:
                         (tf.divide(tf.cast(x, tf.float32), 255.0),
                          tf.reshape(tf.one_hot(y, 10), (-1, 10))))
    )

    train_data, train_label = zip(*train_dataset)
    test_data, test_label = zip(*test_dataset)
    train_data = train_data[0]
    train_label = train_label[0]
    test_data = test_data[0]
    test_label = test_label[0]

    train_datasets = []
    for worker_index in range(4):
        i = worker_index // 2   #一张图分成四张图，分给四个client
        j = worker_index % 2    #将一张 28X28 的图像按左上、右上、左下、右下分割为四张 14X14 图片
        slice = train_data[:, 16 * i: 16 * (i + 1), 16 * j: 16 * (j + 1)]
        train_datasets.append(slice)
    train_datasets.append(train_label)
    train_datasets = tuple(train_datasets)
    train_ds = tf.data.Dataset.from_tensor_slices(train_datasets).batch(data_number)

    test_datasets = []
    for worker_index in range(4):
        i = worker_index // 2
        j = worker_index % 2
        slice = test_data[:, 16 * i: 16 * (i + 1), 16 * j: 16 * (j + 1)]
        test_datasets.append(slice)
    test_datasets.append(test_label)
    test_datasets = tuple(test_datasets)
    test_ds = tf.data.Dataset.from_tensor_slices(test_datasets).batch(data_number)
    return train_ds, test_ds

train_datasets, test_datasets = load_data(train_data_dir)


if __name__ == "__main__":
    train_datasets = load_data(train_data_dir)
    print('Done')