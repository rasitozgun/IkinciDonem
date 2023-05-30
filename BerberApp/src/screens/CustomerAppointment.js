import React, { useState, useEffect, useContext } from "react";
import { View, Text, TouchableOpacity, FlatList, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const CustomerAppointment = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const { session, setLoading } = useContext(AuthContext);

  useEffect(() => {
    if (session) {
      getAppointments();
    }
  }, [session]);

  async function getAppointments() {
    try {
      if (!session?.user) throw new Error("No user on the session!");

      let { data, error, status } = await supabase
        .from("appointments")
        .select(
          `
          id,
          start_time,
          end_time,
          services(name),
          barbers(name),
          customers(name)
        `
        )
        .eq("customer_id", session.user.id)
        .order("start_time", { ascending: false });

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setAppointments(data);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Randevun</Text>
      </View>
      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.appointmentItem}>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentLabel}>Barber:</Text>
                <Text style={styles.appointmentValue}>{item.barbers[0].name}</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentLabel}>Service:</Text>
                <Text style={styles.appointmentValue}>{item.services[0].name}</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentLabel}>Start Time:</Text>
                <Text style={styles.appointmentValue}>{formatDateTime(item.start_time)}</Text>
              </View>
              <View style={styles.appointmentInfo}>
                <Text style={styles.appointmentLabel}>End Time:</Text>
                <Text style={styles.appointmentValue}>{formatDateTime(item.end_time)}</Text>
              </View>
            </View>
          )}
        />
      ) : (
        <Text style={styles.noAppointmentsText}>No appointments found.</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    flex: 1,
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    marginTop: 16,
    color: "#333333",
  },
  addButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: "#ffaa00",
    borderRadius: 8,
    alignItems: "center",
  },
  addButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  appointmentItem: {
    backgroundColor: "#f5f5f5",
    paddingHorizontal: 16,
    paddingVertical: 12,
    marginBottom: 8,
  },
  appointmentInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
  },
  appointmentLabel: {
    fontWeight: "bold",
    marginRight: 8,
  },
  appointmentValue: {
    flex: 1,
    color: "#333333",
  },
  noAppointmentsText: {
    fontSize: 16,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
  },
});

export default CustomerAppointment;
