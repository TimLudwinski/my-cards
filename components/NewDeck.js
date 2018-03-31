import React from 'react';
import { Text, View, TouchableOpacity, TextInput, Keyboard, KeyboardAvoidingView, AsyncStorage  } from 'react-native';
import { NavigationActions } from 'react-navigation'

const DECK_LIST_STORAGE_KEY = '@MyDeckList:key';

export default class NewDeck extends React.Component {
  state = {
    deckName: "",
  }
  
  addNewDeck() {
    AsyncStorage.getItem(DECK_LIST_STORAGE_KEY).then((value) => {
      let deckList = JSON.parse(value);
      if (!deckList)
        deckList = [];
      
      for (deck of deckList) {
        if (deck.key == this.state.deckName) {
          alert("Deck Name Already Exists!");
          return;
        }
      }
      
      let newDeck = {key: this.state.deckName, numCards: 0};
      deckList.push(newDeck);
      
      AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(deckList)).then(() => {
        this.setState({deckName: ""});
        Keyboard.dismiss();
        this.props.navigation.navigate('DecksList', {newDeck: newDeck});
      });
    });
  }
  
  render() {
    return (
      <KeyboardAvoidingView behavior='padding'>
        <View>
          <Text style={{fontSize: 36, textAlign: 'center'}}>What is the title</Text>
          <Text style={{fontSize: 36, textAlign: 'center'}}>of your new</Text>
          <Text style={{fontSize: 36, textAlign: 'center'}}>deck?</Text>
        </View>
        <View>
          <TextInput style={{height: 40, borderColor: 'gray', borderWidth: 1, borderRadius: 3}} onChangeText={(deckName) => this.setState({deckName})} value={this.state.deckName}/>
          <TouchableOpacity onPress={() => this.addNewDeck()} style={{height: 40, backgroundColor: 'green', justifyContent: 'space-between'}}>
            <Text style={{textAlign: 'center', color: 'white', fontSize: 24}}>Submit</Text>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    );
  }
}
