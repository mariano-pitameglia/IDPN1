/** @format */

import React from "react";
import Playground from "../components/Playground";
import Name from '../components/Name'
import WindowSize from "../components/WindowSize"

const HomePage = () => {
  return (
    <div>
      <Name/>
      <Playground />
      <WindowSize></WindowSize>
    </div>
  );
};

export default HomePage;
