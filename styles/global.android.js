import { StyleSheet } from 'react-native';

import { styles as sharedStyles, colors as sharedColors } from './_global';

export const colors = sharedColors;

const stylesOverride = {
  ...sharedStyles,
  header: {
    backgroundColor: colors.mainAccent,
    padding: 5,
    justifyContent: 'space-between',
    flexDirection: 'row'
  }
};

export const styles = StyleSheet.create(stylesOverride);