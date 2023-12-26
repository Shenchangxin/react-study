import {AnyAction, configureStore, Reducer} from "@reduxjs/toolkit";
import usersReducer, {UsersState} from './modules/users';
import type {PersistPartial} from 'redux-persist/es/persistReducer'
import {
    persistStore,
    persistReducer,
    // FLUSH,
    // REHYDRATE,
    // PAUSE,
    // PERSIST,
    // PURGE,
    // REGISTER,
}from 'redux-persist'
import storage from 'redux-persist/lib/storage'
import {useDispatch} from "react-redux";

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    whitelist: ['token']
}

const store = configureStore({
    reducer: {
        users: persistReducer(persistConfig,usersReducer) as Reducer<UsersState &
        PersistPartial,AnyAction>
    },
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            // serializableCheck: {
            //     ignoredActions: [FLUSH,  REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            // }
            serializableCheck: false
        })
})
persistStore(store)

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch: ()=> AppDispatch = useDispatch
export default store;








