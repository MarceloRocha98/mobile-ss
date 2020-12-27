import React, { useState } from 'react'
import {Alert,KeyboardAvoidingView, View, Text, StyleSheet, TextInput, TouchableOpacity,Image, Button } from 'react-native'
import {AntDesign } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import api from '../services/api'
export default function Signup() {
    const [name,setName]=useState(null)
    const [sobrenome,setSobrenome]=useState(null)
    const [email,setEmail]=useState(null)
    const [password,setPassword]=useState(null)
    const [confirmPassword,setConfirmPassword]=useState(null)
    const [estado, setEstado] = useState('SP')
    const [stage, setStage] = useState(0)
    
    const navigation=useNavigation()


    async function handleRegister() {
        const data = {
            name,
            sobrenome,
            email,
            password,
            confirmPassword,
            location:estado,
        }
        try {
            
            await api.post('signup', data)
            .then(e => 
                
                Alert.alert('Cadastrado com sucesso')
                )
                navigation.push('Signin')
            
            }catch (msg) {
         //   console.log(msg.response.data)
            setStage(0)
            Alert.alert(msg.response.data)
        
       
        }
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

                {stage === 0 && 
                    <View style={styles.containerContent}> 
                    
            <TextInput
                 autoCorrect={false}
                 onChangeText={e=>setName(e)}
                 style={styles.btn}
                 placeholder='Nome'
                 />
            <TextInput
                 autoCorrect={false}
                 onChangeText={e=>setSobrenome(e)}
                 style={styles.btn}
                 placeholder='Sobrenome'
                    />
                    
                 </View>
                
                }

                {stage === 1 && <View style={styles.containerContent}>
                
                
                <TextInput
                 autoCorrect={false}
                  onChangeText={e=>setEmail(e)}
                style={styles.btn}
                  placeholder='Email válido'
            />

                </View>}

                {stage === 2 && <View style={styles.containerContent}>
                
            
            <TextInput
                 autoCorrect={false}
                onChangeText={e=>setPassword(e)}
                style={styles.btn}
                secureTextEntry={true}
            placeholder='Senha'
            />
            <TextInput
                 autoCorrect={false}
                onChangeText={e=>setConfirmPassword(e)}
                style={styles.btn}
                secureTextEntry={true}
            placeholder='Confirme a senha'
            />

                    <TouchableOpacity
                    style={styles.btnSignin}
                        onPress={e => {
                            handleRegister()
                        }}
            // style={{alignSelf:"center",marginTop:20}}
            >
                <Text  style={{fontSize:18,color:"#fff"}}>Cadastrar</Text>
                </TouchableOpacity> 
                
                </View>}
            
                

          
             {stage !==2 &&    <Button
                    onPress={e=>setStage(stage+1)}
                    title='Próximo passo' />}
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
    logo: {
        width: 200,
        height: 58,
        marginBottom:20
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
    containerLogo: {
        flex: 1,
        justifyContent:"center"
    },
    btnSignin: {
        backgroundColor: "#35AAFF",
        width: "90%",
        height: 45,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 7,
        marginBottom: 19,
    
        
    },
})



