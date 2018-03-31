import React from 'react';
import { Text, View, TouchableOpacity, AsyncStorage  } from 'react-native';

import { clearLocalNotification, setLocalNotification } from '../utils/helpers';

const DECK_LIST_STORAGE_KEY = '@MyDeckList:key';

export default class DeckView extends React.Component {
  state = {
    numCards: 0
  }
  onAddCard(e) {
    this.props.navigation.navigate('AddCard', {handleAddCard: this.handleAddCard, deckName: this.props.navigation.state.params.deck.key});
  }
  navigationOptions = {
    title: "test"
  }
  
  componentDidMount() {
    this.setState({numCards: this.props.navigation.state.params.deck.numCards});
  }
  componentWillReceiveProps() {
    this.setState({numCards: this.props.navigation.state.params.deck.numCards});
  }
  
  handleAddCard = (question, answer) => {
    const deckKey = this.props.navigation.state.params.deck.key;
    AsyncStorage.getItem(deckKey).then((prevDeck) => {
      AsyncStorage.getItem(DECK_LIST_STORAGE_KEY).then((prevDeckList) => {
        let deck = JSON.parse(prevDeck);
        if (!deck)
          deck = [];
        deck.push({question, answer});
        
        let deckList = JSON.parse(prevDeckList); // This should always be a list unless we made a boo boo somewhere
        for (otherDeck of deckList)
          if (otherDeck.key === deckKey)
            otherDeck.numCards++;
        
        AsyncStorage.setItem(DECK_LIST_STORAGE_KEY, JSON.stringify(deckList)).then(() => {
          AsyncStorage.setItem(deckKey, JSON.stringify(deck)).then(() => {
            this.props.navigation.state.params.deck.numCards++;
            this.setState({numCards: this.props.navigation.state.params.deck.numCards});
            this.props.navigation.state.params.reloadDeckList();
          });
        });
      });
    });
  }
  
  startQuiz(e) {
    clearLocalNotification().then(setLocalNotification);
    this.props.navigation.navigate('CardQuiz', {deckName: this.props.navigation.state.params.deck.key});
  }
  
  render() {
    return (
      <View style={{flex: 1, flexDirection: 'column', justifyContent: 'space-between'}}>
        <Text style={{textAlign: 'center', fontSize: 36}}>{this.props.navigation.state.params.deck.key}</Text>
        <Text style={{textAlign: 'center', fontSize: 24, color: 'gray'}}>{this.props.navigation.state.params.deck.numCards} cards</Text>
        <View>
          <TouchableOpacity onPress={(e) => this.onAddCard(e)}>
            <Text style={{textAlign: 'center', backgroundColor: 'red', color: 'white', height: 40}}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={(e) => this.startQuiz(e)}>
            <Text style={{textAlign: 'center', backgroundColor: 'blue', color: 'white', height: 40}}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}
