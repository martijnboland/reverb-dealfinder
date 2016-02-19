export const colors = {
  mainBackground: '#eee',
  secundaryBackground: '#ddd',
  mainAccent: '#b71817',
  textNormal: '#444',
  textLight: '#777',
  textAttention: '#b86a00'
};

export const styles = {
  header: {
    backgroundColor: colors.mainAccent,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row',    
    paddingTop: 20
  },
  headerRight: {
    alignItems: 'flex-end'
  },
  navbarButton: {
    flex: 1,
    padding: 5
  },
  navbarButtonText: {
    color: '#fff',
    fontSize: 16
  },
  title: {
    alignItems: 'center',
    flex: 1,
    padding: 5 
  },
  titleText: {
    fontSize: 18,
    color: '#fff'
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
};