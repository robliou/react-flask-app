import React, { useState } from "react";
import DatePickerField from "./DatePickerField";
import CustomInput from "./CustomInput";

import "react-datepicker/dist/react-datepicker.css";
import "react-datepicker/dist/";
import "../styles/Regression.css";

import { Grid, Button, Container, LinearProgress } from "@mui/material";
import { TextField } from "formik-mui";

import { Formik, Form, Field } from "formik";
import * as yup from "yup";

import { trackPromise } from "react-promise-tracker";

import { LoadingSpinnerComponent } from "./LoadingSpinnerComponent";

const regressionSchema = yup.object().shape({
  tickerOne: yup.string().required(),
  tickerTwo: yup.string().nullable().notRequired(),
  tickerThree: yup.string(),
  tickerFour: yup.string(),
  tickerFive: yup.string(),
  begDate: yup
    .date()
    .nullable()
    .typeError("Start date is required")
    .required("Start Date is required"),

  endDate: yup
    .date()
    .nullable()
    .when(
      "begDate",
      (begDate, yup) =>
        begDate && yup.min(begDate, "End date cannot be before start time")
    )
    .required("End Date is required")
    .typeError("Enter a value End date"),
});

const Regression = () => {
  const [tickerOne, setTickerOne] = useState("");
  const [tickerTwo, setTickerTwo] = useState("");
  const [begDate, setBegDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [rSquare, setRSquare] = useState("");
  const [err, setErr] = useState("");

  function POST(data) {
    trackPromise(
      fetch("/api/regression", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .catch((err) => {
          setErr(JSON.stringify(err));
          alert(
            "Error: You have entered parameters that are invalid. Please ensure that your tickers are correct, and that dates selected are valid for the life of the asset and try again."
          );
          //Adding this error and then showing below; attempting to catch errors.
          //JSON.stringify(err) is required because React cannot make an object a child, but a string is OK.
          //Problem is if we have an error, the whole cain breaks down, and nothing is rendered. So, still need form val.
          window.location.reload();
        })
        .then((data) => {
          setRSquare(data.rSquare);
        })
    );
  }

  const onSubmit = async (values, actions) => {
    handleSubmit(values);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    actions.resetForm();
  };

  const handleSubmit = ({
    tickerOne,
    tickerTwo,
    tickerThree,
    tickerFour,
    tickerFive,
    begDate,
    endDate,
  }) => {
    let data = {
      tickerOne: tickerOne,
      tickerTwo: tickerTwo,
      tickerThree: tickerThree,
      tickerFour: tickerFour,
      tickerFive: tickerFive,
      begDate: begDate,
      endDate: endDate,
    };
    console.log("this is data object", data);

    POST(data);
  };

  /*   const LoadingIndicator = (props) => {
    const { promiseInProgress } = usePromiseTracker();

    return promiseInProgress && <h1>Hey some async call in progress ! </h1>;
  };
 */

  return (
    <div class="container-Sell">
      {/*       <h2 class="Headline">Enter regression variables</h2>
       */}{" "}
      <br></br>
      <Formik
        initialValues={{
          begDate: "",
          endDate: "",
          tickerOne: "",
          tickerTwo: "",
          tickerThree: "",
          tickerFour: "",
          tickerFive: "",
          date: "",
        }}
        validationSchema={regressionSchema}
        onSubmit={onSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          isSubmitting,
          resetForm,
        }) => (
          <Form>
            {isSubmitting && <div>Submitting, please be patient...</div>}
            <Container
              id="regContainer"
              style={{ background: "#1a202c" }}
              maxWidth="sm"
            >
              <Grid container spacing={3} direction="column">
                <Grid item xs={12} align="center">
                  <h1>Yahoo! Finance - Multiple Regression Engine</h1>
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="tickerOne">Enter ticker #1 (required) </label>
                  <CustomInput
                    id="tickerOne"
                    name="tickerOne"
                    value={values.tickerOne}
                    onChange={handleChange("tickerOne")}
                    /*                   onBlur={handleBlur("tickerOne")}
                     */
                  />
                  <div>{errors.tickerOne}</div>
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="tickerTwo">Enter ticker #2 (optional) </label>
                  <Field
                    id="tickerTwo"
                    name="tickerTwo"
                    value={values.tickerTwo}
                    onChange={handleChange("tickerTwo")}
                    /*                   onBlur={handleBlur("tickerTwo")}
                     */
                  />
                  <div>{touched.tickerTwo && errors.tickerTwo}</div>
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="tickerThree">
                    Enter ticker #3 (optional){" "}
                  </label>
                  <Field
                    id="tickerThree"
                    name="tickerThree"
                    value={values.tickerThree}
                    onChange={handleChange("tickerThree")}
                    /*                   onBlur={handleBlur("tickerTwo")}
                     */
                  />
                  <div>{touched.tickerThree && errors.tickerThree}</div>
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="tickerFour">
                    Enter ticker #4 (optional){" "}
                  </label>
                  <Field
                    id="tickerFour"
                    name="tickerFour"
                    value={values.tickerFour}
                    onChange={handleChange("tickerFour")}
                    /*                   onBlur={handleBlur("tickerTwo")}
                     */
                  />
                  <div>{touched.tickerFour && errors.tickerFour}</div>
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="tickerFive">
                    Enter ticker #5 (optional){" "}
                  </label>
                  <Field
                    id="tickerFive"
                    name="tickerFive"
                    label="tickerFive"
                    value={values.tickerFive}
                    onChange={handleChange("tickerFive")}
                  />
                  <div>{touched.tickerFive && errors.tickerFive}</div>
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="begDate">Enter beginning date</label>
                  <br></br>
                  <DatePickerField
                    value={values.begDate}
                    name="begDate"
                    label="begDate"
                    selected={begDate}
                    onChange={handleChange("begDate")}
                    /*                   onBlur={handleBlur("begDate")}
                     */
                  />
                  {touched.begDate && errors.begDate && (
                    <div>{errors.begDate}</div>
                  )}
                </Grid>

                <Grid item xs={6} align="center">
                  <label htmlFor="endDate">Enter ending date</label>
                  <DatePickerField
                    value={values.endDate}
                    name="endDate"
                    label="endDate"
                    selected={endDate}
                    onChange={handleChange("endDate")}
                    /*                   onBlur={handleBlur("endDate")}
                     */
                  />
                  {touched.endDate && errors.endDate && (
                    <div>{errors.endDate}</div>
                  )}
                </Grid>
                <Grid item xs={6} align="center">
                  <label htmlFor="message">This is the rSquared: </label>
                  <LoadingSpinnerComponent />

                  <h2>{rSquare}</h2>
                </Grid>

                <Grid item xs={12} align="center">
                  <div id="buttons">
                    <Button type="submit" variant="contained" color="primary">
                      Submit
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </Container>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Regression;
