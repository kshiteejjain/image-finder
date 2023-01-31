import { configureStore } from '@reduxjs/toolkit';
import usersReducers from '../features/Form/FormSlice';
import profilePicReducer from '../features/ProfilePic/ProfilePicSlice';

export const store = configureStore({
  reducer: {
    users : usersReducers,
    imageList: profilePicReducer
  },
});
