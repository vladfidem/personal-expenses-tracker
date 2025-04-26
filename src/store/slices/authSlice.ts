import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit'
import { getAuth } from '@react-native-firebase/auth'

interface UserInfo {
  uid: string | null
  email: string | null
}

interface AuthState {
  user: UserInfo | null
  loading: boolean
  error: string | null
}

const initialState: AuthState = {
  user: null,
  loading: false,
  error: null,
}

export const signUp = createAsyncThunk(
  'auth/signUp',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const { user } = await getAuth().createUserWithEmailAndPassword(
        email,
        password,
      )
      return { uid: user.uid, email: user.email }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const signIn = createAsyncThunk(
  'auth/signIn',
  async (
    { email, password }: { email: string; password: string },
    thunkAPI,
  ) => {
    try {
      const { user } = await getAuth().signInWithEmailAndPassword(
        email,
        password,
      )
      return { uid: user.uid, email: user.email }
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message)
    }
  },
)

export const signOutUser = createAsyncThunk('auth/signOut', async () => {
  await getAuth().signOut()
})

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<UserInfo | null>) {
      state.user = action.payload
    },
    clearUser(state) {
      state.user = null
    },
    clearError(state) {
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(signUp.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signUp.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(signUp.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(signIn.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(signIn.fulfilled, (state, action) => {
        state.user = action.payload
        state.loading = false
      })
      .addCase(signIn.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
      .addCase(signOutUser.fulfilled, state => {
        state.user = null
      })
  },
})

export const { setUser, clearUser, clearError } = authSlice.actions
export default authSlice.reducer
