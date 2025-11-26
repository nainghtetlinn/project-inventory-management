import { useSettings } from "@/hooks/use-settings";
import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type SortOption = "name" | "stock_asc" | "stock_desc";

export default function SettingsScreen() {
  const { sortBy, threshold, updateSortBy, updateThreshold } = useSettings();

  return (
    <View style={styles.container}>
      {/* --- PREFERENCES SECTION --- */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>App Preferences</Text>

        {/* Threshold Input */}
        <View style={styles.row}>
          <Text style={styles.label}>Low Stock Threshold</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={threshold}
            onChangeText={(t) => updateThreshold(t)}
          />
        </View>

        {/* Sort Selection */}
        <Text style={[styles.label, { marginTop: 15, marginBottom: 10 }]}>
          Default Sort Order
        </Text>
        <View style={styles.sortContainer}>
          {(["name", "stock_asc", "stock_desc"] as SortOption[]).map((opt) => (
            <TouchableOpacity
              key={opt}
              style={[styles.sortBtn, sortBy === opt && styles.sortBtnActive]}
              onPress={() => updateSortBy(opt)}
            >
              <Text
                style={[
                  styles.sortBtnText,
                  sortBy === opt && styles.sortBtnTextActive,
                ]}
              >
                {opt === "name"
                  ? "Name"
                  : opt === "stock_asc"
                  ? "Low Stock"
                  : "High Stock"}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  section: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.05,
    shadowRadius: 5,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 15,
    color: "#333",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  label: { fontSize: 16, color: "#333" },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 8,
    width: 60,
    textAlign: "center",
    fontSize: 16,
  },
  sortContainer: { flexDirection: "row", gap: 8 },
  sortBtn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 8,
    backgroundColor: "#f0f0f0",
    alignItems: "center",
  },
  sortBtnActive: { backgroundColor: "#007AFF" },
  sortBtnText: { color: "#333", fontSize: 13, fontWeight: "500" },
  sortBtnTextActive: { color: "white" },
});
