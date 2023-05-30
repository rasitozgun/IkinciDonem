import React, { useContext, useState } from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import { supabase } from "../lib/supabase";
import { AuthContext } from "../context/AuthContext";

const DateTimePickerScreen = ({ navigation, route }) => {
  const [selectedDate, setSelectedDate] = useState(moment());
  const [showPicker, setShowPicker] = useState(true);
  const { barberId, serviceId } = route.params;
  const { session } = useContext(AuthContext);

  const handleDateChange = (date) => {
    if (date) {
      setSelectedDate(moment(date));
    }
  };

  const handleConfirm = async (date) => {
    setShowPicker(false);
    if (date) {
      setSelectedDate(moment(date));

      const updates = {
        customer_id: session?.user.id,
        barber_id: barberId,
        service_id: serviceId,
        start_time: moment(date).toISOString(),
        end_time: moment(date).add(30, "minutes").toISOString(),
      };

      // Create appointment using Supabase
      const { data, error } = await supabase.from("appointments").insert(updates);

      if (error) {
        console.error("Error creating appointment:", error);
        // Handle error
      } else {
        console.log("Appointment created successfully:", data);
        // Handle success
      }
    }
  };

  const handleCancel = () => {
    setShowPicker(false);
    navigation.navigate("CustomerAppointmentScreen"); // Navigate back to previous screen
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
