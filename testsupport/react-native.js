import React from 'react';
let ReactNative = React;

ReactNative.StyleSheet = {
  create: (styles) => {
    return styles;
  }
};

class View extends React.Component {}
class Text extends React.Component {}
class Navigator extends React.Component {}

ReactNative.View = View;
ReactNative.Text = Text;
ReactNative.TouchableWithoutFeedback = View;
ReactNative.Navigator = Navigator;

export default ReactNative;