import React, { useRef, useState } from 'react';
import { Keyboard, SafeAreaView, TouchableOpacity, View } from 'react-native';
import { Button, Icon, Input, Text, useTheme } from '@rneui/themed';
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import md5 from 'md5';
import * as yup from 'yup';

import { useStyles } from '@core/theme/overrides'
import { useToast } from 'react-native-toast-notifications';
import { User } from '@core/models/user';
import { loginUser, registerUser } from '@core/services/userService';
import { getCurrentPosition } from '@core/services/geolocationService';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Login: React.FC<any> = (props) => {
    const { theme: { colors } } = useTheme();
    const styles = useStyles();
    const toast = useToast();

    const password = useRef<any>();
    const [isSecure, setIsSecure] = useState(true);
    const [mode, setMode] = useState(true);

    const defaultValues = {
        username: '',
        password: '',
        confirmPassword: '',
    }

    const schema = yup.object().shape({
        username: yup.string().required().trim(),
        password: yup.string().required().trim(),
        confirmPassword: yup.string().trim(),
    });

    const { control, handleSubmit, reset } = useForm({ defaultValues, resolver: yupResolver(schema) })

    const onSubmit = async (data: any) => {
        Keyboard.dismiss();

        const user: User = {
            username: data.username,
            password: data.password,
            hash: md5(data.username)
        }

        if (mode) {
            loginUser(user).then(([title, status])=>{
                toast.show(title, { type: status})
                if (status === 'success') {
                    getCurrentPosition().then((position) => {
                        AsyncStorage.setItem('position', JSON.stringify(position))
                    })
                    props.navigation.replace('App')
                }
            })
        } else {
            if(data.confirmPassword === undefined || data.confirmPassword === '') {
                toast.show('Confirm Password is required', { type: 'warning' })
                return;
            } else if (data.password !== data.confirmPassword) {
                toast.show('Password does not match', { type: 'danger' })
                return;
            }

            registerUser(user).then(([title, status])=>{
                toast.show(title, { type: status})
                if (status === 'success') {
                    changeMode()
                }
            })
        }

    };

    const onError = (errors: any) => {
        toast.show('Fields is required', { type: 'warning' })
    }

    const changeMode = () => {
        if (!mode){
            reset(defaultValues)
        }
        setMode(!mode)
    }


    return (
        <View style={[styles.body]}>
            <SafeAreaView />
            <View style={{ paddingHorizontal: 15, marginTop: 50 }}>
                <View style={[styles.card, {
                    padding: 40,
                    rowGap: 10
                }]}>
                    <View style={[styles.row, { position: 'relative', height: 30, marginBottom: 20 }]}>
                        {
                            !mode &&
                            <Button 
                                type='outline'
                                onPress={changeMode}
                                icon={
                                    <Icon 
                                        name="arrow-left" 
                                        size={24} 
                                        color={colors.primary} 
                                        />
                                }
                            >
                            </Button>
                        }
                        <Text style={[styles.title, { position: 'absolute', left: '28%'}]}>
                            Test App EDT
                        </Text>
                    </View>
                    <Controller
                        control={control}
                        name="username"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                            <Input
                                value={value}
                                placeholder="Username"
                                keyboardType='email-address'
                                returnKeyLabel="next"
                                returnKeyType="next"
                                autoCapitalize='none'
                                autoComplete='off'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value)}
                                onSubmitEditing={() => password.current.focus()}
                            />
                        )}
                    />
                    <Controller
                        control={control}
                        name="password"
                        render={({ field: { onChange, value }, formState: { errors } }) => (
                            <Input
                                ref={password}
                                value={value}
                                placeholder="Password"
                                secureTextEntry={isSecure}
                                returnKeyType="done"
                                autoCapitalize='none'
                                autoComplete='off'
                                autoCorrect={false}
                                onChangeText={(value) => onChange(value)}
                                onSubmitEditing={handleSubmit(onSubmit)}
                                rightIcon={
                                    <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                                        <Icon name={isSecure ? "eye" : "eye-off"} size={24} color={colors.grey0} />
                                    </TouchableOpacity>
                                }
                            />
                        )}
                    />
                    {
                        !mode &&
                        <Controller
                            control={control}
                            name="confirmPassword"
                            render={({ field: { onChange, value }, formState: { errors } }) => (
                                <Input
                                    ref={password}
                                    value={value}
                                    placeholder="Confirm Password"
                                    secureTextEntry={isSecure}
                                    returnKeyType="done"
                                    autoCapitalize='none'
                                    autoComplete='off'
                                    autoCorrect={false}
                                    onChangeText={(value) => onChange(value)}
                                    onSubmitEditing={handleSubmit(onSubmit)}
                                    rightIcon={
                                        <TouchableOpacity onPress={() => setIsSecure(!isSecure)}>
                                            <Icon name={isSecure ? "eye" : "eye-off"} size={24} color={colors.grey0} />
                                        </TouchableOpacity>
                                    }
                                />
                            )}
                        />
                    }
                    <Button
                        title={!mode ? "Sign Up" : "Sign In"}
                        onPress={handleSubmit(onSubmit, onError)}
                    />
                </View>
                {
                    mode &&
                    <View style={[{ marginVertical: 25 }, styles.betweenCenter]}>
                        <Text style={[styles.textCenter]}>Don't have an account?</Text>
                        <Button
                            type='outline'
                            title="sing up"
                            onPress={() => setMode(!mode)}
                        />
                    </View>
                }
            </View>
        </View>
    )
}

export default Login