import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/";
import { NavLink } from "react-router-dom";
import "../styles/Regression.css";

const Regression = () => {
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");
  const [begDate, setBegDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rSquare, setRSquare] = useState("");
  const [resOne, setRes] = useState("");
  const [err, setErr] = useState("");

  const onChange = (e) => {
    setBegDate(e.target.value);
    setEndDate(e.target.value);
    setTickerOne(e.target.value);
    setTickerTwo(e.target.value);
  };

  //const [body, setBody] = useState('');

  //const [values, handleChange] = UseForm({industry:"", offer_type:"", offer_details:"", price:"10", qualifications:"", user_id:"", buy_offer_id:""});
  //const values = {industry, offer_type, offzer_details, price, qualifications, user_id, buy_offer_id};

  /* const [user_id, setUser_id] = useState('');
   */

  function POST(data) {
    return fetch("/api/regression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => {
        /* setRes(res.text); */
        return res.json();
      })
      .catch((err) => {
        setErr(JSON.stringify(err));
        //Adding this error and then showing below; attempting to catch errors.
        //JSON.stringify(err) is required because React cannot make an object a child, but a string is OK.
        //Problem is if we have an error, the whole cain breaks down, and nothing is rendered. So, still need form val.
        console.log("error");
      })
      .then((data) => {
        setRSquare(data.rSquare);
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    let data = {
      tickerOne: tickerOne,
      tickerTwo: tickerTwo,
      begDate: begDate,
      endDate: endDate,
    };
    console.log("this is data object", data);

    POST(data);
  };

  return (
    <div class="container-Sell">
      <h2 class="Headline">Enter regression variables</h2>
      <br></br>
      <form onSubmit={handleSubmit}>
        <ul class="flex-outer">
          <li>
            <label for="message">Enter ticker symbol one </label>
            <br></br>
            <textarea
              id="form"
              rows="1"
              placeholder="'Enter ticker symbol one"
              input
              class="string"
              name="tickerOne"
              value={tickerOne}
              onChange={(e) => setTickerOne(e.target.value)}
            ></textarea>
          </li>
          <li>
            <label for="message">Enter ticker symbol two </label>
            <br></br>
            <textarea
              id="form"
              rows="1"
              placeholder="'Enter ticker symbol two"
              input
              class="string"
              name="tickerTwo"
              value={tickerTwo}
              onChange={(e) => setTickerTwo(e.target.value)}
            ></textarea>
          </li>
          <li>
            <label for="message">Enter beginning date </label>
            <br></br>
            <DatePicker
              value={begDate}
              selected={begDate}
              onChange={(Date) => setBegDate(Date)}
            />
            {/* <textarea
              id="form"
              rows="1"
              placeholder=""
              input
              class="string"
              name="begDate"
              value={begDate}
              onChange={(e) => setBegDate(e.target.value)}
            ></textarea> */}
          </li>
          <li>
            <label for="message">Enter end date </label>
            <br></br>
            <DatePicker
              value={endDate}
              selected={endDate}
              onChange={(Date) => setEndDate(Date)}
            />
            {/*  <textarea
              id="form"
              rows="1"
              placeholder=""
              input
              class="string"
              name="endDate"
              value={endDate}
              onChange={(e) => setEndDate(e.target.value)}
            ></textarea> */}
          </li>
          <li>
            <label for="message">This is the rSquared: </label>
            {rSquare}
            <label for="message">This is the res: </label>
            {resOne}
            <label for="message">This is the error: </label>
            {err}
          </li>
          <div id="buttons">
            <li>
              <button value="Submit" type="submit">
                Submit
              </button>
              <NavLink to="/">
                <button type="back" id="">
                  Go back
                </button>
              </NavLink>
            </li>
          </div>

          <li></li>
        </ul>
      </form>
    </div>
  );
};

export default Regression;
