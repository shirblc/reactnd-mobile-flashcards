import React from 'react';
import { SafeAreaView, Text, StyleSheet, Pressable, FlatList } from 'react-native';
import { connect } from 'react-redux';
import { AntDesign } from '@expo/vector-icons'; 
import { getInitialData } from '../actions/shared';
import Deck from './Deck';

class Home extends React.Component {
	/*
  	Function Name: componentDidMount()
  	Function Description: Dispatches an action to get existing decks and questions upon inserting the component into the DOM. This method is automatically triggered by React.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	componentDidMount() {
		this.props.dispatch(getInitialData());
	}
	
	/*
  	Function Name: render()
  	Function Description: Renders the component.
  	Parameters: None.
	----------------
  	Programmer: Shir Bar Lev.
  	*/
	render() {
		return (
			<SafeAreaView style={styles.container}>
				<Pressable style={styles.deck} onPress={() => (this.props.navigation.navigate('Add Deck'))}>
					<AntDesign name="plus" size={24} color="black" />
				</Pressable>
				{
					Object.values(this.props.decks).length
					? <FlatList 
						  data={Object.entries(this.props.decks)} 
						  keyExtractor={item => item[0]}
						  renderItem={({ item }) => (
								<Pressable key={item[0]} onPress={() => (this.props.navigation.navigate('Deck View', {
									   deckID: item[0]
								   }))}>
								   <Deck deckName={item[1].name} cardsNumber={item[1].questions.length} />
							   </Pressable>
							)} />
					: <Text>No decks yet. Add your first one now!</Text>
				}
			</SafeAreaView>
		)
	}
}

// Map State to Props
// Gets a list of all available decks
function mapStateToProps({ decks }) {
	return {
		decks
	}
}

// Styles
const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff',
		alignItems: 'center',
		justifyContent: 'center',
	},
	deck: {
		borderColor: '#000',
		borderStyle: 'solid',
		borderRadius: 5,
		borderWidth: 3,
		padding: 10,
		margin: 10
	},
});

export default connect(mapStateToProps)(Home)