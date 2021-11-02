import { api, bar, foo, num } from "@/env";
import axios from "axios";
import inspect from "object-inspect";
import { compile } from "path-to-regexp";
import { useMemo, useState } from "react";
import useSWR from "swr";
import urlJoin from "url-join";
import "./App.css";
import logo from "./logo.svg";

const emptyUrl = urlJoin(api, "ping");
const paramUrl = urlJoin(api, "ping/:str");

function App() {
  const [str, setStr] = useState("");
  const path = useMemo(
    () => (!str ? emptyUrl : compile(paramUrl)({ str })),
    [str]
  );
  const { data } = useSWR(path, axios);
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <input value={str} onChange={(e) => setStr(e.target.value)} />
        <ul>
          <li>
            {"api: "}
            {inspect(api)}
          </li>
          <li>
            {"data: "}
            {inspect(data?.data?.pong)}
          </li>
          <li>
            {"foo: "}
            {inspect(foo)}
          </li>
          <li>
            {"bar: "}
            {inspect(bar)}
          </li>
          <li>
            {"num: "}
            {inspect(num)}
          </li>
        </ul>
      </header>
    </div>
  );
}

export default App;
