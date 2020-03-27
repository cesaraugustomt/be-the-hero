import React, {useState, useEffect} from 'react'
import { Feather } from '@expo/vector-icons'
import {useNavigation} from '@react-navigation/native'
import { View, FlatList, Image, Text, TouchableOpacity } from 'react-native'

import api from '../../services/api'

import logoImg from '../../assets/logo.png'

import styles from './styles'

export default function Incidents(){
   const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
   
    const [page, setPage] = useState(1)//começo da pagina
  const [loading, setLoading] = useState(false)
  
   const navigation = useNavigation() 


    function navigateToDetail(incident) { //ver mais detalhes
navigation.navigate('Detail',{ incident })
}

async function loadIncidents() {
    if (loading){
        return
    } //parte do scroll infinito

    if (total > 0 && incidents.length == total){
        return
    }

setLoading(true)

const response = await api.get('incidents', {
    params: { page }
}) //URL

setIncidents([...incidents, ...response.data]) //anexo de dois ventores no ReactNative
setTotal(response.headers['x-total-count'])
setPage(page + 1) //pula pra proxima pagina
setLoading(false)
}

 useEffect(() => {
    loadIncidents()
 }, [])

    return (
        <View style={styles.container}> 
        <View style={styles.header}>
        <Image source={logoImg} />
        <Text style={styles.headerText}>
            Total de <Text style={styles.headerTextBold}>{total} casos</Text>.
        </Text>
        </View>
        <Text style={styles.title}>Bem-vindo!</Text>
        <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>

    <FlatList  //scroll
    data={incidents} //lista de incidets
    style={styles.IncidentsList}
    keyExtractor={incident => String(incidents.id)}
    showsVerticalScrollIndicator={false} //tirar o efeito visual do scroll
    onEndReached={loadIncidents} //Scroll infinito
    onEndReachedThreshold={0.2}//novos intes apartir de 20% de rolagem
    renderItem={({item: incident}) => (
        <View style={styles.Incident}>
                <Text style={styles.IncidentProperty}>ONG:</Text>
                <Text style={styles.IncidentValue}>{incident.name}</Text>
                <Text style={styles.IncidentProperty}>CASO:</Text>
                <Text style={styles.IncidentValue}>{incident.title}</Text>
                <Text style={styles.IncidentProperty}>VALOR:</Text>
                <Text style={styles.IncidentValue}>
                {Intl.NumberFormat('pt-BR',
                { style: 'currency',
                currency: 'BRL'
                }).format(incident.value)}</Text>

                <TouchableOpacity 
                style={styles.detailsButton} 
                onPress={() => navigateToDetail(incident)}>

                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                <Feather name="arrow-right" size={16} color="#E02041" />
                </TouchableOpacity>
            </View>


    )}
    />
   </View>
    )
}