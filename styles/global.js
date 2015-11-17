import { StyleSheet } from 'react-native';

export var colors = {
  mainBackground: '#eee',
  secundaryBackground: '#ddd',
  mainAccent: '#b71817'
};

export var styles = StyleSheet.create({
  header: {
    alignSelf: 'stretch',
    marginBottom: 10,
    backgroundColor: colors.mainAccent,
    padding: 5,
    justifyContent: 'center'
  },
  title: {
    fontSize: 18,
    color: 'fff',
    alignSelf: 'center'    
  },
  formInput: {
    height: 36,
    padding: 10,
    fontSize: 18,
    borderWidth: 1,
    borderColor: '#555',
    borderRadius: 2,
    color: '#555',
    marginBottom: 10
  },
  button: {
    height: 36,
    backgroundColor: '#555',
    borderColor: '#555',
    borderWidth: 1,
    borderRadius: 2,
    marginBottom: 10,
    justifyContent: 'center'
  },
  buttonText: {
    fontSize: 18,
    color: '#fff',
    alignSelf: 'center'
  }
});