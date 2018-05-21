import React, { Component } from 'react';
import { View, Text, TouchableHighlight } from 'react-native';
import Colors from './../../config/colors';

class SettingsOption extends Component {
  render() {
    const { goTo, gotoAddress, label, value } = this.props;

    const {
      viewStyleContainer,
      viewStyleLabel,
      textStyleLabel,
      viewStyleValue,
      textStyleValue,
    } = styles;

    return (
      <TouchableHighlight
        underlayColor={Colors.lightGray}
        style={viewStyleContainer}
        // activeOpacity={0.2}
        onPress={() => goTo(gotoAddress, label)}>
        <View>
          <View style={viewStyleLabel}>
            <Text style={[textStyleLabel]}>{label}</Text>
          </View>
          {value ? (
            <View style={viewStyleValue}>
              <Text style={textStyleValue}>{value}</Text>
            </View>
          ) : null}
        </View>
      </TouchableHighlight>
    );
  }
}

const styles = {
  viewStyleContainer: {
    flexDirection: 'column',
    flexWrap: 'wrap',
    paddingBottom: 4,
    // marginBottom: 8,
    paddingLeft: 8,
    borderRadius: 5,
  },
  viewStyleLabel: {
    flexDirection: 'row',
  },
  viewStyleValue: {
    flexDirection: 'row',
  },
  textStyleLabel: {
    paddingTop: 8,
    // height: 28,
    paddingLeft: 0,
    color: 'black',
    fontWeight: 'normal',
    flex: 1,
    // alignItems: 'center',
    fontSize: 16,
    paddingBottom: 4,
  },
  textStyleValue: {
    fontSize: 14,
    color: 'black',
    opacity: 0.6,
    paddingBottom: 4,
    // paddingTop: 4,
  },
};

export { SettingsOption };