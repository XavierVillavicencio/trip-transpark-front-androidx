import {
  Image,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  StatusBar,
} from 'react-native';
import {useContext} from 'react';
import {StackScreenProps} from '@react-navigation/stack';
import {AuthStackParams} from '../../navigation';
import {AuthContext} from '../../context';

import {Headline, Text} from 'react-native-paper';
import React = require('react');
import {TouchableOpacity, FlatList, View} from 'react-native';

interface Props extends StackScreenProps<AuthStackParams, any> {}

export function Privacy({navigation}: Props) {
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
        POLÍTICA DE PROTECCIÓN DE DATOS PERSONALES ECUADOR TRANSTEC S.A.
      </Headline>
      <ScrollView style={styles.scrollView}>
        <Text style={styles.bold}>1. ANTECEDENTES PRELIMINARES</Text>
        <Text style={styles.regular}>
          Esta política de protección de datos personales (en lo sucesivo
          denominada Política de protección de datos personales o simplemente
          Política) establece las prácticas de recopilación y transmisión de los
          datos personales en los Canales digitales con el objetivo de
          informarle de las maneras en las que a través de nuestro sitio web
          (www.transtec.com.ec) o a través de nuestra aplicación TransPark para
          dispositivos móviles (en adelante, la “Aplicación”) recopilamos sus
          datos personales, del uso que se le da a dicha información y las
          formas en que compartiremos cualquier dato personal que decide
          proporcionar a{' '}
          <Text style={styles.boldNoSpacer}>
            TRANSACCIONES Y TECNOLOGÍA TRANSTEC S.A. (En adelante TRANSTEC
            S.A.).
          </Text>
        </Text>
        <Text style={styles.regular}>
          Por favor, tómese el tiempo suficiente para leer esta Política
          detenidamente.
        </Text>
        <Text style={styles.regular}>
          Los Canales digitales pueden contener enlaces a sitios web de
          terceros. Si accede a un sitio web de terceros a través de uno de
          dichos enlaces, tenga en cuenta que presentan sus propias políticas de
          protección de datos personales, por lo que TRANSTEC S.A. no acepta
          responsabilidad alguna por las mismas o por el procesamiento de los
          datos personales que se realice en dichos sitios web. Revise las
          políticas correspondientes antes de enviar información personal a
          tales sitios web de terceros.
        </Text>
        <Text style={styles.regular}>
          Esta Política aplica a todos los usuarios de nuestra Aplicación.
        </Text>
        <Text style={styles.regular}>
          Al dar su consentimiento a la siguiente Política, usted autoriza
          expresamente{' '}
          <Text style={styles.boldNoSpacer}>
            TRANSACCIONES Y TECNOLOGÍA TRANSTEC S.A. (En adelante TRANSTEC
            S.A.).
          </Text>{' '}
          y por tanto otorga su aceptación expresa para que TRANSTEC S.A.
          recopile, procese, use y trate sus datos personales, de conformidad
          con la normativa vigente en Ecuador, así como cualquier norma que la
          modifique o reemplace en el futuro. (la “Normativa”).
        </Text>
        <Text style={styles.regular}>
          Los usuarios garantizan y responden, en cualquier caso, de la
          veracidad, exactitud, vigencia y autenticidad de los Datos Personales
          facilitados, y se comprometen a mantenerla debidamente actualizada.
        </Text>
        <Text style={styles.bold}>2. PRINCIPIOS QUE ORIENTAN LA POLÍTICA</Text>
        <Text style={styles.regular}>
          TRANSTEC S.A. y sus sociedades relacionadas por vínculos de
          subordinación o control en Ecuador o en una jurisdicción o territorio
          diferente (en adelante las "Sociedades Relacionadas"), en el
          tratamiento de la información de sus usuarios, respeta y respetará sus
          derechos, aplicando y garantizando los siguientes principios
          orientadores de la Política:
        </Text>
        <Text style={styles.regular}>
          a) Principio de Juridicidad: En el tratamiento de datos personales de
          los usuarios se dará aplicación a las disposiciones vigentes y
          aplicables, incluyendo las disposiciones contractuales pactadas con
          los usuarios.
        </Text>
        <Text style={styles.regular}>
          b) Principio de Libertad: El tratamiento y transferencia de datos
          personales sólo se llevará a cabo con el consentimiento, libre,
          previo, informado, específico e inequívoco del usuario. Los datos
          personales que no tengan el carácter de datos públicos en los términos
          de la Normativa, no podrán ser obtenidos o divulgados sin previa
          autorización escrita de su titular, o en ausencia de mandato legal o
          judicial que releve el consentimiento.
        </Text>
        <Text style={styles.regular}>
          c) Principio de Finalidad: El tratamiento de datos personales a los
          que tenga acceso y sean almacenados y recogidos por TRANSTEC S.A.,
          estarán subordinados y atenderán una finalidad determinadas,
          explícitas, legítimas y comunicadas al título.
        </Text>
        <Text style={styles.regular}>
          d) Principio de Calidad y Exactitud: La información protegida sujeta a
          tratamiento debe ser exactos, íntegros, precisos, completos,
          comprobables, claros; y, de ser el caso, debidamente actualizados
          TRANSTEC S.A. no será responsable frente al usuario cuando sean objeto
          de tratamiento, datos o información parcial, incompleta o fraccionada
          o que induzca a error, que hubiere sido proporcionada por el usuario
          sin que existiera la forma de ser verificada la veracidad o calidad de
          la misma por parte de TRANSTEC S.A. o si la misma hubiere sido
          entregada o divulgada por el usuario declarando o garantizando, de
          cualquier forma, su veracidad o calidad. El usuario tendrá derecho a
          solicitar en cualquier momento que se corrijan o actualicen los datos
          que fueren inexactos, incompletos, erróneos, falsos, incorrectos o
          imprecisos.
        </Text>
        <Text style={styles.regular}>
          e) Principio de Transparencia: El tratamiento de datos personales
          deberá ser transparente, por lo que toda información o comunicación
          relativa a este tratamiento deberá ser fácilmente accesible y fácil de
          entender y se deberá utilizar un lenguaje sencillo y claro.
        </Text>
        <Text style={styles.regular}>
          f) Principio de Seguridad: Los datos personales protegidos bajo la
          Política sujetos a tratamiento por TRANSTEC S.A., serán objeto de
          protección de conformidad a los estándares normales de la industria, a
          través de la adopción de medidas tecnológicas de protección,
          protocolos, y medidas administrativas que sean necesarias para otorgar
          seguridad a los registros y repositorios electrónicos evitando su
          adulteración, modificación, pérdida, consulta, y, en general, en
          contra de cualquier uso, acceso o tratamiento no autorizado.
        </Text>
        <Text style={styles.regular}>
          g) Principio de Confidencialidad: El tratamiento de datos personales
          debe concebirse sobre la base del debido sigilo y secreto, es decir,
          no debe tratarse o comunicarse para un fin distinto para el cual
          fueron recogidos, a menos que concurra una de las causales que
          habiliten un nuevo tratamiento conforme los supuestos de tratamiento
          legítimo señalados la Ley.
        </Text>
        <Text style={styles.regular}>
          h) Principio de Conservación: Los datos personales serán conservados
          durante un tiempo no mayor al necesario para cumplir con la finalidad
          de su tratamiento.
        </Text>
        <Text style={styles.regular}>
          i) Principio de Lealtad: El tratamiento de datos personales deberá ser
          leal, por lo que para los titulares debe quedar claro que se están
          recogiendo, utilizando, consultando o tratando de otra manera, datos
          personales que les conciernen, así como las formas en que dichos datos
          son o serán tratados.
        </Text>
        <Text style={styles.regular}>
          j) Principio de Pertinencia y minimización de datos personales: Los
          datos personales deben ser pertinentes y estar limitados a lo
          estrictamente necesario para el cumplimiento de la finalidad del
          tratamiento.
        </Text>
        <Text style={styles.regular}>
          k) Principio de Proporcionalidad: El tratamiento debe ser adecuado,
          necesario, oportuno, relevante y no excesivo con relación a las
          finalidades para las cuales hayan sido recogidos o a la naturaleza
          misma, de las categorías especiales de datos.
        </Text>
        <Text style={styles.bold}>
          3. INFORMACIÓN QUE TRANSTEC S.A. RECOPILA Y USO DE LA INFORMACIÓN
          RECOPILADA
        </Text>
        <Text style={styles.regular}>
          El responsable de los datos y de las bases de datos donde se almacenan
          es TRANSTEC S.A., con domicilio en Av. Amazonas N35-311 y Av.
          Atahualpa, parroquia Iñaquito, Ciudad de Quito (Provincia de
          Pichincha, Ecuador). Somos responsables de los datos de carácter
          personal proporcionados a través de la aplicación, así como los que
          pudiera facilitar en el futuro en el marco de su relación con
          nosotros.
        </Text>
        <Text style={styles.regular}>
          A continuación, informamos a nuestros usuarios qué datos recolectamos,
          para qué propósitos y bajo qué circunstancias los compartimos con
          otros.
        </Text>
        <Text style={styles.regular}>
          a){' '}
          <Text style={styles.boldNoSpacer}>
            Información proporcionada por el usuario:
          </Text>
          Los datos personales que proporciona el usuario incluyen los datos
          introducidos dentro de la aplicación o dentro de nuestro sitio web, y
          pueden incluir datos identificativos, de contacto entre otros.
        </Text>
        <Text style={styles.regular}>
          b) <Text style={styles.boldNoSpacer}>Información de encuestas:</Text>{' '}
          Podemos pedirle que complete encuestas que utilizamos con fines de
          investigación. En tales circunstancias, se recopiló la información
          proporcionada en dichas encuestas.
        </Text>
        <Text style={styles.regular}>
          c) <Text style={styles.boldNoSpacer}>Uso de la Aplicación:</Text>{' '}
          Cuando un usuario visita la aplicación, se recopilan detalles e
          información de dichas visitas a través de cookies y otras tecnologías
          de seguimiento. Entre esta información, se incluye su dirección IP y
          nombre de dominio, la versión del navegador y el sistema operativo,
          datos de tráfico y ubicación, registros web, los recursos a los que
          accede y otros datos de comunicación.
        </Text>
        <Text style={styles.regular}>
          d){' '}
          <Text style={styles.boldNoSpacer}>
            Datos suministrada por otras fuentes:
          </Text>{' '}
          Podemos recopilar sus datos personales de fuentes públicas y de
          terceros.
        </Text>

        <Text style={styles.bold}>4. TIPOLOGÍAS DE DATOS QUE RECOLECTAMOS</Text>
        <Text style={styles.regular}>
          Los datos personales son información con la que podemos relacionar a
          nuestros usuarios directa o indirectamente, tales como su nombre y
          apellidos, dirección, número de teléfono, fecha de nacimiento, datos
          de localización o dirección de correo electrónico y todo otro dato que
          usted voluntariamente nos provea.
        </Text>
        <Text style={styles.regular}>
          A continuación, le mostramos qué datos recolectamos:
        </Text>
        <Text style={styles.bold}>
          a) Cuando usted visita nuestra Aplicación, pero no se registra
          ninguna, operación o servicio, recopilamos los siguientes datos
          personales:
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>i. Datos identificativos: </Text>
          Identificación del dispositivo, otros identificadores del dispositivo,
          hardware.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>ii. Datos de comportamiento: </Text>
          Duración de uso del sitio web y origen.
        </Text>
        <Text style={styles.bold}>
          b) Si no sólo visita la Aplicación, sino que también desea iniciar
          sesión para ver, por ejemplo, sus antiguas transacciones, además de
          los datos antes mencionados, recopilamos los siguientes datos
          personales:
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>i. Datos de identificación: </Text>
          Nombre de usuario y contraseña
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>ii. Datos de contacto: </Text>
          Teléfono, correo electrónico, dirección domiciliaria, fecha de
          nacimiento
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            iii. Información de conexión:{' '}
          </Text>
          Hora, fecha, duración de uso del sitio web y origen
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>iv. Otra información: </Text>
          Información que el usuario nos provea voluntariamente mientras utiliza
          la aplicación e información de otras fuentes tales como redes sociales
          o aplicaciones que utilicen nuestra interfaz de conexión u otras bases
          de datos públicas.
        </Text>
        <Text style={styles.regular}>
          En cualquiera de los casos antes indicados, por favor tenga presente
          que toda información que usted nos provea según lo antes descrito,
          TRANSTEC S.A. la considera datos personales y por tanto si nos provee
          datos personales de otra persona, TRANSTEC S.A. no será responsable de
          obtener el consentimiento previo de esa otra persona para tratar
          dichos datos personales según estas Políticas de protección de datos
          personales, carga que le será imputable a usted de forma exclusiva por
          hacer uso y tratamiento de datos personales de terceros, entendiéndose
          en todo momento que, respecto de dichos datos, es usted es el
          Responsable del Tratamiento.
        </Text>
        <Text style={styles.bold}>
          5. USO DE LOS DATOS PERSONALES DE LOS USUARIOS
        </Text>
        <Text style={styles.regular}>
          En esta sección, se establecen los fines por los que se recopila los
          datos personales del usuario mediante los canales digitales y, de
          acuerdo con las obligaciones que impone la legislación ecuatoriana, se
          identifican las razones jurídicas que fundamentan el procesamiento de
          la información.
        </Text>
        <Text style={styles.regular}>
          Estas razones jurídicas se recogen en la Ley Orgánica de Protección de
          Datos, que permite a las empresas procesar datos personales únicamente
          de acuerdo con las razones jurídicas específicas que se establecen en
          la ley.
        </Text>
        <Text style={styles.regular}>
          Tenga en cuenta que, además de las divulgaciones que se identifican a
          continuación, se puede revelar información personal por los fines que
          se explican en este documento a proveedores, contratistas, agentes,
          consejeros (ya sean legales, financieros, comerciales o de otro tipo)
          de TRANSTEC S.A. que actúen en nuestro nombre.
        </Text>
        <Text style={styles.regular}>
          Solo recolectamos sus datos personales, previa su autorización, cuando
          sea estrictamente necesario para el cumplimiento de las obligaciones
          contractuales y cuya finalidad sea lícita y previamente definida.
          TRANSTEC S.A. recopila y usa su información personal para los
          propósitos especificados en esta Política.. Los datos serán
          almacenados y custodiados por TRANSTEC S.A. por todo el tiempo que
          usted se encuentre activo en nuestra plataforma.
        </Text>
        <Text style={styles.regular}>
          TRANSTEC S.A. utiliza su información para los siguientes fines:
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>a. Prestación de servicios: </Text>
          Utilizamos sus datos personales para ofrecer, personalizar, mantener y
          mejorar la prestación de los servicios que les ofrecemos a nuestros
          usuarios, así como realizar las siguientes actividades:
        </Text>
        <View>
          <FlatList
            data={[
              {key: 'Administrar el sitio web.'},
              {key: 'Crear y actualizar su cuenta.'},
              {key: 'Verificar su perfil.'},
              {
                key: 'Mejorar su experiencia de navegación personalizando la Aplicación.',
              },
              {
                key: 'Habilitarlo a usted para el uso de los servicios disponibles en la Aplicación',
              },
              {
                key: 'Enviarle comunicados comerciales generales vía correo electrónico.',
              },
              {
                key: 'Realizar comentarios y valoraciones de los comercios adheridos, su oferta y productos.',
              },
              {key: 'Procesar y realizar el pago de los servicios.'},
              {key: 'Activar funciones para personalizar su cuenta'},
            ]}
            renderItem={({item}) => {
              return (
                <View>
                  <Text
                    style={styles.regularNoSpacer}>{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
          />
        </View>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            b. Servicio de atención al cliente:{' '}
          </Text>
          Cuando el usuario se pone en contacto con nuestro Servicio de Atención
          al Cliente para obtener información o para presentar un reclamo,
          almacenamos la información que el usuario nos proporciona. A modo de
          ejemplo: la razón para contactarnos o en qué entrega faltaba algo.
          Dependiendo del motivo del contacto, los datos personales pueden
          variar. Como queremos mejorar nuestro servicio para usted, almacenamos
          la comunicación en su cuenta. De esta manera podemos responder a sus
          preguntas con mayor rapidez.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>c. Protección de seguridad: </Text>
          Utilizamos sus datos personales para mantener la protección, seguridad
          e integridad de nuestros servicios y usuarios. Asimismo, utilizamos la
          información para prevenir fraudes.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            d. Investigación y desarrollo:
          </Text>
          Podemos utilizar la información que recopilamos para testear,
          investigar, analizar y desarrollar productos. Esto permite que podamos
          mejorar en términos de seguridad y que podamos desarrollar nuevas
          funciones o servicios.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>e. Publicidad: </Text>Podemos
          enviarte correos electrónicos, SMS, push notifications o realizar
          llamadas a tu móvil, teléfono fijo o cualquier otro dispositivo que
          sea susceptible de recibir llamadas para ofrecerte cupones, descuentos
          y promociones, realizar encuestas o sondeos de opinión para mejorar
          nuestro servicio y la calidad de este. El usuario puede oponerse al
          tratamiento posterior de los datos con fines publicitarios con cada
          correo electrónico o en los ajustes en la Aplicación.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>f. Marketing: </Text>Queremos evitar
          newsletters genéricas y medidas de marketing incontroladas. Por lo
          tanto, seleccionamos las ofertas que mejor se adapten a sus intereses
          y nos ponemos en contacto con usted si creemos que la información
          puede ser de su interés. Puede oponerse al tratamiento posterior de
          los datos con fines publicitarios con cada correo electrónico.TRANSTEC
          S.A. podrá utilizar la información para promocionar y procesar
          concursos y sorteos, entregas de premios y ofrecer publicidad y
          contenidos relacionados con nuestros servicios y los de nuestros
          socios comerciales o comercios adheridos.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            g. Procedimientos judiciales o requerimientos administrativos:
          </Text>
          Podremos utilizar sus datos personales en caso de que nos sea
          requerido por orden judicial o resolución administrativa, regulatoria,
          arbitral, administrativa, y en general, cuando sea requerido por
          cualquier autoridad gubernamental competente
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            h. Soporte de seguimiento de procesos:
          </Text>
          En situaciones TRANSTEC S.A. utilizará sus datos personales para dar
          seguimiento y soporte a las actividades descritas en el uso de
          tratamiento de datos. Para esto tomamos como base de legitimación el
          interés legítimo y el cumplimiento de obligaciones contractuales.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>i. Verificación de edad:</Text>
          Utilizamos sus datos personales para comprobar la mayoría de edad de
          los usuarios y proteger sus datos.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>j. Autentificación: </Text>
          Dentro del proceso de autentificación, utilizamos el resultado de la
          verificación biométrica realizada a través de tu dispositivo móvil. No
          almacenamos datos biométricos.
        </Text>
        <Text style={styles.bold}>
          6. CONSENTIMIENTO PARA EL USO DE DATOS PERSONALES
        </Text>
        <Text style={styles.regular}>
          Yo, [Titular de los Datos], en calidad de usuario de los
          estacionamientos del Centro Comercial (CCI), en adelante denominado
          "Titular de Datos", otorgo mi consentimiento expreso a Transtec, S.A.
          en adelante denominado "Responsable del Tratamiento", para el uso y
          tratamiento de mis datos personales bajo los siguientes términos y
          condiciones:
        </Text>

        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>Finalidad del Tratamiento: </Text>El
          Responsable del Tratamiento utilizará mis datos personales
          exclusivamente con el propósito de gestionar y operar los
          estacionamientos del CCI, incluyendo la prestación de servicios
          relacionados con la administración y seguridad de los mismos.
        </Text>

        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Confidencialidad y No Difusión:{' '}
          </Text>
          El Responsable del Tratamiento garantiza que mis datos personales
          serán tratados con absoluta confidencialidad y no serán difundidos,
          compartidos o vendidos a terceros sin mi consentimiento previo y
          expreso, excepto cuando la ley lo exija.
        </Text>

        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Responsable de la Protección de Datos:{' '}
          </Text>
          El Responsable del Tratamiento, Transtec S.A., asume la
          responsabilidad de la protección y seguridad de mis datos personales.
        </Text>

        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Derechos del Titular de Datos:{' '}
          </Text>
          En cualquier momento, como titular de mis datos personales, tengo el
          derecho de ejercer los derechos establecidos por la normativa
          aplicable, incluyendo el acceso, rectificación, supresión, oposición,
          limitación del tratamiento y portabilidad de mis datos. Para ejercer
          estos derechos, me comprometo a contactar a Transtec S.A., que actuará
          como responsable del manejo y protección de mis datos personales.
        </Text>
        <Text style={styles.regular}>
          El presente consentimiento es otorgado de forma voluntaria y libre, y
          comprendo que tengo derecho a revocar en cualquier momento, sin que
          esto afecte la legalidad del tratamiento previo a la revocación.
        </Text>

        <Text style={styles.bold}>7. SOBRE EL PAGO ONLINE</Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>PAGO ONLINE</Text>Puedes realizar el
          pago del servicio de estacionamiento y otros servicios de forma online
          y al hacerlo rigen los siguientes términos y condiciones:
        </Text>
        <Text style={styles.regular}>
          Recopilamos cierta información que nos resulta necesaria para procesar
          los pagos, como (i) correo electrónico brindado por el usuario (ii)
          número de teléfono móvil.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Entidades que nos ayudan con el funcionamiento de pago online{' '}
          </Text>
          Nos aseguramos de que todos los proveedores que pueden tener acceso a
          sus datos personales actúen de manera confidencial, leal y cumpliendo
          estrictamente la normativa aplicable sobre protección de datos. A tal
          fin, les exigimos que formalicen con nosotros acuerdos específicos que
          regulan la utilización por su parte de sus datos personales, por
          ejemplo, Contratos de Transmisión de Datos personales en los que se
          les exijan condiciones adecuadas de seguridad para el tratamiento de
          datos personales.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Entidades que prestan servicios de procesamiento de datos
          </Text>
          En TRANSTEC S.A. recurre a los proveedores financieros para ejecutar y
          procesar los pagos de los servicios que utilice el cliente, y son
          estos proveedores quienes recopilan la información de la tarjeta de
          crédito o débito del cliente, y dependerá de este último la
          autorización del pago.
        </Text>
        <Text style={styles.bold}>8. ACTUALIZACIÓN DE LA INFORMACIÓN</Text>
        <Text style={styles.regular}>
          El Usuario al utilizar el sistema manifiesta que todos los datos
          facilitados por el son ciertos y correctos, y se obliga a mantenerlos
          actualizados. El usuario será responsable de las informaciones falsas,
          excesivas o inexactas que proporcione. Si usted actualiza y/o modifica
          sus datos personales, “TRANSTEC S.A.” conservará la información
          personal anterior por motivos de seguridad y control del fraude por el
          tiempo en el cual usted se mantenga como usuario activo de la
          plataforma.
        </Text>
        <Text style={styles.bold}>
          9. CON QUIÉN COMPARTIMOS SUS DATOS PERSONALES
        </Text>
        <Text style={styles.regular}>
          En el evento que TRANSTEC S.A., en el ejercicio de sus actividades
          propias, utilice, transmita o transfiera internacionalmente datos
          personales garantizará el cumplimiento de los principios aplicables
          establecidos en la Sección 2 de la presente Política, así como la
          normativa aplicable.
        </Text>
        <Text style={styles.regular}>
          Concretamente TRANSTEC S.A., en el giro ordinario de sus negocios
          podrá incorporar la información que Ud. nos provea dentro de sus
          sistemas de información. TRANSTEC S.A., como responsable del
          tratamiento garantiza que los sistemas de información cumplen en su
          integridad la Política y la Normativa.
        </Text>
        <Text style={styles.regular}>
          El usuario reconoce con la aceptación de la Política que, de
          presentarse una venta, fusión, consolidación, cambio de control
          societario, transferencia sustancial de activos, reorganización o
          liquidación de TRANSTEC S.A., TRANSTEC S.A. podrá transferir, enajenar
          o asignar sus datos personales a una o más partes relevantes,
          incluidas Sociedades Relacionadas o terceros.
        </Text>
        <Text style={styles.regular}>
          En la siguiente sección le indicamos a quién le informamos sus datos y
          en qué condiciones, así como a qué países los transferimos.
        </Text>
        <Text style={styles.regular}>
          Terceros tienen acceso a los datos personales:
        </Text>
        <Text style={styles.bold}>Empresas relacionadas a TRANSTEC S.A.</Text>
        <Text style={styles.regular}>
          Podremos compartir datos con nuestras empresas relacionadas para
          facilitar y mejorar el procesamiento de nuestros datos sobre
          servicios. Por ejemplo, Estados Unidos, China y Ecuador, TRANSTEC S.A.
          procesa y almacena información en nombre de sus filiales
          internacionales. Así también podemos almacenar sus datos personales en
          los servicios tecnológicos de las empresas relacionadas en otros
          países en los que TRANSTEC S.A. cuenta con operaciones, cuando sea
          necesaria para prestar nuestros servicios.
        </Text>
        <Text style={styles.bold}>Comercios adheridos a TRANSTEC S.A.</Text>
        <Text style={styles.regular}>
          TRANSTEC S.A. almacena los datos estrictamente necesarios con los
          comercios adheridos a efectos de que los comercios adheridos puedan
          concretar los servicios de los usuarios.
        </Text>
        <Text style={styles.bold}>
          Proveedores de servicios y comercios adheridos a TRANSTEC S.A.
        </Text>
        <Text style={styles.regular}>
          TRANSTEC S.A. puede facilitar información a sus proveedores,
          consultores, socios de marketing, empresas de investigación y otros
          proveedores de servicios o socios comerciales. A modo de ejemplo
          TRANSTEC S.A. podrá facilitar información a:
        </Text>
        <View>
          <FlatList
            data={[
              {key: 'Procesadores y facilitadores de pagos'},
              {key: 'Proveedores de almacenamiento en la nube'},
              {
                key: 'Socios de marketing y proveedores de plataformas de marketing',
              },
              {key: 'Proveedores de análisis de datos'},
              {
                key: 'Proveedores de investigación, incluidos los que implementan estudios o proyectos de investigación en colaboración con TRANSTEC S.A. o en su nombre',
              },
              {
                key: 'Proveedores que ayudan a TRANSTEC S.A. a mejorar la seguridad de sus apps',
              },
              {
                key: 'Consultores y otros proveedores de servicios profesionales',
              },
              {key: 'Otros'},
            ]}
            renderItem={({item}) => {
              return (
                <View>
                  <Text
                    style={styles.regularNoSpacer}>{`\u2022 ${item.key}`}</Text>
                </View>
              );
            }}
          />
        </View>
        <Text style={styles.regular}>
          TRANSTEC S.A. podría compartir su información de otra manera que no
          sea la descrita en esta política si así se lo notificamos previamente
          y obtenemos de usted previamente la aceptación expresa
          correspondiente.
        </Text>
        <Text style={styles.bold}>10. A QUÉ PAÍSES TRANSFERIMOS SUS DATOS</Text>
        <Text style={styles.regular}>
          Procesamos sus datos principalmente dentro de Ecuador, China, Estados
          Unidos.
        </Text>
        <Text style={styles.regular}>
          Si desea obtener una copia de las medidas específicas que se aplican a
          la exportación de los datos personales póngase en contacto
          directamente con nosotros a través de: i) manera presencial por medio
          del balcón de servicio en nuestras oficinas; ii) enviando un correo
          electrónico a info@transtec.com.ec
        </Text>
        <Text style={styles.bold}>INFORMACIÓN ACERCA DE SUS DERECHOS</Text>
        <Text style={styles.regular}>
          Si tiene alguna pregunta acerca del uso de los datos personales,
          póngase en contacto con nosotros en primer lugar a través de los
          canales de contacto establecidos.
        </Text>
        <Text style={styles.regular}>
          En determinadas circunstancias, tiene el derecho de solicitar:
        </Text>
        <Text style={styles.regular}>
          a) Le proporcionaremos más detalles sobre el uso que hacemos de sus
          datos.
        </Text>
        <Text style={styles.regular}>
          b) Le proporcionaremos una copia de los datos personales que nos ha
          proporcionado en los lineamientos de la LOPDP.
        </Text>
        <Text style={styles.regular}>
          c) Actualizaremos cualquier dato que haya modificado o que haya
          cambiado y rectificamos cualquier inexactitud en los datos personales
          que tratamos en los lineamientos de la LOPDP.
        </Text>
        <Text style={styles.regular}>
          d) Eliminemos cualesquiera datos personales que ya no tengamos un
          fundamento legal para utilizar.
        </Text>
        <Text style={styles.regular}>
          e) Cuando el tratamiento se base en el consentimiento, retirar su
          consentimiento para que dejemos de realizar ese tratamiento concreto
          (véase la sección 5.1 sobre mercadeo).
        </Text>
        <Text style={styles.regular}>
          f) Oponerse a cualquier tratamiento basado en el interés legítimo
          cuando 1) No se afecten derechos y libertades fundamentales de
          terceros, la ley se lo permita y no se trate de información pública,
          de interés público o cuyo tratamiento está ordenado por la ley. 2) El
          tratamiento de datos personales tenga por objeto la mercadotecnia
          directa; el interesado tendrá derecho a oponerse en todo momento al
          tratamiento de los datos personales que le concierne, incluida la
          elaboración de perfiles; en cuyo caso los datos personales dejarán de
          ser tratados para dichos fines. 3) Cuando no sea necesario su
          consentimiento para el tratamiento como consecuencia de la
          concurrencia de un interés legítimo, previsto en el artículo 7, y se
          justifique en una situación concreta personal del titular, siempre que
          una ley no disponga lo contrario, a menos que nuestras razones para
          llevar a cabo dicho tratamiento superen cualquier perjuicio a sus
          derechos de protección de datos.
        </Text>
        <Text style={styles.regular}>
          g) Suspender el tratamiento de sus datos mientras en las siguientes
          situaciones: 1) Cuando el titular impugne la exactitud de los datos
          personales, mientras el responsable de tratamiento verifica la
          exactitud de los mismos; 2) El tratamiento sea ilícito y el interesado
          se oponga a la supresión de los datos personales y solicite en su
          lugar la limitación de su uso; 3) El responsable ya no necesite los
          datos personales para los fines del tratamiento, pero el interesado
          los necesite para la formulación, el ejercicio o la defensa de
          reclamaciones; y, 4) Cuando el interesado se haya opuesto al
          tratamiento en virtud del artículo 31 de la presente LOPDP, mientras
          se verifica si los motivos legítimos del responsable prevalecen sobre
          los del interesado.
        </Text>
        <Text style={styles.regular}>
          h) La portabilidad de sus datos en un formato compatible, actualizado,
          estructurado, común, interoperable y de lectura mecánica, preservando
          sus características; o a transmitirlos a otros responsables en los
          lineamientos de la LOPDP
        </Text>
        <Text style={styles.regular}>
          i) No ser sujeto de decisiones total o parcialmente automatizadas,
          incluida la elaboración de perfiles, que produzcan efectos jurídicos
          en él o que atenten contra sus derechos y libertades fundamentales.
        </Text>
        <Text style={styles.regular}>
          El ejercicio de estos derechos está sujeto a ciertas excepciones, en
          algunos casos establecidas en la Ley Orgánica de Protección de Datos
          Personales, para salvaguardar el interés público (p. ej., prevenir o
          detectar un acto ilícito) y los intereses de TRANSTEC S.A. (p. ej.,
          mantener privilegios legales). Si ejerce alguno de estos derechos, se
          verificará la legitimidad de la solicitud y recibirá una respuesta en
          el plazo de hasta quince (15) días.
        </Text>
        <Text style={styles.regular}>
          Si no está satisfecho con el uso que se hace de su información
          personal o de la respuesta que ha recibido al ejercer sus derechos,
          tiene derecho a presentar una queja ante la Autoridad de Protección de
          Datos Personales, a través de los canales que esta habilite para el
          efecto.
        </Text>
        <Text style={styles.regular}>
          Para gestionar y/o eliminar sus datos personales, usted puede ingresar
          a nuestra aplicación o sitio web (www.transtec.com.ec) y dirigirse a
          “Menú” {'->'} “Ayuda en Línea” {'->'}servicioalcliente@transtec.com.ec
          “”.Una vez finalizado el procedimiento de eliminación de sus datos
          personales, “TRANSTEC S.A.” no tendrá registro alguno de sus datos
          personales en sus bases de datos, quedando únicamente los registros de
          las transacciones y servicios realizados por usted a los solos efectos
          de análisis de prevención de fraude y estadísticos de la plataforma,
          sin ser asociados a ninguna cuenta o persona.
        </Text>
        <Text style={styles.bold}>11. INFORMACIÓN SOBRE COOKIES</Text>
        <Text style={styles.regular}>
          Una cookie consiste en un archivo de información enviada por un
          servidor web a un navegador web, y almacenada por el navegador. La
          información es luego enviada de nuevo al servidor web en cada momento
          que el navegador solicita una página del servidor. Esto habilita al
          servidor a identificar y rastrear el navegador web. Nosotros usaremos
          tanto cookies de sesión como cookies persistentes únicamente en
          nuestro sitio web.
        </Text>
        <Text style={styles.regular}>
          Usaremos las cookies de sesión para estar al tanto de usted mientras
          utiliza la Aplicación.
        </Text>
        <Text style={styles.bold}>
          REGLAS DE USO DE COOKIES PARA APLICACIÓN MÓVIL DE GESTIÓN DE
          ESTACIONAMIENTO
        </Text>
        <Text style={styles.regular}>
          Estas reglas de uso de cookies (en adelante, "Reglas") se aplican a la
          aplicación móvil de gestión de estacionamiento de un centro comercial
          (en adelante, la "Aplicación") desarrollada y operada por Trasntec
          S.A.], en adelante, el "Desarrollador". Estas Reglas tienen el
          propósito de informar a los usuarios de la Aplicación (en adelante,
          los "Usuarios") sobre cómo se utilizan las cookies y tecnologías
          similares en la Aplicación, así como brindar opciones de control para
          los Usuarios.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>Consentimiento del Usuario: </Text>
          Antes de utilizar cualquier cookie en la Aplicación, se solicitará el
          consentimiento expreso de los Usuarios de acuerdo con las leyes y
          regulaciones aplicables.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>Tipo de Cookies:</Text>La Aplicación
          podrá utilizar cookies de sesión y cookies persistentes para diversos
          fines, incluyendo el análisis de uso, la mejora de la experiencia del
          Usuario y la personalización del contenido.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>Finalidad de las Cookies:</Text>Las
          cookies utilizadas en la Aplicación pueden tener las siguientes
          finalidades: a. Cookies de Rendimiento: Para recopilar información
          sobre cómo los Usuarios interactúan con la Aplicación y mejorar su
          rendimiento. b. Cookies Funcionales: Para recordar las preferencias de
          los Usuarios y personalizar su experiencia.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Terceros y Cookies de Terceros:{' '}
          </Text>
          La Aplicación puede permitir el uso de cookies de terceros, como
          proveedores de análisis y redes publicitarias. Estos terceros pueden
          recopilar información sobre la actividad de los Usuarios en la
          Aplicación y en otros sitios web y aplicaciones.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>Duración de las Cookies: </Text>Las
          cookies utilizadas en la Aplicación tendrán una duración limitada, y
          su uso estará sujeto a las leyes de privacidad aplicables.
        </Text>
        <Text style={styles.regular}>
          <Text style={styles.boldNoSpacer}>
            Actualización de las Reglas de Cookies:{' '}
          </Text>
          Las Reglas de Cookies se revisarán periódicamente y se mantendrán
          actualizadas para reflejar cualquier cambio en la política de cookies
          del Desarrollador.
        </Text>
        <Text style={styles.regular}>
          Estas Reglas de Uso de Cookies tienen la finalidad de asegurar que la
          recopilación y el uso de datos a través de cookies en la Aplicación se
          realicen de manera transparente y en cumplimiento con la legislación
          de protección de datos y privacidad aplicable. Al utilizar la
          Aplicación, los Usuarios aceptan estas Reglas de Uso de Cookies y
          consienten el uso de cookies de acuerdo con las mismas.
        </Text>
        <Text style={styles.regular}>
          Por su parte, usamos cookies persistentes para habilitar a nuestro
          sitio web que lo reconozca a usted cuando visita nuestra Aplicación.
          Las cookies de sesión serán eliminadas de su computadora cuando usted
          cierre el navegador web. Las cookies persistentes se mantendrán
          almacenadas en su computadora hasta que sean eliminadas, o hasta que
          lleguen a una fecha de expiración especificada.
        </Text>
        <Text style={styles.regular}>
          Podemos cambiar el contenido de nuestros sitios web y la forma en que
          utilizamos las cookies y, en consecuencia, nuestra Política de
          protección de datos personales y nuestra Política de Cookies pueden
          cambiar de vez en cuando en el futuro. Si cambiamos esta Política de
          protección de datos personales o nuestra Política de Cookies,
          actualizaremos la fecha de la última modificación a continuación. Si
          estos cambios son importantes, lo indicaremos claramente en nuestros
          sitios web.
        </Text>
        <Text style={styles.bold}>
          12. SEGURIDAD DE SU INFORMACIÓN PERSONAL Y SERVIDORES
        </Text>
        <Text style={styles.regular}>
          Toda información recabada en la Aplicación será tratada en
          cumplimiento de la Normativa y los datos serán utilizados únicamente
          para los fines aquí consentidos o los que consienta oportunamente en
          el futuro. TRANSTEC S.A. expresa su compromiso de proteger la
          seguridad de la información personal de los usuarios. Con ese fin,
          TRANSTEC S.A. usa una amplia variedad de tecnologías y procedimientos
          de seguridad para proteger la información personal contra un acceso,
          uso, modificación o una divulgación no autorizados en su
          infraestructura. Sin embargo, la transmisión de datos a través de
          internet es inherentemente insegura, y nosotros no podemos garantizar
          la seguridad de los datos enviados a través de internet. TRANSTEC S.A.
          no tiene control alguno sobre la privacidad de las comunicaciones
          mientras estén en tránsito hacia ella. Por lo anterior, le
          recomendamos que no incluya información confidencial, secreta,
          comprometedora, datos sensibles o información personal delicada que
          usted no desea revelar en estas comunicaciones (incluyendo correos
          electrónicos). Asimismo, usted es responsable de mantener su
          contraseña y detalles de usuario confidencialmente.
        </Text>
        <Text style={styles.regular}>
          El internet es una red pública, sin embargo el proveedor debe
          implementar las medidas técnicas necesarias para evitar un posible
          ataque o hackeo a sus servidores.
        </Text>
        <Text style={styles.regular}>
          Transtec implementará todas las medidas técnicas y organizativas
          necesarias para proteger los datos personales de los usuarios en su
          infraestructura, sin embargo de lo cual toda persona está expuesta a
          vulnerabilidades de los diferentes ataques tecnológicos.
        </Text>
        <Text style={styles.bold}>
          13. CAMBIOS EN ESTA DECLARACIÓN DE PRIVACIDAD
        </Text>
        <Text style={styles.regular}>
          TRANSTEC S.A. se reserva el derecho de realizar las modificaciones que
          estime oportunas en esta Política de protección de datos personales.
          Si se realizan cambios en esta Política, se lo informaremos mediante
          una comunicación electrónica.
        </Text>
        <Text style={styles.bold}>
          14. NOTA SOBRE EL USO DE ESTE SITIO POR PARTE DE MENORES DE EDAD
        </Text>
        <Text style={styles.regular}>
          Este sitio no está dirigido a niños, niñas y adolescentes, ya que nos
          interesa de sobremanera proteger la privacidad de éstos. Por ello, no
          deseamos recopilar ninguna información que identifique personalmente a
          menores de edad. En caso de tomar conocimiento que los datos de un
          menor de edad (menor de 18 años) han sido proporcionados a TRANSTEC
          S.A., eliminaremos dicha información a la mayor brevedad posible.
        </Text>
        <Text style={styles.bold}>15. DISPOSICIONES FINALES</Text>
        <Text style={styles.regular}>
          La aplicación puede derivar o contener enlaces con referencias a otros
          sitios web más allá de nuestro control. Por favor recuerde que no
          tenemos ningún control sobre estos sitios web y que nuestra Política
          no es aplicable a estos sitios. Es su decisión el ingresar y usar los
          enlaces que pueden aparecer, con las consecuentes implicaciones a las
          que el usuario toma el riesgo. Le recomendamos que lea las políticas
          de protección de datos personales y los términos y condiciones de los
          sitios web conectados o referenciados en los que usted decida entrar.
          Ninguna parte de esta Política supone la creación o adición de algún
          derecho o reclamación (ya sea legal, equitativo o de otro tipo) que
          cualquier individuo o persona pueda tener según la ley, o de alguna
          otra forma, en contra de la empresa, terceros, o sus directores
          respectivos, delegados, empleados, agentes o representantes; ni la
          existencia de la presente Política o su aplicación impondrá o agrega
          obligación alguna o responsabilidad a ninguno de los nombrados, que no
          tenga actualmente según la ley ecuatoriana.
        </Text>

        <Text style={styles.bold}>16. JURISDICCIÓN Y LEY APLICABLE</Text>
        <Text style={styles.regular}>
          La presente Política se encuentra regida sin excepción y en todos sus
          términos por la Ley Orgánica de Protección de Datos Personales, su
          reglamento y demás instrumentos relacionados dentro de Ecuador.
          Cualquier controversia derivada de la presente Política, su
          existencia, validez, interpretación, alcance o cumplimiento será
          sometida a la mediación en la Cámara de Comercio Americana ubicada con
          sede en Quito, renunciando en forma expresa a cualquier otro fuero o
          jurisdicción.
        </Text>

        <Text style={styles.bold}>17. CONTACTO</Text>
        <Text style={styles.regular}>
          Si tiene alguna pregunta relacionada con esta política, póngase en
          contacto con nosotros a través de los siguientes canales (en lo
          sucesivo denominados Canales de contacto establecidos).
        </Text>
        <Text style={styles.regular}>
          i. De manera presencial por medio del balcón de servicio en nuestras
          oficinas en Fernando Ayarza N13-16 y Carlos Montúfar, parroquia
          Iñaquito, Ciudad de Quito (Provincia de Pichincha, Ecuador
        </Text>
        <Text style={styles.regular}>
          ii. Enviando un correo electrónico a servicioalcliente@transtec.com.ec
        </Text>
        <Text style={styles.regular}>
          Adicionalmente podrá contactarse con nuestro delegado de Protección de
          Datos Personales: identidad y datos de contacto del delegado de
          protección de datos personales, que incluirá: dirección domiciliaria,
          número de teléfono y correo electrónico.
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
    marginTop: 5,
    marginBottom: 0,
    fontFamily: 'Lato-Black',
  },
  boldNoSpacer: {
    fontFamily: 'Lato-Black',
  },
  regular: {
    marginTop: 5,
    marginBottom: 0,
    fontFamily: 'Lato-Regular',
    marginHorizontal: 10,
    textAlign: 'justify',
  },
  regularNoSpacer: {
    marginTop: 1,
    marginBottom: 1,
    fontFamily: 'Lato-Regular',
    marginHorizontal: 10,
    textAlign: 'justify',
  },
  Headline: {
    marginTop: 10,
    marginBottom: 0,
    fontFamily: 'Lato-Bold',
    marginHorizontal: 25,
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
