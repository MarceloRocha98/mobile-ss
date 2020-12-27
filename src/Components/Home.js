import React, { useState } from 'react'
import {View,Text,KeyboardAvoidingView,StyleSheet,Alert,TouchableOpacity,FlatList,TextInput, Button} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-community/async-storage';
import { AntDesign,Entypo } from '@expo/vector-icons'
import api from '../services/api'
export default class Home extends React.Component{
    state = {
        loading: true,
        serviceName: '',
        serviceDescription: '',
        serviceContent: '',
        servicePrice: 5,
        typeCount: 0,
        step:0,
     
        
    }

    async componentDidMount() {
        // console.log(this.props)
        // console.log(this.props.route.params)
        // console.log(this.props)
        const user =JSON.parse( await AsyncStorage.getItem('@userKey'))

        // console.log(user,typeof(user))

        const res = await api.post('validateToken', user)
            .then(async resp => {
                // console.log(resp.data)
                if (!resp.data) {

                    await AsyncStorage.removeItem('@userKey')
                      this.props.navigation.navigate('Signin')

                }
                if (resp.data) {
                    // console.log(user.token)
                    const token = (user.token)
                    api.defaults.headers.common['Authorization'] = `Bearer ${token}`

                }
                this.setState({ loading: false })

            })
        
        //////////////////

    }

    async handleCreate(data) {
        // const user = this.props.route.params
        // const { serviceName, serviceDescription,
        //     serviceContent, servicePrice } = this.state
        
        // const data = {
        //     userId: user.id,
        //     name:serviceName,
        //     description:serviceDescription,
        //     content:serviceContent,
        //     price:servicePrice,
        // }

        await api.post('services', data)

        .then(e => {
            Alert.alert('Serviço criado com sucesso')
           
        })
        .catch(err => Alert.alert(err.response.data ))
    }
 
   


    render() { 
        const {step,typeCount, loading, serviceName, serviceContent, serviceDescription, servicePrice } = this.state
        
        const types=['Limpeza','Eletricista','Informática','Entrega','Hidráulico','Pintura','Alimentação','Mecânico','Maquiagem','Tatuagem & Piercing','Cabelereiro & manicure & pedicure','Moda & Decoração']
        const lenTypes=types.length

        if (loading) {
            return (
                <View style={styles.container}>
                    
                    <Text style={{
                        color: "white",
                        fontSize:30,
                    }}> Carregando ...</Text>
                </View>
            )
        }



        return (
            <KeyboardAvoidingView style={styles.container}>
                  <View
                        style={[styles.containerContent],{
                            // marginTop: 6,
                            // margin:20,
                            // paddingTop: 3,
                            // display:"flex",
                        }}
                    > 
                    
                    {/* <Text
                        style={{ 
                            color: "black",
                            fontSize:23,
                            textAlign:"center",
                            marginBottom: 10,
                            fontWeight: "",
                            // margin:20,
                        }}
                    > Peça um serviço </Text> */}
                  
                    {step === 0 &&  
                        <View style={styles.containerContent}> 
                        <Text style={{
                            fontSize: 18,
                            marginBottom:20,
                        }}
                        > Peça um serviço</Text>
                        <TextInput
                            style={styles.btn}
                            placeholder='Nome do serviço'
                            onChangeText={e => {
                                this.setState({serviceName:e})
                            }}
                            />
                        <TextInput
                            style={styles.btn}
                            placeholder='Breve Descriçao'
                            onChangeText={e => {
                                this.setState({serviceDescription:e})
                            }}
                            />
                            </View>
                            }
                    {step === 1 && <View style={styles.containerContent}>
                        <TextInput
                            style={styles.btn}
                            placeholder='Detalhes do serviço'
                            onChangeText={e => {
                                this.setState({serviceContent:e})
                            }}
                        />
                        <TextInput
                            style={styles.btn}
                            placeholder='Preço do serviço (R$)'
                            onChangeText={e => {
                                this.setState({servicePrice:e})
                            }}
                        />
                        
                    </View>}

                    {(step === 2 && typeCount===0)  && <Text style={{
                        fontSize: 20,
                        marginBottom:10,
                       }}>Tipo de serviço</Text>}
                {step ===2 &&  <View style={{flex:0.2,alignItems:"center",justifyContent:"center",flexDirection:"row"}}>
                
                {typeCount !==0 &&   <TouchableOpacity
                    onPress={e=>this.setState({typeCount:typeCount-1})}
                    style={{marginRight:10}}
                >
                    <Text>Anterior</Text>
                </TouchableOpacity>
                        }
                     
                          


                {typeCount === 0 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 1 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 2 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 3 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 4 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 5 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 6 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 7 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 8 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 9 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 10 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                {typeCount === 11 && <Text style={{fontSize:15,fontWeight:"bold"}}>{types[typeCount]}</Text>}
                
                {typeCount !== 11 &&   <TouchableOpacity
                    onPress={e=>this.setState({typeCount:typeCount+1})}
                    style={{marginLeft:10}}
                    >
                    <Text>Próximo</Text>
                </TouchableOpacity>}
                   

                </View>}
                    

                  {step ===2 &&   <TouchableOpacity
                            style={{
                            //     backgroundColor: "#C1D6D0",
                            // borderRadius: 12,
                            margin: 5,
                            marginBottom: 25,
                            marginTop:20,
                            }}
                        onPress={async e => {
                            const user =JSON.parse( await AsyncStorage.getItem('@userKey'))
                                 this.setState({loading:true})
                                const data = {
                                    userId: user.id,
                                    name:serviceName,
                                    description:serviceDescription,
                                    content:serviceContent,
                                    price: servicePrice,
                                    location: 'jaba',
                                    type:"Elétrico"
                                }
                                let control = 0;
                            const minimumDescription = 150
                            if (serviceDescription.length > minimumDescription) {
                                control=1
                                // alert('A descrição deve ser curta (máximo de 100 caracteres)')
                            }
                            const minimumValue = 5
                            if ((servicePrice >= minimumValue) && control===0) {
                                  
                                this.handleCreate(data)
                                this.setState({step:0,typeCount:0})
                            } else {
                                if (control == 0) {
                                    this.setState({step:0,typeCount:0})
                                    
                                    Alert.alert('Minimo valor de serviço é 5 R$')
                                } else {
                                    this.setState({step:0,typeCount:0})
                                     Alert.alert(`A descrição deve ser curta (máximo de ${minimumDescription} caracteres)`)
                                }
                            }
                            this.setState({step:0,typeCount:0})
                          
                             this.setState({loading:false})
                        
                                // this.handleCreate()
                            }}
                        >
            
                     

                        <AntDesign
                            style={{
                               textAlign:"center"
                            }}
                            name="pluscircle"
                            size={36}
                            color="black" />
                      
                    </TouchableOpacity>}
                    
                    {step !== 2 && <TouchableOpacity
                      
                    onPress={e=>this.setState({step:step+1})}
                        style={{
                            alignItems: "center",
                            justifyContent: "center",
                            backgroundColor: "#2f426a",
                            borderRadius: 25,
                            padding: 20,
                            marginBottom:10,
                    }}
                    >
                    
                        <Text
                            style={{
                                fontSize: 20,
                                color:"#fff"
                        }}
                        >Próximo passo</Text>
                    </TouchableOpacity>}
                </View> 
                    
    
         
        </KeyboardAvoidingView>
     )
}
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
        marginBottom: 9,
        color: "#222",
        fontSize: 17,
        borderRadius: 7,
        padding:10,
    },
    containerContent: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        width: "90%",
        backgroundColor: "#fff", 
        // backgroundColor: "#2f426a", 
        borderRadius: 7,
        marginBottom: 1,
        paddingTop:10,
    },
})



