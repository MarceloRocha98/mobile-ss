import React, { useState } from 'react'
import {Alert,View, Text, TouchableOpacity,TextInput,StyleSheet,Image, KeyboardAvoidingView } from 'react-native'
import {useNavigation} from '@react-navigation/native'
import api from '../services/api'
import { Entypo } from '@expo/vector-icons'
import AsyncStorage from '@react-native-community/async-storage';
// npm i @react-native-community/async-storage ( tentar isso se n for o acima)
export default function Signin() {
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
 

    const navigation = useNavigation()
    async function handleSignin() {
            
           
        const Data = {
            email,
            password,
           
        }
        // console.log(Data)
        await api.post('signin', Data)
        .then(async resp => {
            // console.log((resp.data))
            // console.log((resp.data.token))
            api.defaults.headers.common['Authorization'] = `Bearer ${resp.data.token}`
            
            
            await AsyncStorage.multiSet([
                ['@token', toString(resp.data.token)],
                ['@userKey',JSON.stringify(resp.data)]
            ])

           navigation.push('MainTab')
           
        })
            .catch(msg => {
                if (msg.response.data !==undefined) {
                    console.log(msg)
                    Alert.alert(msg.response.data)
                } else {
                    Alert.alert(msg)
                }
            })

    
        // console.log('kk')
        // console.log(email)
        // console.log(password)
    }
   
    
    return (
        <KeyboardAvoidingView style={styles.container}>
        
            <View style={styles.containerLogo}>
                
            <Image
                
                style={styles.logo}
                source={require('../../assets/logotipo.png')}
                />
            </View>
            
            <View style={styles.containerContent}>

            
            <TextInput
                style={styles.btn}
                placeholder='Email'
                autoCorrect={false}
                onChangeText={e=>setEmail(e)}
                
            />
            <TextInput
                style={styles.btn}
                autoCorrect={false}
                secureTextEntry={true}
                placeholder='Senha'
                onChangeText={e=>setPassword(e)}
                
                />

              

            {password !== '' &&
            <TouchableOpacity
            onPress={e=>handleSignin()}
            style={styles.btnSignin}
            >
               
                <Text style={{ fontSize: 23, marginTop:10 }}>
                <Entypo name="login" size={30} style={{marginRight:1}} color="#fff" />
                     </Text>
           </TouchableOpacity>
            } 
            
            {email === '' &&
                <TouchableOpacity
                onPress={e=>navigation.navigate('Signup')}
            style={{
                marginTop: 5,
               
                
        }}
        
        >
            <Text
            style={{fontSize:18,color:"#fff"}}
            >Não tem conta ? Cadastre-se</Text>
                    </TouchableOpacity>
          }
        </View>
           
        </KeyboardAvoidingView>
    )
}



const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    btn: {
        backgroundColor: "#fff",
        width: "90%",
        marginBottom: 15,
        color: "#222",
        fontSize: 17,
        borderRadius: 7,
        padding:10,
    },
    containerLogo: {
        flex: 1,
        justifyContent:"center"
    },
    containerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "90%",
        backgroundColor: "black", 
        // backgroundColor: "#2f426a", 
        borderRadius: 7,
        marginBottom: 1,
        paddingTop:10,
    },
    logo: {
        width: 220,
        height: 58,
        marginBottom:20
    },
    btnSignin: {
        backgroundColor: "#35AAFF",
        width: "90%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        marginBottom:10,
        
    },
})