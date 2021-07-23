import { firebaseReducer, firestoreReducer } from 'react-redux-firebase'
import { combineReducers } from 'redux'
import { dataReducer } from './dataReducer'
import { visualReducer } from './visualReducer'



export const rootReducer = combineReducers({
   data: dataReducer,
   firebase: firebaseReducer,
   firestore: firestoreReducer,
   view: visualReducer
})
