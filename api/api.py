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


app = Flask(__name__, static_folder='api/build')
app.secret_key = "secKeyy"


class RegForm(FlaskForm):
    tickerOne = StringField('tickerOne', validators=[DataRequired()])
    tickerTwo = StringField('tickerTwo')
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

        print("this is JSONdata", JSONdata)

        start = JSONdata['begDate']

        end = JSONdata['endDate']

        tickerOne = JSONdata['tickerOne']

        tickerTwo = JSONdata['tickerTwo']

        tickerThree = JSONdata['tickerThree']

        tickerFour = JSONdata['tickerFour']

        tickerFive = JSONdata['tickerFive']

        if tickerTwo == "":
            stocks = [tickerOne,  'NEO']

        elif tickerThree == "":
            stocks = [tickerOne, tickerTwo, 'NEO']

        elif tickerFour == "":
            stocks = [tickerOne, tickerTwo, tickerThree, 'NEO']

        elif tickerFive == "":
            stocks = [tickerOne, tickerTwo, tickerThree, tickerFour, 'NEO']

        else:
            stocks = [tickerOne, tickerTwo, tickerThree,
                      tickerFour, tickerFive, 'NEO']

        print("this is ticker one", tickerOne)

        df = web.DataReader(stocks, 'yahoo',
                            start, end)

        df = df.dropna()
        """ drops N/A """

        ls_key = 'Close'
        """ ls_key specifies the column name you want to select from the Excel dataset! """

        cleanData = df[ls_key]

        dataFrame = pd.DataFrame(cleanData)

        print("This is dataFrame", dataFrame)

        features = dataFrame.loc[:, stocks[:-1]]

        """ stocks[:-1] selects all values from array except for last item """

        print('this is features:', features)

        df2 = web.DataReader([stocks[-1]], 'yahoo',
                             start, end)['Close']

        df2 = df2.dropna()

        print("this is df2", df2)

        dependent_var = df2.loc[:, stocks[-1]]

        """ stocks[:-1] selects only last value from array """

        print("this is dependent_var shape:", dependent_var.shape)

        model = LinearRegression()
        model.fit(features, dependent_var)
        print('Score:', model.score(features, dependent_var))

        return jsonify(rSquare=model.score(features, dependent_var))


if __name__ == '__main__':
    app.run()

""" def serve():
    return send_from_directory(app.static_folder, 'index.html') """
"""

answer = find_the_score(tickerOne, begDate, endDate) """
