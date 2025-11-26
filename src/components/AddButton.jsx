import {
  StyleSheet,
  View,
  Text,
  Pressable,
  Image,
} from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const iconSets = {
  Ionicons,
  MaterialCommunityIcons,
};

const AddButton = ({ title, onPress, disabled = false, iconName, iconSet = "Ionicons", iconSize = 42, style, iconSource }) => {
  const IconComponent = iconSets[iconSet];

  return (
    <Pressable
      style={[styles.container, disabled && styles.buttonDisabled]}
      onPress={onPress}
      disabled={disabled}
    >
      <View style={[styles.button, style]}>
        {iconSource ? (
          <Image source={iconSource} style={styles.imageIcon} />
        ) : (
          IconComponent && <IconComponent name={iconName} size={iconSize} color="white" />
        )}
        <Text style={[styles.buttonText, disabled && styles.buttonTextDisabled]}>{title}</Text>
      </View>
    </Pressable>
  );
};

export default AddButton;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    alignItems: 'center',
  },
  button: {
    width: 105,
    height: 105,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 50,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    textAlign: "center",
    fontFamily: "Roboto400",
    fontSize: 15,
    color: "black",
    justifyContent: "center",
  },
  buttonTextDisabled: {
    color: "#999",
  },
  imageIcon: {
    width: 50, 
    height: 50,
    resizeMode: 'contain',
  },
});
