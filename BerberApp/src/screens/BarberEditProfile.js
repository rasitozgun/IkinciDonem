import React, { useState, useEffect, useContext } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { supabase } from "../lib/supabase";

const EditProfileScreen = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const { session, setLoading } = useContext(AuthContext);

  async function updateProfile({ id, name, email, phone, address }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id: id,
        name: name,
        email: email,
        phone_number: phone,
        address: address,
      };

      let { error } = await supabase.from("barbers").upsert(updates).eq("id", session?.user?.id);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (session) getProfile();
    setEmail(session?.user?.email);
  }, [session]);

  async function getProfile() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("barbers")
        .select(`id, name, phone_number, email, address`)
        .eq("id", session.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        console.log(data);
        setName(data.name);
        setEmail(session?.user?.email);
        setPhone(data.phone_number);
        setAddress(data.address);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Edit Profile</Text>

      <TextInput style={styles.input} placeholder="Name" value={name} onChangeText={setName} />

      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email || ""}
        onChangeText={setEmail}
        keyboardType="email-address"
        editable={false}
      />
      <TextInput
        style={styles.input}
        placeholder="Adress"
        value={address || ""}
        onChangeText={setAddress}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Phone"
        value={phone || ""}
        onChangeText={setPhone}
        keyboardType="email-address"
      />

      <TouchableOpacity
        style={styles.button}
        onPress={() => updateProfile({ id: session?.user?.id, name, email, phone, address })}
      >
        <Text style={styles.buttonText}>Save Profile</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: "blue",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EditProfileScreen;
