import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const [currentTime, setCurrentTime] = useState('');
  const [currentDate, setCurrentDate] = useState('');
  const navigation = useNavigation();

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setCurrentTime(now.toLocaleTimeString());
      setCurrentDate(now.toLocaleDateString());
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleRegisterClick = () => {
    navigation.navigate('Cadastro');
  };

  return (
    <SafeAreaView>
      <ScrollView>
        <View>
          <View />
          <View />
          <View />
          <View />
          <View>
            <View>
              <View>
                <Text>Bem-vindo(a) ao</Text>
                <View>
                  <Image
                    source={require('../assets/Logo_ZipUp.png')}
                  />
                  <Text>!</Text>
                </View>
              </View>
              <Text>Que bom te ver por aqui!</Text>
            </View>

            <View>
              <Text>
                Hoje é <Text>{currentDate || '--/--/----'}</Text>,{' '}
                <Text>{currentTime || '--:--:--'}</Text>.
              </Text>
              <Text>
                Cadastre-se agora mesmo e{'\n'}comece a usar o ZipUp!
              </Text>
            </View>

            <View>
              <TouchableOpacity onPress={handleRegisterClick}>
                <Text>Cadastrar</Text>
              </TouchableOpacity>

              <View>
                <Text>Um teste</Text>
                <Image
                  source={require('../assets/logo-hbi-light-contrast.png')}
                />
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}