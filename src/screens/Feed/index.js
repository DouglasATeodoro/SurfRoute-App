import React, { useState } from 'react'
import { StyleSheet, FlatList, View, Animated, ScrollView, Image } from 'react-native'
import Header from '../../components/Header'
import Post from '../../components/Post'
import icon from "../../assets/imgs/surf.jpg";
 

export default function Feed(){
    const [scrollY,setScrollY] = useState(new Animated.Value(0))
    
    const posts = [{
            id: Math.random(),
            nickName: 'Angel Sofia',
            email: 'AngelSofia@gmail.com',
            image: require('../../assets/imgs/fence.jpg'),
            comments: [{
                nickName: 'Paula Previatti',
                comment: ': Linda minha filha..'
            },{
                nickName: 'Douglas Teodoro',
                comment: ': Muito lindo!'
            }]
        },{
            id: Math.random(),
            nickName: 'Paula Previati',
            email: 'PaulaPreviati@gmail.com',
            image: require('../../assets/imgs/bw.jpg'),
            comments: [{
                nickName: 'Angel Sofia',
                comment: ': Linda mamãe..'
            },{
                nickName: 'Douglas Teodoro',
                comment: ': lindo!'
            }]
        },{
            id: Math.random(),
            nickName: 'Dodo lindo',
            email: 'PaulaPreviati@gmail.com',
            image: require('../../assets/imgs/gate.jpg'),
            comments: []
        },{
            id: Math.random(),
            nickName: 'Maria silva',
            email: 'PaulaPreviati@gmail.com',
            image: require('../../assets/imgs/boat.jpg'),
            comments: [{
                nickName: 'Angel Sofia',
                comment: ': Linda..'
            }]
        }]
        

    return(
            
            <View style={styles.container}>
                 <Animated.View
                    style={{
                        height:scrollY.interpolate({
                            inputRange:[10,160,185],
                            outputRange:[140,20,0],
                            extrapolate: 'clamp'
                        }),
                        opacity:scrollY.interpolate({
                            inputRange:[1,75,170],
                            outputRange:[1,1,0]
                            
                        })
                        
                    }}
                    >
                     <Header/>
                 </Animated.View>
                 
                 <ScrollView onScroll={Animated.event([{
                        nativeEvent:{
                            contentOffset:{ y: scrollY }
                        },
                        }],
                        { useNativeDriver: false })
                     }>
                    {/* <FlatList 
                        data={this.posts}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                                <Post key={item.id} {...item} />} 
                        
                    }}
                    /> */}
                    
                        <FlatList 
                        data={posts}
                        keyExtractor={item => `${item.id}`}
                        renderItem={({ item }) =>
                                <Post key={item.id} {...item} />} 
                        />
                    
                    
               </ScrollView>
            </View>
        )
    }



const styles = StyleSheet.create({
    container: {
        flex: 1,
        //justifyContent: 'center',
        //alignItems: 'center',
        backgroundColor: '#F5FCFF'
    },
    image:{
        height: 40,
        width: 40,
        resizeMode: "contain",
        
    },
    title:{
        //color:"#FFE4E1",
        fontFamily:"kiss",
        //height: 30,
        fontSize: 40
        
    },
    box:{
        height: 300,
        backgroundColor: "#DDD",
        margin: 7,
        borderRadius: 5
    }
})



