import { Dimensions } from 'react-native';

class Display {
  constructor() {
    this.width = Dimensions.get('window').width;
    this.height = Dimensions.get('window').height;
  }
}

export default new Display();