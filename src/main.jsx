import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.scss";

window.__MEDIASTACK_API_KEY = "your_real_key"; // temporary local-only key for testing

createRoot(document.getElementById("root")).render(<App />);
