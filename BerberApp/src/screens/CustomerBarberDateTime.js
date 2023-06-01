import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const DateTimePickerScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [showPicker, setShowPicker] = useState(false);
  const { barberId, serviceId } = route.params;
  const { setLoading, session } = useContext(AuthContext);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(moment(date));
    }
  };

  const handleConfirm = async (date) => {
    setLoading(true);
    setShowPicker(false);
    if (date) {
      setSelectedDate(moment(date));
      const start_time = moment(date).toISOString();
      const end_time = moment(date).add(30, "minutes").toISOString();

      // Check if there is an appointment at the selected time
      const { data: appointmentTimeData, error: appointmentTimeError } = await supabase
        .from("appointments")
        .select()
        .eq("customer_id", session?.user.id);

      const { data: customerAppointmentData, error: customerAppointmentError } = await supabase
        .from("appointments")
        .select()
        .eq("barber_id", barberId)
        .gte("start_time", start_time)
        .lte("end_time", end_time);

      if (customerAppointmentError || appointmentTimeError) {
        console.error(
          "Error checking appointment:",
          customerAppointmentError || appointmentTimeError
        );
        // Handle error
      } else if (appointmentTimeData.length > 0) {
        console.log("Zaten bir randevunuz var");
        alert("Zaten bir randevunuz var");
        // Display an error message and navigate back to the barber page
        // Example: Alert.alert("Error", "There is already an appointment at this time.");
        setInterval(() => {
          navigation.navigate("BarberPage", { barberId });
          setLoading(false);
        }, 2000);
      } else if (customerAppointmentData.length > 0) {
        console.log("Bu tarihte müsait değil");
        alert("Bu tarihte müsait değil");
        // Display an error message and navigate back to the barber page
        // Example: Alert.alert("Error", "There is already an appointment at this time.");
        setInterval(() => {
          navigation.navigate("BarberPage", { barberId });
          setLoading(false);
        }, 2000);
      } else {
        const updates = {
          customer_id: session?.user.id,
          barber_id: barberId,
          service_id: serviceId,
          start_time,
          end_time,
        };

        // Create appointment using Supabase
        const { data, error } = await supabase.from("appointments").insert(updates);

        if (error) {
          console.error("Error creating appointment:", error);
          // Handle error
        } else {
          console.log("Appointment created successfully:", data);
          // Handle success
          setLoading(false);
        }
      }
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
    navigation.navigate("BarberPage", { barberId }); // Navigate back to previous screen
  };

  return (
    <View style={styles.container}>
      <DateTimePickerModal
        isVisible={showPicker}
        mode="datetime"
        minimumDate={moment().toDate()}
        date={selectedDate.toDate()}
        minuteInterval={30}
        onConfirm={handleConfirm}
        onCancel={handleCancel}
        onDateChange={handleDateChange}
      />
      <TouchableOpacity style={styles.confirmButton} onPress={() => setShowPicker(true)}>
        <Text style={styles.confirmButtonText}>Tarih Seç</Text>
      </TouchableOpacity>
      {selectedDate && (
        <Text style={styles.selectedDateTimeText}>{selectedDate.format("YYYY-MM-DD HH:mm")}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ffffff",
    alignItems: "center",
    justifyContent: "center",
  },
  confirmButton: {
    marginTop: 16,
    paddingVertical: 12,
    paddingHorizontal: 16,
    backgroundColor: "#ffaa00",
    borderRadius: 8,
    alignItems: "center",
  },
  confirmButtonText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#ffffff",
  },
  selectedDateTimeText: {
    fontSize: 18,
    marginTop: 16,
    color: "#333333",
  },
});

export default DateTimePickerScreen;
