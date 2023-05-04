import { configureStore } from "@reduxjs/toolkit";

import reducer from "../reducers/reducer";

const store = configureStore({
  reducer: {
    data: reducer.state,
  },
});

export default store;
