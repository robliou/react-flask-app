import React, { Component } from "react";
import { usePromiseTracker } from "react-promise-tracker";
import { LinearProgress } from "@mui/material";

export const LoadingSpinnerComponent = (props) => {
  const { promiseInProgress } = usePromiseTracker();

  return (
    <div>
      {promiseInProgress === true ? <LinearProgress color="secondary" /> : null}
    </div>
  );
};
