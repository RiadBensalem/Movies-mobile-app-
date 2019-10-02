// Components/Search.js

import React from 'react'
import { StyleSheet, View, TextInput, Button,Text,FlatList, ActivityIndicator } from 'react-native'
//import films from '../Helpers/filmsData'
import FilmItem from './FilmItem'
import { getFilmsFromApiWithSearchedText }  from '../API/TMDBApi' // import { }

class Search extends React.Component {
  constructor(props) {
      super(props)
      this.page=0
      this.totalPage=0
      this.state={films:[],isLoading:false}
      //this._films = []
      this.searchedText=''
    }

_searchTextInputChanged(text){
  this.searchedText=text
}

  _loadFilms(){
    if (this.searchedText.length > 0) {
      this.setState({ isLoading: true })
      getFilmsFromApiWithSearchedText(this.searchedText,this.page+1).then(data => {
        // this._films=data.results
        //this.forceUpdate()
        this.page=data.page
        this.totalPage=data.total_pages
        this.setState({
          //films:data.results,
          films:[...this.state.films,...data.results],
          isLoading:false
        })
     });
   }
  }

  _displayLoading() {
      if (this.state.isLoading) {
        return (
          <View style={styles.loading_container}>
            <ActivityIndicator size='large' />

          </View>
        )
      }
    }

  _searchFilms() {
       this.page = 0
       this.totalPage = 0
       this.setState({
         films: [],
       }, () => {
           this._loadFilms()
       })
     }

_displayDetailForFilm= (idFilm) =>{
  this.props.navigation.navigate("FilmDetail",{"idFilm":idFilm})
}
  render() {
    return (
      <View style={styles.main_container}>
        <TextInput style={styles.textinput} placeholder='Titre du film'
        onChangeText={(text) => this._searchTextInputChanged(text)}
        onSubmitEditing={ () => this._searchFilms() }/>
        <Button title='rech' onPress={() => this._searchFilms()} style={styles.button}/>
        <FlatList style={styles.flatList}
        //data={this._films}
        data={this.state.films}
        keyExtractor={(item)=>item.id.toString()}
        renderItem={({item}) => <FilmItem film={item} displayDetailForFilm={this._displayDetailForFilm}/>}
        onEndReachedThreshold={0.5}
        onEndReached={() => {
          if(this.page<this.totalPage){
            console.log(this.page+" "+this.totalPage)
            this._loadFilms()
          }
        }}
        />
        {this._displayLoading()}
      </View>
    )
  }
}


const styles = StyleSheet.create({
  button:{
    //backgroundColor: '#'
  },
  flatList:{
    backgroundColor:'#000'
  },
  main_container :{
    flex : 1
  },
  textinput: {
    marginLeft: 5,
    marginRight: 5,
    height: 50,
    borderColor: '#000000',
    borderWidth: 1,
    paddingLeft: 5,
    backgroundColor: "#000",
    color: "#fff"
  },
  loading_container: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 100,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
export default Search
