import React, { useState, useEffect, useContext } from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, Modal } from "react-native";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const CustomerAppointment = ({ navigation }) => {
  const [appointments, setAppointments] = useState([]);
  const [cancelAppointmentId, setCancelAppointmentId] = useState(null);
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
          barbers(name, address),
          users(name)
        `
        )
        .eq("customer_id", session.user.id);

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

  function formatDateTime(date) {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    };
    return new Date(date).toLocaleString("tr-TR", options);
  }

  const renderAppointmentItem = ({ item }) => (
    <View style={styles.appointmentItem}>
      <Text style={styles.appointmentLabel}>Berber:</Text>
      <Text style={styles.appointmentValue}>{item.barbers ? item.barbers.name : ""}</Text>

      <Text style={styles.appointmentLabel}>Adres:</Text>
      <Text style={styles.appointmentValue}>{item.barbers ? item.barbers.address : ""}</Text>

      <Text style={styles.appointmentLabel}>Hizmet:</Text>
      <Text style={styles.appointmentValue}>{item.services ? item.services.name : ""}</Text>

      <Text style={styles.appointmentLabel}>Başlama Tarihi:</Text>
      <Text style={styles.appointmentValue}>{formatDateTime(item.start_time)}</Text>

      <Text style={styles.appointmentLabel}>Bitiş Tarihi:</Text>
      <Text style={styles.appointmentValue}>{formatDateTime(item.end_time)}</Text>

      <TouchableOpacity style={styles.cancelButton} onPress={() => setCancelAppointmentId(item.id)}>
        <Text style={styles.cancelButtonText}>Randevuyu İptal Et</Text>
      </TouchableOpacity>
    </View>
  );

  const cancelAppointment = async () => {
    try {
      const { data, error } = await supabase
        .from("appointments")
        .delete()
        .eq("id", cancelAppointmentId);

      if (error) {
        throw error;
      }

      setAppointments(appointments.filter((appointment) => appointment.id !== cancelAppointmentId));
      setCancelAppointmentId(null);
    } catch (error) {
      if (error instanceof Error) {
        alert("Randevu iptali sırasında bir hata oluştu.");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Randevun</Text>
      </View>

      {appointments.length > 0 ? (
        <FlatList
          data={appointments}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderAppointmentItem}
          contentContainerStyle={styles.appointmentList}
        />
      ) : (
        <Text style={styles.noAppointmentsText}>No appointments found.</Text>
      )}

      <Modal visible={!!cancelAppointmentId} transparent={true} animationType="fade">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Randevuyu İptal Etmek İstiyor musunuz?</Text>

            <View style={styles.modalButtonsContainer}>
              <TouchableOpacity
                style={styles.modalButton}
                onPress={() => setCancelAppointmentId(null)}
              >
                <Text style={styles.modalButtonText}>Hayır</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.modalButton} onPress={cancelAppointment}>
                <Text style={styles.modalButtonText}>Evet</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 20,
    paddingVertical: 30,
  },
  header: {
    marginTop: 20,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333333",
  },
  appointmentList: {
    flexGrow: 1,
    justifyContent: "center",
  },
  appointmentItem: {
    backgroundColor: "#FFDF00",
    paddingVertical: 16,
    paddingHorizontal: 20,
    marginBottom: 16,
    borderRadius: 8,
  },
  appointmentLabel: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333333",
    marginBottom: 4,
  },
  appointmentValue: {
    fontSize: 16,
    color: "#333333",
    marginBottom: 8,
  },
  cancelButton: {
    backgroundColor: "#FF0000",
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  cancelButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
  noAppointmentsText: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    marginTop: 16,
    color: "#333333",
  },
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    backgroundColor: "#ffffff",
    paddingHorizontal: 24,
    paddingVertical: 32,
    borderRadius: 8,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 24,
    color: "#333333",
  },
  modalButtonsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  modalButton: {
    backgroundColor: "#FF0000",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
  },
  modalButtonText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#ffffff",
  },
});

export default CustomerAppointment;
