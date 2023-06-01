import React, { useContext, useState, useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const BarberAppointmentScreen = () => {
  const [appointments, setAppointments] = useState([]); //
  const { session } = useContext(AuthContext);

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
          users(name, phone_number)
        `
        )
        .eq("barber_id", session.user.id);

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
  function formatTime(date) {
    const options = {
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleString("tr-TR", options);
  }

  const renderAppointments = () => {
    {
      let currentDate = null;
      return appointments.map((appointment) => {
        const appointmentDate = new Date(appointment.start_time).toLocaleDateString("tr-TR");
        let renderedComponent = null;
        if (currentDate !== appointmentDate) {
          currentDate = appointmentDate;
          renderedComponent = (
            <>
              <View style={styles.dateSeparator} />
              <Text style={styles.dateSeparatorText}>{currentDate}</Text>
            </>
          );
        }
        return (
          <React.Fragment key={appointment.id}>
            {renderedComponent}
            <View style={styles.appointmentContainer}>
              <Text style={styles.appointmentCustomer}>
                {appointment.users.name} Telefon: {appointment.users.phone_number}
              </Text>
              <Text style={styles.appointmentService}>{appointment.services.name}</Text>
              <Text style={styles.appointmentTime}>
                {formatTime(appointment.start_time)} - {formatTime(appointment.end_time)}
              </Text>
            </View>
          </React.Fragment>
        );
      });
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.navbar}>
        <Text style={styles.logo}>Randevular</Text>
      </View>
      {appointments.length > 0 ? (
        <View style={styles.appointmentsContainer}>{renderAppointments()}</View>
      ) : (
        <Text style={styles.noAppointmentsText}>Bugün için randevu yok</Text>
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
  dateSeparator: {
    backgroundColor: "#e5e5e5",
    height: 1,
    marginVertical: 16,
  },
  dateSeparatorText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    textAlign: "center",
    marginBottom: 8,
  },
});
export default BarberAppointmentScreen;
