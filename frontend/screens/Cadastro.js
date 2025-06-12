import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Dimensions,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
  SafeAreaView
} from 'react-native';
import { useForm, Controller } from 'react-hook-form';
import axios from 'axios';
import { useNavigation } from '@react-navigation/native';

export default function Cadastro() {
  const { control, handleSubmit, setValue, watch, formState: { errors } } = useForm({
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

  
  const [dataError, setDataError] = useState({ 
    invalido: false, 
    mensagem: '' 
  });
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [cepError, setCepError] = useState(false);
  
  const [mostrarResumo, setMostrarResumo] = useState(false);
  const navigation = useNavigation();

  const formatarCelular = (value) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 2) return nums;
    if (nums.length <= 6) return `(${nums.slice(0, 2)}) ${nums.slice(2)}`;
    if (nums.length <= 10) return `(${nums.slice(0, 2)}) ${nums.slice(2, 6)}-${nums.slice(6)}`;
    return `(${nums.slice(0, 2)}) ${nums.slice(2, 7)}-${nums.slice(7, 11)}`;
  };

  const formatarData = (value) => {
    // Remove tudo que não é dígito
    let nums = value.replace(/\D/g, '');
    
    // Limita a 8 dígitos (DDMMYYYY)
    if (nums.length > 8) nums = nums.substring(0, 8);
    
    // Adiciona as barras automaticamente
    if (nums.length > 4) {
      nums = `${nums.substring(0, 2)}/${nums.substring(2, 4)}/${nums.substring(4)}`;
    } else if (nums.length > 2) {
      nums = `${nums.substring(0, 2)}/${nums.substring(2)}`;
    }
  
    // Chama a validação enquanto digita
    handleDataChange(nums);
    
    return nums;
  };

// Adicione esta função acima do componente ou dentro dele
  const validarData = (dataStr) => {
    const [diaStr, mesStr, anoStr] = dataStr.split('/');
    const dia = parseInt(diaStr, 10);
    const mes = parseInt(mesStr, 10);
    const ano = parseInt(anoStr, 10);

    // Verifica se os valores são números válidos
    if (isNaN(dia) || isNaN(mes) || isNaN(ano)) {
      return { valido: false, mensagem: 'Data inválida' };
    }

    // Verifica mês válido (1-12)
    if (mes < 1 || mes > 12) {
      return { valido: false, mensagem: 'Mês deve estar entre 01 e 12' };
    }

    // Verifica ano válido (não negativo)
    if (ano < 0) {
      return { valido: false, mensagem: 'Ano inválido' };
    }

    // Verifica dias por mês
    const diasPorMes = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

    // Verifica se é ano bissexto para fevereiro
    const isBissexto = (ano % 4 === 0 && ano % 100 !== 0) || ano % 400 === 0;
    if (isBissexto && mes === 2) {
      diasPorMes[1] = 29;
    }

    const maxDias = diasPorMes[mes - 1];
    if (dia < 1 || dia > maxDias) {
      return { 
        valido: false, 
        mensagem: mes === 2 && isBissexto 
          ? 'Fevereiro tem no máximo 29 dias neste ano' 
          : `Mês ${mes} tem no máximo ${maxDias} dias`
      };
    }

    // Verifica se a data não está no futuro
    const hoje = new Date();
    const dataNasc = new Date(ano, mes - 1, dia);
    if (dataNasc > hoje) {
      return { valido: false, mensagem: 'Data não pode ser no futuro' };
    }

    // Verifica se a data não é muito antiga (idade máxima 150 anos)
    const idade = hoje.getFullYear() - ano;
    if (idade > 150) {
      return { valido: false, mensagem: 'Idade máxima permitida é 150 anos' };
    }

    return { valido: true };
  };

  const particulas = [
  'de', 'da', 'das', 'do', 'dos', 'e',
  'van', 'von', 'der', 'den', 'ten', 'ter',
  'di', 'dei', 'del', 'della', 'delle', 'degli',
  'des', 'du', 'd\'', 'y', 'del', 'de', 'las', 'los',
  'die', 'das', 'und', 'zu', 'van den', 'van der'
];

const validarNome = (nome) => {

  if (!/^[a-zA-ZÀ-ÿ\s']+$/.test(nome)) {
    return 'Nome deve conter apenas letras e espaços';
  }

  const nomes = nome.trim().split(/\s+/);
  
  // Verifica se tem pelo menos nome e sobrenome (ignorando partículas)
  const nomesValidos = nomes.filter(n => n.length > 2 && !particulas.includes(n.toLowerCase()));
  
  if (nomesValidos.length < 2) {
    return 'Digite nome e sobrenome válidos (mín. 3 letras cada, ignorando partículas)';
  }
  
  // Verifica se o primeiro e último nome têm pelo menos 2 caracteres
  if (nomes[0].length < 2 || nomes[nomes.length - 1].length < 2) {
    return 'Primeiro e último nome devem ter pelo menos 2 letras';
  }
  
  return true;
};

const formatarNomeResumo = (nome) => {
  if (!nome) return 'Não informado';
  
  return nome.split(/\s+/)
    .map((parte, index, array) => {
      const parteLower = parte.toLowerCase();
      
      // Se for partícula e não for a primeira palavra
      if (particulas.includes(parteLower) && index > 0 && index !== array.length - 1) {
        return parteLower;
      }
      
      // Capitaliza a primeira letra
      return parte.charAt(0).toUpperCase() + parte.slice(1).toLowerCase();
    })
    .join(' ');
};

  // Modifique a função handleDataChange para usar a nova validação
  const handleDataChange = (value) => {
    const partes = value.split('/');
    const dia = partes[0] || '';
    const mes = partes[1] || '';
    const ano = partes[2] || '';

    // Validação progressiva conforme o usuário digita
    if (dia.length === 2) {
      const diaNum = parseInt(dia, 10);
      if (diaNum < 1 || diaNum > 31) {
        setDataError({
          invalido: true,
          mensagem: 'Dia deve estar entre 01 e 31'
        });
        return;
      }
    }

    if (mes.length === 2) {
      const mesNum = parseInt(mes, 10);
      if (mesNum < 1 || mesNum > 12) {
        setDataError({
          invalido: true,
          mensagem: 'Mês deve estar entre 01 e 12'
        });
        return;
      }
    }

    // Validação completa quando todos os campos estão preenchidos
    if (value.length === 10) {
      const validacao = validarData(value);
      setDataError({
        invalido: !validacao.valido,
        mensagem: validacao.mensagem || ''
      });
      return;
    }

    // Se passou por todas as validações sem erros
    setDataError({
      invalido: false,
      mensagem: ''
    });
  };

  const formatarCEP = (value) => {
    const nums = value.replace(/\D/g, '');
    if (nums.length <= 5) return nums;
    return `${nums.slice(0, 5)}-${nums.slice(5, 8)}`;
  };

  const fetchCEP = async (cep) => {
    if (cep.length !== 8) return;
    setLoadingCEP(true);
    setCepError(false);

    try {
      const response = await axios.get(`https://viacep.com.br/ws/${cep}/json/`);
      const data = response.data;
      if (!data.erro) {
        setValue('endereco', data.logradouro || '');
        setValue('bairro', data.bairro || '');
        setValue('cidade', data.localidade || '');
        setValue('uf', data.uf || '');
      } else {
        setCepError(true);
      }
    } catch (error) {
      setCepError(true);
    } finally {
      setLoadingCEP(false);
    }
  };

  const handleCEPChange = (value) => {
    const formatted = formatarCEP(value);
    setValue('cep', formatted.replace(/\D/g, '')); // Armazena apenas números
    if (formatted.replace(/\D/g, '').length === 8) {
      fetchCEP(formatted.replace(/\D/g, ''));
    }
    return formatted; // Retorna o valor formatado para exibição
  };

  const onSubmit = (data) => {
    if (dataError.invalido) {
    Alert.alert('Data inválida', dataError.mensagem);
    return;
  }
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
            {/* Nome */}
            <Controller
  name="nome"
  control={control}
  rules={{
    required: 'Nome é obrigatório',
    validate: validarNome
  }}
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
            {errors.nome && <Text style={styles.error}>{errors.nome.message}</Text>}

            {/* Data de Nascimento */}
            <Controller
              name="dataNascimento"
              control={control}
              rules={{ 
                required: 'Data de nascimento é obrigatória',
                pattern: {
                  value: /^(0[1-9]|[12][0-9]|3[01])\/(0[1-9]|1[0-2])\/\d{4}$/,
                  message: 'Formato inválido (DD/MM/YYYY)'
                }
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  style={styles.input}
                  placeholder="Data de Nascimento - dd/mm/aaaa"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={10}
                  onChangeText={(text) => {
                    const formatted = formatarData(text);
                    field.onChange(formatted);
                    handleDataChange(formatted);
                  }}
                />
              )}
            />
            {(dataError.invalido) && (
  <Text style={styles.error}>
    {dataError.mensagem}
  </Text>
)}

            {/* E-mail */}
            {/* E-mail */}
<Controller
  name="email"
  control={control}
  rules={{ 
    required: 'E-mail é obrigatório',
    pattern: {
      value: /^[a-zA-Z0-9._%+-]{3,}@[a-zA-Z0-9.-]{3,}\.[a-zA-Z]{2,}$/,
      message: 'Formato inválido (mín. 3 caracteres antes do @, mín. 3 caracteres depois e domínio com mín. 2 caracteres)'
    }
  }}
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
{errors.email && <Text style={styles.error}>{errors.email.message}</Text>}

            {/* Celular */}
            <Controller
              name="celular"
              control={control}
              rules={{ required: 'Celular é obrigatório' }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  style={styles.input}
                  placeholder="Celular - (XX) XXXXX-XXXX"
                  placeholderTextColor="#ccc"
                  keyboardType="phone-pad"
                  maxLength={15}
                  onChangeText={(text) => field.onChange(formatarCelular(text))}
                />
              )}
            />
            {errors.celular && <Text style={styles.error}>{errors.celular.message}</Text>}

            {/* CEP */}
            <Controller
              name="cep"
              control={control}
              rules={{ 
                required: 'CEP é obrigatório',
                pattern: {
                  value: /^\d{5}-?\d{3}$/,
                  message: 'Formato inválido (XXXXX-XXX)'
                }
              }}
              render={({ field }) => (
                <TextInput
                  {...field}
                  style={styles.input}
                  placeholder="CEP - XXXXX-XXX"
                  placeholderTextColor="#ccc"
                  keyboardType="numeric"
                  maxLength={9}
                  onChangeText={(text) => {
                    const formatted = formatarCEP(text);
                    field.onChange(formatted);
                    handleCEPChange(formatted);
                  }}
                  value={formatarCEP(field.value)}
                />
              )}
            />
            {loadingCEP && <ActivityIndicator size="small" color="#FFD640" />}
            {cepError && <Text style={styles.error}>CEP inválido</Text>}

            {/* Endereço */}
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

            {/* Número (obrigatório) */}
            <Controller
              name="numero"
              control={control}
              rules={{ 
                required: 'Número é obrigatório',
                pattern: {
                  value: /^\d+$/,
                  message: 'Apenas números são permitidos'
                },
                maxLength: {
                  value: 10,
                  message: 'Máximo de 10 dígitos'
                }
              }}
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
            {errors.numero && <Text style={styles.error}>{errors.numero.message}</Text>}

            {/* Complemento (opcional) */}
            <Controller
              name="complemento"
              control={control}
              rules={{
                validate: (value) => {
                  if (!value) return true; // Field is optional
                  return /[a-zA-Z]/.test(value) || 'Deve conter pelo menos uma letra';
                }
              }}
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
            {errors.complemento && <Text style={styles.error}>{errors.complemento.message}</Text>}

            {/* Bairro */}
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

            {/* Cidade */}
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
            {/* UF */}
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
  <Text style={styles.resumeLabel}>Nome:</Text> {formatarNomeResumo(watch('nome'))}
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
  <Text style={styles.resumeLabel}>CEP:</Text> {watch('cep') ? formatarCEP(watch('cep')) : 'Não informado'}
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
  error: {
    color: '#FFD640',
    marginBottom: 8
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
