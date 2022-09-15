import time
from flask import Flask, jsonify
from flask import request
from flask import Response


from sklearn.linear_model import LinearRegression
import pandas_datareader.data as web

import requests
import pandas as pd
import matplotlib.pyplot as plt
import numpy as np
import pandas_datareader as pdr

from flask_wtf import FlaskForm

from wtforms import StringField, SubmitField

from wtforms.validators import DataRequired


app = Flask(__name__, static_folder='../build', static_url_path='/')
app.secret_key = "secKeyy"


class RegForm(FlaskForm):
    tickerOne = StringField('tickerOne', validators=[DataRequired()])
    begDate = StringField('begDate',  validators=[DataRequired()])
    endDate = StringField('endDate', validators=[DataRequired()])


@app.errorhandler(404)
def not_found(e):
    return app.send_static_file('index.html')


@app.route('/')
def index():
    return app.send_static_file('index.html')


@app.route('/api/time')
def get_current_time():
    return {'time': time.time()}


@app.route('/api/regression', methods=["GET", "POST"])
def find_the_score():
    """ reg_form = RegForm() """

    if request.method == 'POST':

        JSONdata = request.get_json()

        print(JSONdata)

        begDate = JSONdata

        endDate = JSONdata

        tickerOne = JSONdata

        return jsonify(tickerOne=tickerOne, endDate=endDate, begDate=begDate)

        """ print('beginning date is' + begDate)

        print('end date is' + endDate)

        print('ticker symbole is' + tickerOne)

        df = web.DataReader([tickerOne], 'yahoo',
                            start=begDate, end=endDate)['Close']
        df = df.dropna()

        features = df.loc[:, tickerOne].values.reshape(-1, 1)

        df2 = web.DataReader(['NEO'], 'yahoo',
                             start=begDate, end=endDate)['Close']

        df2 = df2.dropna()

        dependent_var = df2.loc[:, 'NEO']

        model = LinearRegression()
        model.fit(features, dependent_var)

        if RegForm.validate_on_submit():
            print(df)

            print(model)
            return jsonify(rSquare=model.score(features, dependent_var)) """


""" 
tickerOne = 'G'
begDate = '01-01-2020'
endDate = '09-01-2022'

answer = find_the_score(tickerOne, begDate, endDate) """
