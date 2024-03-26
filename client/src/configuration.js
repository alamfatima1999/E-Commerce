// require("dotenv").config();

// import { Config } from "@testing-library/react";

export const getBaseUrl = () => {
  // console.log(`${process.env.REACT_APP_BASE_URL}`);
  return process.env.REACT_APP_BASE_URL || "http://localhost:3005";
};
