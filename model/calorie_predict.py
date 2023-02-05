import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns
from sklearn.model_selection import train_test_split
from sklearn import metrics 
from sklearn.pipeline import  make_pipeline
import pickle 

calories = pd.read_csv('calories.csv')
exercise_data = pd.read_csv('exercise.csv') 

calories_data = pd.concat([exercise_data, calories['Calories']], axis=1) 
calories_data.to_csv('calories_data.csv')
# print(calories_data.head()) 
# print(calories_data.isnull().sum())

sns.set() 
correlation = calories_data.corr(numeric_only=True)
calories_data.replace({"Gender":{'male':0,'female':1}}, inplace=True) 
# print(calories_data.head()) 
X = calories_data.drop(columns=['User_ID','Calories'], axis=1)
Y = calories_data['Calories'] 
X_train, X_test, Y_train, Y_test = train_test_split(X, Y, test_size=0.2, random_state=2) 

from sklearn.svm import SVR
model = SVR(kernel='rbf')
model.fit(X_train, Y_train)

# model = XGBRegressor(tree_method="gpu_hist", enable_categorical=True) 
# model.fit(X_train, Y_train) 

test_data_prediction = model.predict(X_test) 
# print(test_data_prediction) 

# from sklearn.metrics import r2_score
# print(r2_score(test_data_prediction,Y_test)) 


pickle.dump(model, open('calories2.pkl', 'wb'))



