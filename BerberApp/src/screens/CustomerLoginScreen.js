import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

const CustomerLoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signInCustomer, session } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Customer Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        onChangeText={(text) => setEmail(text)}
        value={email}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        onChangeText={(text) => setPassword(text)}
        value={password}
        secureTextEntry
      />
      <TouchableOpacity style={styles.loginButton} onPress={() => signInCustomer(email, password)}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.loginButton} onPress={() => navigation.navigate("Register")}>
        <Text style={styles.buttonText}>Don't you have an account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.forgotPasswordButton}>
        <Text style={styles.textButton}>Forgot Password?</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.forgotPasswordButton}
        onPress={() => navigation.navigate("BarberLogin")}
      >
        <Text style={styles.textButton}>Are you a barber?</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
  },
  input: {
    width: "100%",
    height: 48,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  loginButton: {
    width: "100%",
    height: 48,
    backgroundColor: "blue",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
    marginBottom: 16,
  },
  forgotPasswordButton: {
    marginTop: 16,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  textButton: {
    color: "blue",
    fontSize: 16,
  },
});

export default CustomerLoginScreen;
