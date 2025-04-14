import React from 'react'
import { NavigationContainer } from '@react-navigation/native'

import { AppNavigator } from './AppNavigator.tsx'
import { AuthNavigator } from './AuthNavigator.tsx'

export const RootNavigator: React.FC = () => {
  const user = null

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
