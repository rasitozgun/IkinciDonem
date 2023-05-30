import React, { useState, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const AddServiceScreen = ({ navigation }) => {
  const [serviceName, setServiceName] = useState("");
  const [servicePrice, setServicePrice] = useState("");
  const { session, setLoading } = useContext(AuthContext);

  const handleAddService = async () => {
    // Handle adding the service to the database or performing any necessary actions
    console.log("Service Name:", serviceName);
    console.log("Service Price:", servicePrice);

    if (!isNumeric(servicePrice)) {
      alert("Service price must be a numeric value.");
      return;
    }

    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        barber_id: session?.user?.id,
        name: serviceName,
        price: servicePrice,
      };

      let { error } = await supabase.from("services").insert(updates);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(error.message);
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }

    // Clear the input fields after adding the service
    setServiceName("");
    setServicePrice("");
  };

  const isNumeric = (value) => {
    return /^[0-9]+$/.test(value);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hizmet ekle</Text>
      <View style={styles.form}>
        <Text style={styles.label}>Hizmet İsmi</Text>
        <TextInput
          style={styles.input}
          value={serviceName}
          onChangeText={(text) => setServiceName(text)}
          placeholder="Hizmet İsmi"
        />

        <Text style={styles.label}>Hizmet Ücreti</Text>
        <TextInput
          style={styles.input}
          value={servicePrice}
          onChangeText={(text) => setServicePrice(text)}
          placeholder="Hizmet Ücreti"
          keyboardType="numeric"
        />

        <TouchableOpacity style={styles.addButton} onPress={handleAddService}>
          <Text style={styles.addButtonText}>Hizmet Ekle</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#ffffff",

    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 24,
    color: "#333333",
    textAlign: "center",
  },
  form: {
    flex: 1,
    alignContent: "center",
    justifyContent: "center",
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: "#333333",
  },
  input: {
    borderWidth: 1,
    borderColor: "#cccccc",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#333333",
  },
  addButton: {
    backgroundColor: "#ffaa00",
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default AddServiceScreen;
