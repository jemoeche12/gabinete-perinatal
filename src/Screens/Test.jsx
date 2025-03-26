import { ScrollView, StyleSheet, Text, View } from 'react-native';
import React, { useState } from 'react';
import TestComponent from '../components/TestComponent';

const Test = () => {
  const [respuestas, setRespuestas] = useState({});

  const handleRespuesta = (index, option) => {
    setRespuestas((prev) => ({
      ...prev,
      [index]: option,
    }));
  };

  const questions = [
    '1️⃣ ¿Con qué frecuencia te has sentido preocupada o ansiosa por el embarazo?',
    '2️⃣ ¿Te has sentido abrumada por los cambios físicos y emocionales del embarazo?',
    '3️⃣ ¿Sientes que puedes disfrutar de tu embarazo?',
    '4️⃣ ¿Cómo describirías tu estado de ánimo en la última semana?',
    '5️⃣ ¿Has sentido cambios en tu sueño o apetito que te preocupen?',
    '6️⃣ ¿Te sientes acompañada y apoyada en tu embarazo?',
    '7️⃣ ¿Tienes pensamientos negativos o miedos intensos sobre el embarazo o el parto?',
    '8️⃣ ¿Cómo te sientes con respecto a tu cuerpo y los cambios físicos del embarazo?',
    '9️⃣ ¿Cómo es tu conexión con tu bebé durante el embarazo?',
    '🔟 ¿Cómo manejas el estrés diario durante el embarazo?',
    '1️⃣1️⃣ ¿Has sentido falta de interés o placer en actividades que antes disfrutabas?',
    '1️⃣2️⃣ ¿Has tenido pensamientos negativos sobre ti misma o sentimientos de culpa?',
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.titlePrincipal}>Test de Bienestar Emocional en el Embarazo {"\n"}{"\n"}

        Objetivo: Evaluar el estado emocional de la embarazada y detectar signos de ansiedad, estrés o depresión.{"\n"}{"\n"}

        Instrucciones: Responde según cómo te has sentido en la última semana.</Text>
      {questions.map((question, index) => (
        <TestComponent style={styles.title}
          key={index}
          title={question}
          options={['Casi Nunca', 'Algunas Veces', 'Frecuentemente', 'Casi todo el tiempo']}
          onSelect={(option) => handleRespuesta(index, option)}
        />
      ))}
      <Text style={styles.description}>Interpretación del Test de Bienestar Emocional en el Embarazo{"\n"}{"\n"}

        El resultado de este test no busca etiquetar ni diagnosticar, sino servir como una herramienta de exploración para conocer el estado emocional de la persona gestante y su vivencia del embarazo.{"\n"}{"\n"}

        Cada respuesta del test tiene un puntaje asignado: {"\n"}{"\n"}
        Opcion 1:            suma 1 punto{"\n"}{"\n"}
        Opcion 2:            suma 2 puntos{"\n"}{"\n"}
        Opcion 3:            suma 3 puntos{"\n"}{"\n"}
        Opcion 4:            suma 4 puntos {"\n"}{"\n"}

        Al finalizar el Test se suman los puntajes de todas las respuestas. {"\n"}{"\n"}
        12-19 puntos → Bienestar emocional {"\n"}{"\n"}

        🔹 Puntaje bajo: Puede indicar que la persona percibe estabilidad emocional y cuenta con estrategias para afrontar los cambios del embarazo. Aun así, es importante indagar si existen preocupaciones no expresadas o aspectos invisibilizados en su bienestar emocional.{"\n"}{"\n"}


        20-29 puntos → Alerta moderada (dificultades emocionales que requieren atención){"\n"}{"\n"}

        🔹 Puntaje medio: Sugiere que la persona está transitando su embarazo con algunas dificultades emocionales o preocupaciones. Es clave profundizar en cómo está viviendo su experiencia, qué apoyo tiene y qué estrategias puede fortalecer para mejorar su bienestar.{"\n"}{"\n"}


        30-48 puntos → Alerta alta (posibles signos de ansiedad o depresión perinatal, se recomienda buscar apoyo profesional){"\n"}{"\n"}

        🔹 Puntaje alto: Refleja que la persona podría estar experimentando emociones intensas, dificultades en la adaptación o miedos recurrentes. Es una oportunidad para abrir el espacio terapéutico desde la escucha empática, indagar en los factores que pueden estar influyendo y brindar herramientas que le permitan sentirse más acompañada y contenida.{"\n"}{"\n"}

        El objetivo del acompañamiento psicológico perinatal no es reducir un puntaje, sino comprender la experiencia única de cada embarazo y ofrecer recursos personalizados para el bienestar de la persona gestante y su bebé.{"\n"}{"\n"}

      </Text>
    </ScrollView>
  );
};

export default Test;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F8EDE3"
  },
  titlePrincipal: {
    fontFamily: "Crafty",
    fontSize: 20,
    textAlign: "center",
    marginVertical: 25
  },
  description: {
    fontFamily: "Crafty",
    marginTop: 20,
    marginBottom: 20,
    fontSize: 18
  }
});
