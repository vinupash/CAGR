import 'react-native-gesture-handler'
import React from 'react'
import Navigations from './src/navigations/Navigations'
import { AuthProvider } from './src/context/AuthContext'

const App = () => {
  return (
    <AuthProvider>
      <Navigations />
    </AuthProvider>
  )
}

export default App;