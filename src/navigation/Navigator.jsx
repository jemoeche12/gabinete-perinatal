import { StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AuthStackNavigator from './AuthStackNavigator';
import { useDispatch, useSelector } from 'react-redux';
import { useDB } from '../hooks/useDB';
import { setUser } from '../features/user/UserSlice';
import RootStackNavigator from './RootStackNavigator';






const Navigator = () => {
    const { user } = useSelector(state => state.auth.value)
    const { getSession } = useDB()
    const dispatch = useDispatch()
    useEffect(() => {
        (async () => {
            try {
                const response = await getSession()
                if (response) {
                    const user = response;
                    dispatch(setUser({
                        email: user.email,
                        localId: user.localId,
                        idToken: user.token
                    }))
                }
            } catch (error) {
                alert(error)
            }
        })()
    }, [user])
    return (
        <NavigationContainer>
            {user ? <RootStackNavigator /> : <AuthStackNavigator />}
        </NavigationContainer>

    )
}

export default Navigator

const styles = StyleSheet.create({})
