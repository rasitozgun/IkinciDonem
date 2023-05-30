import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";

const BarberAppointmentScreen = () => {
  const appointments = [
    { id: 1, customer: "John Doe", service: "Haircut", time: "10:00 AM" },
    { id: 2, customer: "Jane Smith", service: "Shave", time: "11:30 AM" },
    { id: 3, customer: "Mike Johnson", service: "Beard Trim", time: "2:00 PM" },
  ];

  const renderAppointments = () => {
    return appointments.map((appointment) => (
      <View style={styles.appointmentContainer} key={appointment.id}>
        <Text style={styles.appointmentCustomer}>{appointment.customer}</Text>
        <Text style={styles.appointmentService}>{appointment.service}</Text>
        <Text style={styles.appointmentTime}>{appointment.time}</Text>
      </View>
    ));
  };

  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Randevular</Text>
      </View>
      {appointments.length > 0 ? (
        <View style={styles.appointmentsContainer}>{renderAppointments()}</View>
      ) : (
        <Text style={styles.noAppointmentsText}>No appointments for today</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    marginTop: 30,
  },
  navbar: {
    backgroundColor: "#ffaa00",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  logo: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#ffffff",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 16,
    color: "#333333",
    textAlign: "center",
  },
  appointmentsContainer: {
    flex: 1,
    marginTop: 16,
  },
  appointmentContainer: {
    backgroundColor: "#f2f2f2",
    borderRadius: 8,
    padding: 16,
    marginBottom: 16,
  },
  appointmentCustomer: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 8,
  },
  appointmentService: {
    fontSize: 16,
    color: "#666666",
    marginBottom: 4,
  },
  appointmentTime: {
    fontSize: 14,
    color: "#666666",
  },
  noAppointmentsText: {
    fontSize: 16,
    color: "#666666",
    textAlign: "center",
  },
});

export default BarberAppointmentScreen;
