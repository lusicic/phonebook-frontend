import ReactDOM from "react-dom";
import App from "./App";
import axios from "axios";

axios.get("http://localhost:3001/persons").then((response) => {
  ReactDOM.render(<App />, document.getElementById("root"));
});
