/* import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import * as usersApi from '../api/v1/users'

export interface TUser {
  id: number
  email: string
  authentication_token?: string
  nickname?: string
  username?: string
  bio?: string
  profile_image?: string
  background_image?: string
}

interface IAuthContextProps {
  user: TUser
  loading: boolean
  error: string
  message: string
  updateUserCache: (user: any) => void
  signIn: (email: string, password: string) => void
  signUp: (email: string, password: string, confirmPassword: string) => void
  signOut: () => void
  forgotPassword: (email: string) => void
  resetPassword: (
    password: string,
    confirmPassword: string,
    resetPasswordToken: string
  ) => void
  confirmEmail: (confirmationToken: string) => void
  resendConfirmation: (email: string) => void
  changePassword: ({
    oldPassword,
    newPassword,
    newPasswordConfirmation,
    authentication_token,
  }: {
    oldPassword: string
    newPassword: string
    newPasswordConfirmation: string
    authentication_token: string
  }) => void
}

const AuthContext = createContext<IAuthContextProps>({} as IAuthContextProps)

export const AuthProvider = ({ children }: any) => {
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [message, setMessage] = useState(null)
  const [loading, setLoading] = useState(false)
  const [loadingInitial, setLoadingInitial] = useState(true)


  useEffect(() => {
    setMessage(null)
    setError(null)
  }, [location.pathname])

  useEffect(() => {
    const timer = setTimeout(() => {
      setMessage(null)
      setError(null)
    }, 3000)
    return () => clearTimeout(timer)
  }, [loading])

  const updateUserCache = (_user: any) => {
    setUser({ ...user, ..._user })
  }

  // Get initial values
  useEffect(() => {
    const userString = localStorage.getItem('user')
    if (userString) {
      try {
        const user = JSON.parse(userString)

        // Check if the auth token is valid
        if (user.hasOwnProperty('authentication_token')) {
          usersApi
            .validate(user)
            .then((resp) => {
              if (!resp.errors) {
                updateUserCache({ ...user, ...resp })
              } else throw new Error('Invalid token')
            })
            .catch(() => {
              setUser(undefined)
              setLoadingInitial(false)
            })
            .finally(() => setLoadingInitial(false))
        } else {
          throw new Error('Cannot found token')
        }
      } catch (e) {
        setUser(undefined)
        setLoadingInitial(false)
      }
    } else {
      setLoadingInitial(false)
    }
  }, [])

  useEffect(() => {
    if (user !== undefined) {
      localStorage.setItem('user', JSON.stringify(user))
    } else {
      localStorage.removeItem('user')
    }
  }, [user])

  useEffect(() => {
    if (error) setError(null)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.pathname])

  const signIn = (email: any, password: any) => {
    setLoading(true)

    usersApi
      .signIn({ email, password })
      .then((resp) => {
        if (resp.authentication_token && resp.email) {
          updateUserCache(resp)
        } else {
          throw new Error(resp.message)
        }
      })
      .catch((e) => {
        setError(e.message)
      })
      .finally(() => setLoading(false))
  }

  function signOut() {
    setLoading(true)

    usersApi
      .signOut(user)
      .then(() => {
        setUser(undefined)
        history.push('/')
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  function signUp(email: any, password: any, confirmPassword: any) {
    setLoading(true)

    usersApi
      .signUp({ email, password, confirmPassword })
      .then((resp) => {
        if (resp.message) {
          throw new Error(resp.message)
        } else {
          setUser(user)
          setError(null)
          setMessage('Please check your email for confirmation instruction')
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  function forgotPassword(email) {
    setLoading(true)

    usersApi
      .forgotPassword(email)
      .then(() => {
        setMessage('Please check your email for password reset instruction')
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  function resetPassword(password, confirmPassword, resetPasswordToken) {
    setLoading(true)

    usersApi
      .resetPassword({ password, confirmPassword, resetPasswordToken })
      .then((resp) => {
        if (resp.message) {
          throw new Error(resp.message)
        } else {
          setMessage(
            'You have changed your password succesfully, redirecting to login page...'
          )

          history.push('/account/login')
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  function confirmEmail(confirmationToken) {
    setLoading(true)

    usersApi
      .confirmEmail(confirmationToken)
      .then(() => {
        setMessage('Email is confirmed.')
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  function resendConfirmation(email) {
    setLoading(true)

    usersApi
      .resendConfirmation(email)
      .then(() => {
        setMessage('Please check your email for confirmation instruction.')
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  function changePassword({
    oldPassword,
    newPassword,
    newPasswordConfirmation,
    authentication_token,
  }) {
    setLoading(true)

    usersApi
      .changePassword({
        oldPassword,
        newPassword,
        newPasswordConfirmation,
        authentication_token,
      })
      .then((resp) => {
        if (resp.message) {
          throw new Error(resp.message)
        } else {
          setUser(user)
          setError(null)
          setMessage('Password is updated')
        }
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false))
  }

  const memoedValue = useMemo(
    () => ({
      user,
      loading,
      error,
      message,
      updateUserCache,
      signIn,
      signUp,
      signOut,
      forgotPassword,
      resetPassword,
      confirmEmail,
      resendConfirmation,
      changePassword,
    }),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [user, loading, error, message]
  )

  return (
    <AuthContext.Provider value={memoedValue}>
      {!loadingInitial && children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
 */