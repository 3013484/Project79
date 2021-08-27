import React, {Component} from 'react';
import { Text, View, SafeAreaView, ImageBackground, TouchableOpacity, Image, StyleSheet, Linking } from 'react-native';
import axios from 'axios';

export default class DailyPicScreen extends Component {
    constructor () {
        super ();
        this.state = {
            apod: ''
        }
    }
    getAPOD = () => {
        axios
            .get("https://api.nasa.gov/planetary/apod?api_key=M6xp2pILN9cmjjvPzn0lRvdIlTbuCDLOAfrjBbzd")
            .then(response => {
                this.setState({ apod: response.data })
            })
            .catch(error => {
                Alert.alert(error.message)
            })
    }
    componentDidMount = () => {
        this.getAPOD();
    }
    render () {
        return (
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeArea}/>
                <ImageBackground source = {require('../assets/space.gif')} style = {styles.backgroundImage}>
                    <Text style = {styles.routeText}>Astronomy Picture of the Day</Text>
                    <Text style = {styles.titleText}>{this.state.apod.title}</Text>
                    <TouchableOpacity 
                        style = {styles.container}
                        onPress = {() => {
                            Linking.openURL(this.state.apod.url).catch(err => console.error("Couldn't load page", err))
                        }}>
                        <View style = {styles.container}>
                            <Image source = {require("../assets/play-video.png")} style = {styles.iconImage}></Image>
                        </View>
                    </TouchableOpacity>
                    <Text style = {styles.explanationText}>{this.state.apod.explanation}</Text>
                </ImageBackground>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: "center", 
        alignItems: "center"
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    backgroundImage: {
        flex: 1,
        resizeMode: 'cover',
    },
    routeCard: {
        flex: 0.25,
        marginLeft: 50,
        marginRight: 50,
        marginTop: 50,
        borderRadius: 30,
        backgroundColor: 'white'
    },
    titleBar: {
        flex: 0.15,
        justifyContent: "center",
        alignItems: "center"
    },
    titleText: {
        fontSize: 40,
        fontWeight: "bold",
        color: "white"
    },
    routeText: {
        fontSize: 35,
        fontWeight: "bold",
        color: "black",
        marginTop: 75,
        paddingLeft: 30
    },
    knowMore: {
        paddingLeft: 30,
        color: "red",
        fontSize: 15
    },
    bgDigit: {
        position: "absolute",
        color: "rgba(183, 183, 183, 0.5)",
        fontSize: 150,
        right: 20,
        bottom: -15,
        zIndex: -1
    },
    iconImage: {
        position: "absolute",
        height: 80,
        width: 80,
        resizeMode: "contain",
        right: 20,
        top: -80
    }
});