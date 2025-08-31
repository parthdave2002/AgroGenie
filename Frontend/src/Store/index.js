import { createStore, applyMiddleware, compose } from "redux";
import createSagaMiddleware from "redux-saga";
import rootReducer from "./reducers";
import rootSaga from "./sagas";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const persistConfig = {
  key: "root", // key to store persist data under
  storage, // default is localStorage
  whitelist: ["Login"], // Specify which reducers to persist
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// export function configureStore(initialState) {

//   const store = createStore(
//     rootReducer,
//       initialState,
//       composeEnhancers(
//           applyMiddleware(...middlewares)
//       ),
//   );
//   sagaMiddleware.run(rootSaga);
//   return store;
// }

export function configureStore(initialState) {
  const store = createStore(
    persistedReducer, // Use persisted reducer
    initialState,
    composeEnhancers(applyMiddleware(...middlewares))
  );
  sagaMiddleware.run(rootSaga);

  const persistor = persistStore(store); 
  return { store, persistor };
}