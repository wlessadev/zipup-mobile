import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  SafeAreaView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const { control, handleSubmit, setValue, watch } = useForm({
    defaultValues: {
      nome: '',
      email: '',
      dataNascimento: '',
      celular: '',
      cep: '',
      endereco: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: ''
    }
  });

  const [mostrarResumo, setMostrarResumo] = useState(false);
  const navigation = useNavigation();

  const onSubmit = (data) => {
    setMostrarResumo(true);
  };

  const handleBack = () => {
    if (mostrarResumo) setMostrarResumo(false);
    else navigation.goBack();
  };

  return (
    <SafeAreaView>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.backgroundLayer1} />
        <View style={styles.backgroundLayer2} />
        <View style={styles.backgroundLayer3} />
        <View style={styles.backgroundLayer4} />
        <View style={styles.contentBox}>
          <Text style={styles.title}>Cadastro de Usuário</Text>

          {!mostrarResumo ? (
            <>
              <Controller
                name="nome"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Nome Completo"
                    placeholderTextColor="#ccc"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="dataNascimento"
                control={control}
                render={({ field }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Data de Nascimento - dd/mm/aaaa"
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    maxLength={10}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                name="email"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="E-mail"
                    placeholderTextColor="#ccc"
                    keyboardType="email-address"
                    autoCapitalize="none"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="celular"
                control={control}
                render={({ field }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Celular - (XX) XXXXX-XXXX"
                    placeholderTextColor="#ccc"
                    keyboardType="phone-pad"
                    maxLength={15}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                name="cep"
                control={control}
                render={({ field }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="CEP - XXXXX-XXX"
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    maxLength={9}
                    onChangeText={field.onChange}
                  />
                )}
              />

              <Controller
                name="endereco"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    placeholder="Endereço"
                    placeholderTextColor="#ccc"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={false}
                  />
                )}
              />

              <Controller
                name="numero"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Número"
                    placeholderTextColor="#ccc"
                    keyboardType="numeric"
                    maxLength={10}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="complemento"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={styles.input}
                    placeholder="Complemento"
                    placeholderTextColor="#ccc"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="bairro"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    placeholder="Bairro"
                    placeholderTextColor="#aaa"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={false}
                  />
                )}
              />

              <Controller
                name="cidade"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    placeholder="Cidade"
                    placeholderTextColor="#aaa"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={false}
                  />
                )}
              />

              <Controller
                name="uf"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    style={[styles.input, styles.disabledInput]}
                    placeholder="UF"
                    placeholderTextColor="#aaa"
                    maxLength={2}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    editable={false}
                  />
                )}
              />

              <View style={styles.buttonGroup}>
                <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                  <Text style={styles.buttonText}>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.continueButton} onPress={handleSubmit(onSubmit)}>
                  <Text style={styles.buttonText}>Continuar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text style={styles.title}>Resumo dos Dados</Text>
              
              <View style={styles.resumeContainer}>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Nome:</Text> {watch('nome') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>E-mail:</Text> {watch('email') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Data de Nascimento:</Text> {watch('dataNascimento') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Celular:</Text> {watch('celular') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>CEP:</Text> {watch('cep') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Endereço:</Text> {watch('endereco') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Número:</Text> {watch('numero') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Complemento:</Text> {watch('complemento') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Bairro:</Text> {watch('bairro') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>Cidade:</Text> {watch('cidade') || 'Não informado'}
                </Text>
                <Text style={styles.resumeItem}>
                  <Text style={styles.resumeLabel}>UF:</Text> {watch('uf') || 'Não informado'}
                </Text>
              </View>

              <TouchableOpacity style={styles.backButton} onPress={handleBack}>
                <Text style={styles.buttonText}>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    minHeight: Dimensions.get('window').height,
    padding: 24,
    backgroundColor: '#113981',
    flexGrow: 1,
    alignItems: 'center'
  },
  backgroundLayer1: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(37,180,176,0.6)',
    zIndex: 0
  },
  backgroundLayer2: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(17,57,129,0.25)',
    zIndex: 0
  },
  backgroundLayer3: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.05)',
    zIndex: 0
  },
  backgroundLayer4: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    zIndex: 0
  },
  contentBox: {
    backgroundColor: '#ffffff10',
    padding: 20,
    borderRadius: 16,
    width: '100%',
    maxWidth: 500,
    marginTop: 24,
  },
  title: {
    color: '#fff',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
    textAlign: 'center'
  },
  input: {
    backgroundColor: '#ffffff20',
    color: '#fff',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16
  },
  backButton: {
    backgroundColor: '#555',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginRight: 8
  },
  continueButton: {
    backgroundColor: '#3F8CFF',
    padding: 12,
    borderRadius: 8,
    flex: 1,
    marginLeft: 8
  },
  buttonText: {
    textAlign: 'center',
    color: '#fff',
    fontWeight: 'bold'
  },
  resumeContainer: {
    backgroundColor: '#ffffff10',
    padding: 16,
    borderRadius: 8,
    marginBottom: 16,
  },
  resumeItem: {
    color: '#fff',
    marginVertical: 6,
    fontSize: 16,
    lineHeight: 24,
  },
  resumeLabel: {
    fontWeight: 'bold',
    color: '#FFD640',
    marginRight: 8,
  },
  disabledInput: {
    backgroundColor: '#ffffff10',
    color: '#fefefe',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    opacity: 0.7
  }
});