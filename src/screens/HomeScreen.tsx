import React from 'react'
import { Button, Text } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { useAppDispatch } from '../store/hooks.ts'
import { signOutUser } from '../store/slices/authSlice.ts'

export const HomeScreen: React.FC = () => {
  const dispatch = useAppDispatch()

  return (
    <SafeAreaView>
      <Text>Home Screen</Text>
      <Button title="Sign Out" onPress={() => dispatch(signOutUser())} />
    </SafeAreaView>
  )
}
