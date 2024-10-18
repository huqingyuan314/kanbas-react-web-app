import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router";
import TOC from "./TOC";
import Lab2 from "./Lab2";
import Lab3 from "./Lab3";
import Lab4 from "./Lab4";

import store from "./store";
import { Provider } from "react-redux";

export default function Labs() {
  return (
    <Provider store={store}>
    <div>
      <h1>Labs</h1>
      <h3>Qingyuan Hu (SEC 01 Fall 2024)</h3>
      <TOC />
      
      <Routes>
        {/* <Route path="/" element={<Navigate to="Lab1" />} /> */}
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2" element={<Lab2 />} />
        <Route path="Lab3/*" element={<Lab3 />} />
        <Route path="Lab4/*" element={<Lab4 />} />
      </Routes>

      {/* Go to the code repository on my
        <a id="wd-github" href="https://github.com/huqingyuan314/kanbas-react-web-app"> Github </a>
        <br/> */}

    </div>
    </Provider>
  );
}
