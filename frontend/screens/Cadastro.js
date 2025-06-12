import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
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
      <ScrollView>
        <View>
          <Text>Cadastro de Usuário</Text>

          {!mostrarResumo ? (
            <>
              <Controller
                name="nome"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Nome Completo"
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
                    {...field}
                    placeholder="Data de Nascimento - dd/mm/aaaa"
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
                    placeholder="E-mail"
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
                    {...field}
                    placeholder="Celular - (XX) XXXXX-XXXX"
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
                    {...field}
                    placeholder="CEP - XXXXX-XXX"
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
                    placeholder="Endereço"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="numero"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Número"
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
                    placeholder="Complemento"
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
                    placeholder="Bairro"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="cidade"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="Cidade"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <Controller
                name="uf"
                control={control}
                render={({ field: { onChange, onBlur, value } }) => (
                  <TextInput
                    placeholder="UF"
                    maxLength={2}
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                  />
                )}
              />

              <View>
                <TouchableOpacity onPress={handleBack}>
                  <Text>Voltar</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmit(onSubmit)}>
                  <Text>Continuar</Text>
                </TouchableOpacity>
              </View>
            </>
          ) : (
            <>
              <Text>Resumo dos Dados</Text>
              
              <View>
                <Text>Nome: {watch('nome') || 'Não informado'}</Text>
                <Text>E-mail: {watch('email') || 'Não informado'}</Text>
                <Text>Data de Nascimento: {watch('dataNascimento') || 'Não informado'}</Text>
                <Text>Celular: {watch('celular') || 'Não informado'}</Text>
                <Text>CEP: {watch('cep') || 'Não informado'}</Text>
                <Text>Endereço: {watch('endereco') || 'Não informado'}</Text>
                <Text>Número: {watch('numero') || 'Não informado'}</Text>
                <Text>Complemento: {watch('complemento') || 'Não informado'}</Text>
                <Text>Bairro: {watch('bairro') || 'Não informado'}</Text>
                <Text>Cidade: {watch('cidade') || 'Não informado'}</Text>
                <Text>UF: {watch('uf') || 'Não informado'}</Text>
              </View>

              <TouchableOpacity onPress={handleBack}>
                <Text>Voltar</Text>
              </TouchableOpacity>
            </>
          )}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}