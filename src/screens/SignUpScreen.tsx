import React from 'react'
import { Text, TextInput, Button } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { useNavigation } from '@react-navigation/native'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import { signUp } from '../store/slices/authSlice'
import { signUpSchema } from '../utils/validation/authSchema'

type FormData = {
  email: string
  password: string
  confirmPassword: string
}

export const SignUpScreen: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigation = useNavigation()
  const { loading, error } = useAppSelector(state => state.auth)
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>({
    resolver: yupResolver(signUpSchema),
  })

  const onSubmit = (data: FormData) =>
    dispatch(signUp({ email: data.email, password: data.password }))

  return (
    <SafeAreaView>
      <Text>Sign Up</Text>

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

      <Controller
        control={control}
        name="confirmPassword"
        render={({ field: { onChange, onBlur, value } }) => (
          <TextInput
            placeholder="Confirm Password"
            secureTextEntry
            onChangeText={onChange}
            onBlur={onBlur}
            value={value}
          />
        )}
      />
      {errors.confirmPassword && <Text>{errors.confirmPassword.message}</Text>}

      {error && <Text>{error}</Text>}

      <Button
        title={loading ? 'Loading...' : 'Sign Up'}
        onPress={handleSubmit(onSubmit)}
        disabled={loading}
      />

      <Text onPress={() => navigation.navigate('SignIn' as never)}>
        Already have an account? Sign In
      </Text>
    </SafeAreaView>
  )
}
