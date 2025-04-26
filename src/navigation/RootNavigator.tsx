import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { getAuth } from '@react-native-firebase/auth'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { clearUser, setUser } from '../store/slices/authSlice'

import { AppNavigator } from './AppNavigator'
import { AuthNavigator } from './AuthNavigator'

export const RootNavigator: React.FC = () => {
  const dispatch = useAppDispatch()
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    return getAuth().onAuthStateChanged(user => {
      if (user) {
        dispatch(setUser({ uid: user.uid, email: user.email }))
      } else {
        dispatch(clearUser())
      }
      setIsLoading(false)
    })
  }, [dispatch])

  const user = useAppSelector(state => state.auth.user)

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator size="large" color="#000" />
      </View>
    )
  }

  return (
    <NavigationContainer>
      {user ? <AppNavigator /> : <AuthNavigator />}
    </NavigationContainer>
  )
}
