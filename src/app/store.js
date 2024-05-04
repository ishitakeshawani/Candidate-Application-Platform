import { configureStore } from '@reduxjs/toolkit'
import { jobReducer } from '../features/jobSlice'

export default configureStore({
  reducer: {
    jobs:jobReducer //added jobReducer in store
  },
})