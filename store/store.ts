import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import languageReducer from "./language";

const store = configureStore({
  reducer: {
    //gives error because language.value is a map, just ignore
    language: languageReducer,
  },
  // middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});

export default store;

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
