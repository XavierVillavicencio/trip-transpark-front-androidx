import {
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
  TouchableOpacity,
} from 'react-native';
import {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation';
import {AuthContext} from '../../context';
import {Headline, Text} from 'react-native-paper';
import React = require('react');

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function TermsConditions({navigation}: Props) {
  const {errorMessage, removeError} = useContext(AuthContext);
  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require('../../imgs/Grupo_2280.png')}
        style={styles.imageLogos}
        resizeMode="stretch"
      />
      <TouchableOpacity onPress={() => navigation.goBack()}>
        <Image
          source={require('../../imgs/buttonBack.png')}
          style={styles.imageButtonBack}
          resizeMode="stretch"
        />
      </TouchableOpacity>
      <Headline style={styles.Headline}>
        TÉRMINOS Y CONDICIONES DE USO “TRANSPARK”
      </Headline>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.bold}>
          1. Aceptación de los Términos y Condiciones
        </Text>
        <Text style={styles.regular}>
          Transacciones y Tecnología Transtec S.A. (en adelante “TRASNTEC S.A.”)
          prestan servicios a los usuarios para la utilización de la aplicación
          “TRANSPARK” móvil de gestión de estacionamiento con pago en línea (en
          adelante, la aplicación “TRANSPARK”), usted acepta cumplir y estar
          sujeto a estos Términos y Condiciones de Uso (en adelante, los
          &quot;Términos&quot;). Si no está de acuerdo con alguno de los
          términos o no entiende alguna de las disposiciones aquí contenidas, le
          recomendamos que deje de utilizar la aplicación “TRANSPARK” de
          inmediato.
        </Text>
        <Text style={styles.bold}>2. Uso de la aplicación “TRANSPARK”</Text>
        <Text style={styles.regular}>
          2.1. Usted declara y garantiza que tiene al menos dieciocho (18) años
          de edad y posee la capacidad legal para celebrar un contrato
          vinculante con nosotros.
        </Text>
        <Text style={styles.regular}>
          2.2. Usted se compromete a utilizar la aplicación “TRANSPARK” de
          manera coherente con todas las leyes y regulaciones aplicables.
        </Text>
        <Text style={styles.regular}>
          2.3. Usted es responsable de mantener la confidencialidad de su
          información de inicio de sesión y es responsable de todas las
          actividades que ocurran bajo su cuenta.
        </Text>
        <Text style={styles.bold}>3. Registro y Cuenta del Usuario</Text>
        <Text style={styles.regular}>
          3.1. Para utilizar ciertas funciones de la aplicación “TRANSPARK”,
          puede ser necesario que se registre y cree una cuenta de usuario.
        </Text>
        <Text style={styles.regular}>
          3.2. Usted se compromete a proporcionar información precisa,
          actualizada y completa durante el proceso de registro y a mantener su
          información actualizada.
        </Text>
        <Text style={styles.bold}>4. Pagos y Tarifas</Text>
        <Text style={styles.regular}>
          4.1. Al utilizar la aplicación “TRANSPARK” para pagar el
          estacionamiento, usted acepta pagar todas las tarifas aplicables según
          lo establecido en la aplicación “TRANSPARK”.
        </Text>
        <Text style={styles.regular}>
          4.2. Las tarifas pueden estar sujetas a cambios en cualquier momento a
          nuestra discreción.
        </Text>
        <Text style={styles.bold}>5. Privacidad</Text>
        <Text style={styles.regular}>
          5.1. Su uso de la aplicación “TRANSPARK” está sujeto a nuestra
          Política de Privacidad, que forma parte integral de estos Términos o
          la puede encontrar en la aplicación como “Políticas de Seguridad”.
        </Text>
        <Text style={styles.bold}>6. Derechos de Propiedad Intelectual</Text>
        <Text style={styles.regular}>
          6.1. La aplicación “TRANSPARK” y su contenido están protegidos por
          derechos de propiedad intelectual y son propiedad exclusiva de
          Transacciones y Tecnología Transtec S.A. o sus licenciantes.
        </Text>
        <Text style={styles.regular}>
          6.2. Usted se compromete a no copiar, modificar, distribuir, vender o
          realizar ingeniería inversa de la aplicación “TRANSPARK”.
        </Text>
        <Text style={styles.bold}>7. Limitación de Responsabilidad</Text>
        <Text style={styles.regular}>
          7.1. En la medida permitida por la ley, Transacciones y Tecnología
          Transtec S.A. no será responsable de ningún daño indirecto,
          incidental, especial o consecuente que surja del uso de la aplicación
          “TRANSPARK”.
        </Text>
        <Text style={styles.bold}>8. Rescisión</Text>
        <Text style={styles.regular}>
          8.1. Podemos rescindir o suspender su acceso a la aplicación
          “TRANSPARK” en cualquier momento, por cualquier motivo, sin previo
          aviso.
        </Text>
        <Text style={styles.bold}>9. Modificaciones de los Términos</Text>
        <Text style={styles.regular}>
          9.1. Nos reservamos el derecho de modificar estos Términos en
          cualquier momento. Los cambios entrarán en vigor después de la
          publicación de los Términos actualizados en la aplicación “TRANSPARK”.
        </Text>
        <Text style={styles.bold}>10. Ley Aplicable y Jurisdicción</Text>
        <Text style={styles.regular}>
          10.1. Estos Términos se regirán e interpretarán de acuerdo con las
          leyes del Ecuador y cualquier disputa se someterá a la jurisdicción
          exclusiva de los tribunales de Quito.
        </Text>
        <Text style={styles.regular}>
          Al utilizar la aplicación “TRANSPARK”, usted acepta estos Términos y
          Condiciones de Uso en su totalidad. Si no está de acuerdo con estos
          términos, no utilice la aplicación “TRANSPARK”.
        </Text>
        <Text style={styles.regular}>
          Transacciones y Tecnología Trasntec S.A., Quito- Ecuador Av. Amazonas
          34-311, 2261703, info@transtec.com.ec, www.transtec.com.ec
        </Text>
        <Text style={styles.regular}>
          Última actualización: sábado, 30 de septiembre 2023
        </Text>
        <Text style={styles.regular}>
          Última actualización: martes, 17 de octubre 2023
        </Text>
        <Text style={styles.regular}>
          Por favor, lea estos términos y condiciones cuidadosamente antes de
          utilizar la aplicación “TRANSPARK”.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  imageButtonBack: {
    marginVertical: 30,
    marginHorizontal: 50,
  },
  imageLogos: {
    width: '90%',
    alignSelf: 'flex-start',
    marginHorizontal: 25,
  },
  bold: {
    fontWeight: 'bold',
    marginTop: 5,
    marginBottom: 0,
    fontFamily: 'Lato-Black',
  },
  regular: {
    marginTop: 5,
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
    marginHorizontal: 10,
    textAlign: 'justify',
  },
  Headline: {
    marginTop: 10,
    marginBottom: 0,
    fontFamily: 'Lato-Bold',
    marginHorizontal: 20,
    fontSize: 18,
    lineHeight: 20,
  },
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
  },
  scrollView: {
    marginHorizontal: 25,
    marginVertical: 10,
  },
});
