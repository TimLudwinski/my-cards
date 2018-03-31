import React from 'react';
import { StyleSheet, Text, View, TouchableOpacity, FlatList, AsyncStorage } from 'react-native';

const DECK_LIST_STORAGE_KEY = '@MyDeckList:key';

export default class DecksList extends React.Component {
  state = {
    deckList: []
  }
  
  componentDidMount() {
    this.loadDeckList();
  }
  componentWillReceiveProps() {
    this.loadDeckList();
  }
  
  loadDeckList = () => {
    AsyncStorage.getItem(DECK_LIST_STORAGE_KEY).then((value) => {
      this.setState({deckList: JSON.parse(value)});
    });
  }
  
  renderItem = ({item}) => (
    <TouchableOpacity onPress={() => this.props.navigation.navigate('DeckView', {deck: item, reloadDeckList: this.loadDeckList})} key={item.key} style={{borderWidth: 1, borderTopWidth: 0, height: 60}}>
      <Text style={{fontSize: 24, textAlign: 'center'}}>{item.key}</Text>
      <Text style={{fontSize: 12, textAlign: 'center', color: 'gray'}}>{item.numCards} cards</Text>
    </TouchableOpacity>
  )
  
  render() {
    return (
      <View style={{flexDirection: 'column', justifyContent: 'space-between', borderTopWidth: 1}}>
        <FlatList data={this.state.deckList} renderItem={this.renderItem} />
      </View>
    );
  }
}
