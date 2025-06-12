import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Dimensions,
  StyleSheet,
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
    <ScrollView contentContainerStyle={styles.container}>
      {/* Camadas de gradiente substituídas por Views com backgroundColor simples para simplificação */}
      <View style={styles.backgroundLayer1} />
      <View style={styles.backgroundLayer2} />
      <View style={styles.backgroundLayer3} />
      <View style={styles.backgroundLayer4} />
<View style={styles.shadowWrapper}>
      <View style={styles.contentBox}>
        <View style={styles.headerBox}>
          <View style={styles.titleGroup}>
            <Text style={styles.titleText}>Bem-vindo(a) ao</Text>
            <View style={styles.logoAndExclamation}>
              <Image
                source={require('../assets/Logo_ZipUp.png')}
                style={styles.logo}
                resizeMode="contain"
              />
              <Text style={styles.exclamation}>!</Text>
            </View>
          </View>
          <Text style={styles.description}>Que bom te ver por aqui!</Text>
        </View>

        <View style={styles.dateBox}>
          <Text style={styles.subtitle}>
            Hoje é{' '}
            <Text style={styles.timeText}>{currentDate || '--/--/----'}</Text>,{' '}
            <Text style={styles.timeText}>{currentTime || '--:--:--'}</Text>.
          </Text>
          <Text style={styles.description}>
            Cadastre-se agora mesmo e{'\n'}comece a usar o ZipUp!
          </Text>
        </View>

        <View style={styles.actionBox}>
          <TouchableOpacity style={styles.registerButton} onPress={handleRegisterClick}>
            <Text style={styles.registerButtonText}>Cadastrar</Text>
          </TouchableOpacity>

          <View style={styles.logoContainer}>
            <Text style={styles.footerText}>Um teste</Text>
            <Image
              source={require('../assets/logo-hbi-light-contrast.png')}
              style={styles.footerLogo}
              resizeMode="contain"
            />
          </View>
        </View>
      </View>
      </View>
    </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    backgroundColor: '#113981',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 32,
    position: 'relative'
  },
  backgroundLayer1: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(37,180,176,0.6)', //mudar pra linear gradient
    zIndex: 0
  },
  backgroundLayer2: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(17,57,129,0.25)', //mudar pra linear gradient
    zIndex: 0
  },
  backgroundLayer3: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(255,255,255,0.05)', //mudar pra linear gradient
    zIndex: 0
  },
  backgroundLayer4: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)', //mudar pra linear gradient
    zIndex: 0
  },
  shadowWrapper: {
  borderRadius: 16,
  shadowColor: '#000',
  shadowOpacity: 0.3,
  shadowRadius: 8,
  elevation: 10,
  overflow: 'hidden', 
},
contentBox: {
  padding: 24,
  backgroundColor: '#183F50',
  zIndex:1,
},
  headerBox: {
    marginBottom: 24
  },
  titleGroup: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'center',
    flexWrap: 'wrap',
    marginBottom: 24
  },
  titleText: {
    fontWeight: '900',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center'
  },
  logoAndExclamation: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    marginLeft: 8
  },
  logo: {
    width: 60,
    height: 60
  },
  exclamation: {
    fontWeight: '900',
    fontSize: 24,
    color: '#fff',
    marginLeft: -8
  },
  description: {
    color: 'rgba(255, 255, 255, 0.8)',
    textAlign: 'center',
    fontSize: 16
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16
  },
  timeText: {
    fontWeight: 'bold',
    color: '#FFD640'
  },
  dateBox: {
    marginBottom: 24
  },
  actionBox: {
    alignItems: 'center',
    marginTop: 24
  },
  registerButton: {
    backgroundColor: '#3F8CFF',
    paddingVertical: 12,
    paddingHorizontal: 32,
    borderRadius: 8,
    marginBottom: 24
  },
  registerButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff'
  },
  logoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8
  },
  footerText: {
    color: '#fff',
    fontSize: 16,
    marginRight: 8
  },
  footerLogo: {
    width: 40,
    height: 40
  }
});
