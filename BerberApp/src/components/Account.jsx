import { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import { StyleSheet, View, Alert } from "react-native";
import { Button, Input } from "react-native-elements";
import { Session } from "@supabase/supabase-js";

export default function Account({ session }) {
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [phone_number, setPhoneNumber] = useState("");
  const [id, setId] = useState(session?.user?.id);

  useEffect(() => {
    if (session) getProfile();
  }, [session]);

  async function getProfile() {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("customers")
        .select(`id, name, phone_number, email`)
        .eq("id", session.user.id)
        .single();
      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setName(data.name);
        setPhoneNumber(data.phone_number);
        setId(data.id);
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  async function updateProfile({ name, phone_number }) {
    try {
      setLoading(true);
      if (!session?.user) throw new Error("No user on the session!");

      const updates = {
        id,
        name,
        phone_number,
        email: session.user.email,
      };

      let { error } = await supabase.from("customers").upsert(updates).eq("id", id);

      if (error) {
        throw error;
      }
    } catch (error) {
      if (error instanceof Error) {
        Alert.alert(error.message);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <View style={styles.container}>
      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Input label="Email" value={session?.user?.email} disabled />
      </View>
      <View style={styles.verticallySpaced}>
        <Input label="Real Name" value={name || ""} onChangeText={(text) => setName(text)} />
      </View>
      <View style={styles.verticallySpaced}>
        <Input
          label="Phone"
          value={phone_number || ""}
          onChangeText={(text) => setPhoneNumber(text)}
        />
      </View>

      <View style={[styles.verticallySpaced, styles.mt20]}>
        <Button
          title={loading ? "Loading ..." : "Update"}
          onPress={() => updateProfile({ name, phone_number })}
          disabled={loading}
        />
      </View>

      <View style={styles.verticallySpaced}>
        <Button title="Sign Out" onPress={() => supabase.auth.signOut()} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 40,
    padding: 12,
  },
  verticallySpaced: {
    paddingTop: 4,
    paddingBottom: 4,
    alignSelf: "stretch",
  },
  mt20: {
    marginTop: 20,
  },
});
