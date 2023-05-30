import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";

export default function Register({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { signUpWithEmail } = useContext(AuthContext);

  const handleRegister = () => {
    if (email === "" || password === "") return alert("Email and password cannot be empty");

    signUpWithEmail(email, password);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Register</Text>
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
      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("CustomerLogin")}
      >
        <Text style={styles.buttonText}>Dou you have account?...</Text>
      </TouchableOpacity>
    </View>
  );
}

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
