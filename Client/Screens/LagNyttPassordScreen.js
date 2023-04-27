import React, { useState, useContext } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { TextInput } from 'react-native-paper';
import { AuthContext } from '../context/Authcontex';

export default function LagNyttPassordScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(true);
  const [passwordConfirmationVisible, setPasswordConfirmationVisible] = useState(true);
  const { setAuth } = useContext(AuthContext);

  const onSubmitForm = () => {
    // handle submitting form here
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Lag nytt passord</Text>
      <View style={styles.inputContainer}>
        <TextInput
          label="E-post"
          value={email}
          onChangeText={(text) => setEmail(text)}
          style={styles.input}
          keyboardType="email-address"
          autoCapitalize="none"
          autoCompleteType="email"
        />
        <TextInput
          label="Passord"
          value={password}
          onChangeText={(text) => setPassword(text)}
          style={styles.input}
          secureTextEntry={passwordVisible}
          right={
            <TextInput.Icon
              name={passwordVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordVisible(!passwordVisible)}
            />
          }
        />
        <TextInput
          label="Bekreft passord"
          value={passwordConfirmation}
          onChangeText={(text) => setPasswordConfirmation(text)}
          style={styles.input}
          secureTextEntry={passwordConfirmationVisible}
          right={
            <TextInput.Icon
              name={passwordConfirmationVisible ? 'eye' : 'eye-off'}
              onPress={() => setPasswordConfirmationVisible(!passwordConfirmationVisible)}
            />
          }
        />
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={onSubmitForm}>
          <Text style={styles.buttonText}>Lagre nytt passord</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.cancelButton}
          onPress={() => navigation.navigate('Login')}
        >
          <Text style={styles.cancelButtonText}>Avbryt</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#66A2BA',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 20,
    
  },
  input: {
    marginBottom: 10,
    backgroundColor: '#8FD6F2'
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  button: {
    backgroundColor: '#66A2BA',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  cancelButton: {
    backgroundColor: '#ccc',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
  },
  cancelButtonText: {
    color: '#000',
    fontWeight: 'bold',
    fontSize: 16,
  },
});
