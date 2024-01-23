import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './';

export const store = configureStore({
    reducer: {
        auth:     authSlice.reducer,
        // calendar: calendarSlice.reducer,
        // doctor:     userSlice.reducer,
        // patient:    patientSlice.reducer
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false
    })
})