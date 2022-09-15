import time
from flask import Flask, jsonify
from flask import request
from flask import Response
from datetime import date
import datetime


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

        """         begDate = request.get_json('begDate') """

        print(JSONdata)

        begDateFinal = date.fromisoformat('2020-01-01')

        endDateFinal = date.fromisoformat('2022-01-01')

        start = datetime.datetime(2010, 1, 1)

        end = datetime.datetime(2017, 1, 11)

        tickerOne = request.get_json('tickerOne')

        print(tickerOne)

        d = {'tickerOne': 'AMD', 'begDate': '01-01-2020', 'endDate': '01-01-2022'}

        d2 = {'tickerOne2': 'NEO', 'begDate': '01-01-2020',
              'endDate': '01-01-2022'}

        dfr = pd.DataFrame(d, index=[0])

        dfr2 = pd.DataFrame(d2, index=[0])

        df = web.DataReader('GOOG', 'yahoo',
                            start, end)

        """ df = web.DataReader([tickerOne], 'yahoo',
                            start=[begDateFinal], end=[endDateFinal]) """

        df = df.dropna()

        features = df.loc[:, 'Close'].values.reshape(-1, 1)

        df2 = web.DataReader(['NEO'], 'yahoo',
                             start, end)['Close']

        df2 = df2.dropna()

        dependent_var = df2.loc[:, 'NEO']

        model = LinearRegression()
        model.fit(features, dependent_var)

        print(df)

        print(model)
        return jsonify(rSquare=model.score(features, dependent_var))


""" 
tickerOne = 'G'
begDate = '01-01-2020'
endDate = '09-01-2022'

answer = find_the_score(tickerOne, begDate, endDate) """
