import React, { memo, useState } from 'react';
import Background from '../components/Background';
import Logo from '../components/Logo';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import BackButton from '../components/BackButton';
import Paragraph from '../components/Paragraph';
import { Component } from 'react';
import {
  Table,
  TableWrapper,
  Row,
  Rows,
  Col,
  Cols,
  Cell,
} from 'react-native-table-component';
import {
  emailValidator,
  mobileValidator,
  nameValidator,
  stateValidator,
  cityValidator,
} from '../core/utils';

class ProfileTable extends Component {
  constructor(props) {
    super(props);
    this.state = {
      HeadTable: ['Company Name', 'Profile', 'From', 'To'],
      DataTable: [
        ['Lemon Tree Hotel', 'FrontDesk Executive', 'Jan-19', 'Aug-19'],
        ['Skywalk Hospitality', 'DataEntry operator', 'Sep-19', 'Jan-20'],
      ],
    };
  }

  render() {
    const state = this.state;

    return (
      <View style={styles.container}>
        <Table borderStyle={{ borderWidth: 1 }}>
          <Row
            data={state.HeadTable}
            style={styles.HeadStyle}
            textStyle={styles.TableText}
          />
          <Rows data={state.DataTable} textStyle={styles.TableText} />
        </Table>
      </View>
    );
  }
}

const ProfileScreen = ({ navigation }) => {
  const [name, setName] = useState({ value: 'Ramu', error: '' });
  const [email, setEmail] = useState({ value: 'ramu@gmail.com', error: '' });
  const [mobile, setMobile] = useState({ value: '8885551234', error: '' });
  const [state, setState] = useState({ value: 'Telengana', error: '' });
  const [city, setCity] = useState({ value: 'Hyderabad', error: '' });

  const _onSignUpPressed = () => {
    const nameError = nameValidator(name.value);
    const emailError = emailValidator(email.value);
    const mobileError = mobileValidator(mobile.value);
    const stateError = stateValidator(state.value);
    const cityError = cityValidator(city.value);

    if (emailError || mobileError || nameError || stateError || cityError) {
      setName({ ...name, error: nameError });
      setEmail({ ...email, error: emailError });
      setMobile({ ...mobile, error: mobileError });
      setState({ ...state, error: stateError });
      setCity({ ...city, error: cityError });
      return;
    }

    navigation.navigate('ProfileScreen');
  };

  return (
    <ScrollView>
      <Background>
        <BackButton goBack={() => navigation.navigate('Dashboard')} />
        <Logo />

        <TextInput
          label="Name"
          returnKeyType="next"
          value={name.value}
          onChangeText={text => setName({ value: text, error: '' })}
          error={!!name.error}
          errorText={name.error}
        />

        <TextInput
          label="Mobile"
          returnKeyType="next"
          value={mobile.value}
          onChangeText={text => setMobile({ value: text, error: '' })}
          error={!!mobile.error}
          errorText={mobile.error}
        />

        <TextInput
          label="Email"
          returnKeyType="next"
          value={email.value}
          onChangeText={text => setEmail({ value: text, error: '' })}
          error={!!email.error}
          errorText={email.error}
          autoCapitalize="none"
          autoCompleteType="email"
          textContentType="emailAddress"
          keyboardType="email-address"
        />

        <TextInput
          label="State"
          returnKeyType="next"
          value={state.value}
          onChangeText={text => setState({ value: text, error: '' })}
          error={!!state.error}
          errorText={state.error}
        />

        <TextInput
          label="City"
          returnKeyType="next"
          value={city.value}
          onChangeText={text => setCity({ value: text, error: '' })}
          error={!!city.error}
          errorText={city.error}
        />

        <Button
          mode="contained"
          onPress={_onSignUpPressed}
          style={styles.button}
        >
          Save
        </Button>
      </Background>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  button: {
    marginTop: 24,
  },
  container: {
    flex: 1,
    padding: 18,
    paddingTop: 35,
    backgroundColor: '#ffffff',
  },
  HeadStyle: {
    height: 50,
    alignContent: 'center',
    backgroundColor: '#ffe0f0',
  },
  TableText: {
    margin: 10,
  },
});

export default memo(ProfileScreen);
