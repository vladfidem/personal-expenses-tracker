import React from 'react'
import { Text, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { useNavigation } from '@react-navigation/native'
import { yupResolver } from '@hookform/resolvers/yup'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { signIn } from '../store/slices/authSlice'
import { signInSchema } from '../utils/validation/authSchema'

type FormData = {
  email: string
  password: string
}

export const SignInScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const { loading, error } = useAppSelector(state => state.auth)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signInSchema),
  })

  const onSubmit = (data: FormData) => dispatch(signIn(data))

  return (
    <SafeAreaView>
      <Text>Sign In</Text>

      <Controller
        control={control}
        name="email"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Email"
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.email && <Text>{errors.email.message}</Text>}

      <Controller
        control={control}
        name="password"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Password"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.password && <Text>{errors.password.message}</Text>}

      {error && <Text>{error}</Text>}

      <Button
        title={loading ? 'Loading...' : 'Sign In'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <Text onPress={() => navigation.navigate('SignUp' as never)}>
        Don't have an account? Sign Up
      </Text>
    </SafeAreaView>
  )
}
