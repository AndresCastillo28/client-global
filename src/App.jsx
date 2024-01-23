import { Provider } from "react-redux";
import "./App.css";
import { store } from "./store";
import { BrowserRouter } from "react-router-dom";
import { AppRouter } from "./router/AppRouter";

export const App = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRouter />
      </BrowserRouter>
    </Provider>
  );
};
