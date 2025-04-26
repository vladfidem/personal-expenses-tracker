import 'react-native-reanimated'
import React from 'react'
import { StatusBar, useColorScheme } from 'react-native'
import { SafeAreaProvider } from 'react-native-safe-area-context'
import { Provider } from 'react-redux'

import { RootNavigator } from './src/navigation/RootNavigator.tsx'
import { store } from './src/store/store'

const App: React.FC = () => {
  const isDarkMode = useColorScheme() === 'dark'

  return (
    <Provider store={store}>
      <SafeAreaProvider>
        <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
        <RootNavigator />
      </SafeAreaProvider>
    </Provider>
  )
}

export default App
