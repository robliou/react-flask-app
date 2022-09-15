import React, { useState } from "react";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/";
import { NavLink } from "react-router-dom";
import "../styles/Regression.css";

import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DateTimePicker from '@mui/lab/DateTimePicker';

import {
  Formik,
  Form,
  Field,
  ErrorMessage,
  useField,
  useFormikContext,
} from "formik";
import { object, string, number, date, InferType } from "yup";
import * as Yup from "yup";

/* const DatePickerField = ({ ...props }) => {
  const { setFieldValue } = useFormikContext();
  const [field] = useField(props);
  return (
    <DatePicker
      {...field}
      {...props}
      selected={(field.value && new Date(field.value)) || null}
      onChange={(val) => {
        setFieldValue(field.name, val);
      }}
    />
  );
}; */

const now = Date();

const [startDateValue, setStartDateValue] = React.useState(tomorrow)

<LocalizationProvider dateAdapter={AdapterDateFns}>
<DateTimePicker
  label="Start Date"
  value={startDateValue}
  onChange={(newValue) => {
  setStartDateValue(newValue);
  }}
  renderInput={(params) => <TextField {...params} sx={{ width: 240 }}/>}
/>

</LocalizationProvider>

const Regression = () => {
  let validationSchema = Yup.object({
    tickerOne: Yup.string().required(),
    tickerTwo: Yup.string(),
    begDate: Yup.date()
      .typeError("Start date is required")
      .required("Start Date is required"),
    endDate: Yup.date()
      .typeError("End date is required")
      .when(
        "begDate",
        (started, yup) =>
          started && yup.min(started, "End date cannot be before start date")
      )
      .required("End Date is required"),
  });

  /*  try{
    await regSchema.validate({ tickerOne: tickerOne, tickerTwo: tickerTwo, begDate: begDate, endDate: endDate });
} catch (err) {
  err.name; // => 'ValidationError'
  err.errors; // => ['Deve ser maior que 18']

}
   */
  /*   const validationSchema = Yup.object().shsape({
    tickerOne: Yup.string()
      .tickerOne("Please enter the first ticker")
      .required("At least one ticker is required"),
    tickerTwo: Yup.string().tickerTwo("Please enter the second ticker"),
    begDate: Yup.date().default(function () {
      return new Date();
    }),
    endDate: Yup.date().default(function () {
      return new Date();
    }),
  }); */

  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");
  const [begDate, setBegDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rSquare, setRSquare] = useState("");


  const handleBegDate = (value) => {
    setBegDate(value)
    setEndDate(value)
  }

  const handleEndDate = (value) => {
    setEndDate(value)
  }

  function POST(data) {
    return fetch("/api/regression", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((data) => {
        setRSquare(data.rSquare);
      });
  }

  const handleSubmit = (
    { tickerOne, tickerTwo, begDate, endDate },
    { setFieldError }
  ) => {
    console.log("Success! Call the API Now!");
    setTimeout(() => {
      setFieldError("tickerOne", "Need to enter at least one ticker");
    }, 1000);

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
      <Formik
        initialValues={{
          begDate: "",
          endDate: "",
          tickerOne: "",
          tickerTwo: "",
          date: "",
        }}
        validate={(begDate, endDate, tickerOne, tickerTwo) => {
          const errors = {};
          if (!tickerOne) {
            errors.tickerOne = "Required";
          } else if (endDate > begDate) {
            errors.dates = "End date must be later than start date";
          }
          return errors;
        }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          setTimeout(() => {
            setSubmitting(false);
            alert(JSON.stringify(values, null, 2));
          }, 500);
          handleSubmit(values);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
        }) => {
          return (
            <Form>
              <label htmlFor="tickerOne">Enter first ticker</label>
              <Field
                id="tickerOne"
                name="tickerOne"
                value={values.tickerOne}
                onChange={handleChange("tickerOne")}
                onBlur={handleBlur("tickerOne")}
              />

              <div>{touched.tickerOne && errors.tickerOne}</div>

              <label htmlFor="tickerTwo">Enter second ticker</label>
              <Field
                id="tickerTwo"
                name="tickerTwo"
                value={values.tickerTwo}
                onChange={handleChange("tickerTwo")}
                onBlur={handleBlur("tickerTwo")}
              />

              <label htmlFor="begDate">Enter beginning date</label>
              <Field
                id="begDate"
                name="begDate"
                component={DatePickerField}
                value={values.begDate}
                onChange={handleChange("begDate")}
                onBlur={handleBlur("begDate")}
              />

              {/*  <DatePickerField
                value={values.begDate}
                selected={begDate}
                onChange={handleChange("begDate")}
                onBlur={handleBlur("begDate")}
                name="begDate"
              /> */}

              <div>{touched.dates && errors.dates}</div>

              <label htmlFor="endDate">Enter ending date</label>

              <Field
                id="endDate"
                name="endDate"
                component={DatePickerField}
                value={values.endDate}
                onChange={handleChange("endDate")}
                onBlur={handleBlur("endDate")}
              />

              {/* <DatePickerField
                value={values.endDate}
                selected={endDate}
                onChange={handleChange("endDate")}
                onBlur={handleBlur("endDate")}
                name="endDate"
              /> */}

              <div>{touched.dates && errors.dates}</div>

              {/* <DatePicker
                value={values.begDate}
                selected={begDate}
                onChange={handleChange("BegDate")}
                onBlur={handleBlur("begDate")}
              />

              <div>{touched.dates && errors.dates}</div>

              <label htmlFor="endDate">Enter ending date</label>
              <DatePicker
                value={values.endDate}
                selected={endDate}
                onChange={handleChange("endDate")}
                onBlur={handleBlur("endDate")}
              />
              <ErrorMessage name="dates" component="div" />

              <div>{touched.dates && errors.dates}</div> */}

              <div id="buttons">
                <button type="submit" disabled={isSubmitting}>
                  Submit
                </button>
                <NavLink to="/">
                  <button type="back" id="">
                    Go back
                  </button>
                </NavLink>
              </div>
              <li>
                <label for="message">This is the rSquared: </label>
                {rSquare}
              </li>
            </Form>
          );
        }}
      </Formik>
    </div>
  );
};

export default Regression;
