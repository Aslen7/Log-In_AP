import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, Alert, Button as RNButton } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

export default function App() {
  const [image, setImage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status: mediaStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (mediaStatus !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }

        const { status: cameraStatus } = await ImagePicker.requestCameraPermissionsAsync();
        if (cameraStatus !== 'granted') {
          alert('Sorry, we need camera permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri || (result.assets && result.assets.length > 0 && result.assets[0].uri));
    }
  };

  const takePicture = async () => {
    let result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri || (result.assets && result.assets.length > 0 && result.assets[0].uri));
    }
  };

  const handleChangeImage = () => {
    Alert.alert(
      'Cambiar Imagen',
      'Elige una opción:',
      [
        { text: 'Seleccionar de la Galería', onPress: pickImage },
        { text: 'Tomar una Foto', onPress: takePicture },
        { text: 'Cancelar', style: 'cancel' },
      ],
      { cancelable: true }
    );
  };

  const handleShareImage = async () => {
    if (!image) {
      Alert.alert('Error', 'No hay imagen para compartir');
      return;
    }

    try {
      await Sharing.shareAsync(image);
    } catch (error) {
      console.error('Error al compartir la imagen', error.message);
    }
  };

  const handleLogin = () => {
    if (username.trim() !== '' && password.trim() !== '') {
      Alert.alert('Usuario Registrado', 'Gracias por tu registro');
    } else {
      Alert.alert('Los campos no pueden estar vacios', 'Por favor rellena los campos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Inicio de Sesión</Text>
      <Image
        source={{ uri: image ? image : 'default-avatar-photo-placeholder-profile-icon-vector' }}
        style={styles.image}
      />
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleChangeImage}>
          <Text style={styles.buttonText}>Cambiar Imagen</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={handleShareImage}>
          <Text style={styles.buttonText}>Compartir Imagen</Text>
        </TouchableOpacity>
      </View>
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
        placeholderTextColor="#fff" // White text color
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
        placeholderTextColor="#fff" // White text color
      />
      <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
        <Text style={styles.buttonText}>Iniciar Sesión</Text>
      </TouchableOpacity>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#00FFFF', // Neon Cyan
    marginBottom: 20,
  },
  image: {
    width: 150,
    height: 150,
    borderRadius: 75,
    marginVertical: 20,
    borderColor: '#00FFFF', // Neon Cyan
    borderWidth: 2,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
    marginBottom: 20,
  },
  button: {
    backgroundColor: '#00FFFF', // Neon Cyan
    padding: 10,
    borderRadius: 5,
    width: '48%',
  },
  loginButton: {
    backgroundColor: '#00FFFF', // Neon Cyan
    padding: 15,
    borderRadius: 8,
    marginVertical: 20,
    width: '80%',
  },
  buttonText: {
    color: '#000', // Black
    textAlign: 'center',
  },
  input: {
    height: 40,
    width: '80%',
    borderColor: '#00FFFF', // Neon Cyan
    borderWidth: 1,
    marginVertical: 10,
    padding: 10,
    color: '#fff', // White
  },
});
