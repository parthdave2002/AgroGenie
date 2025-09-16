import { createRoot } from "react-dom/client";
import "./index.css";
import theme from "./flowbite-theme";
import { Flowbite } from "flowbite-react";
import { Provider } from "react-redux";
import { configureStore } from "./Store";
import App from "./App";
import Autologout from "./components/common/autologout/autologout";
import { PersistGate } from "redux-persist/integration/react";

const { store, persistor } = configureStore({});
const container = document.getElementById("root");
if (!container) {
  throw new Error("React root element doesn't exist!");
}

const root = createRoot(container);

root.render(
    <Flowbite theme={{ theme }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <Autologout>
            <App />
          </Autologout>
        </PersistGate>
      </Provider>
    </Flowbite>
);