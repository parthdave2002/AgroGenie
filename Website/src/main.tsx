import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.js'
import { configureStore } from "./Store";
import { PersistGate } from "redux-persist/integration/react";
import 'react-lazy-load-image-component/src/effects/blur.css';
import 'react-toastify/dist/ReactToastify.css';
import { Provider } from "react-redux";
import './i18n'; 
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';

const { store, persistor } = configureStore({});

createRoot(document.getElementById('root')!).render(
  <StrictMode>
       <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
         </PersistGate>
      </Provider>
  </StrictMode>,
)
