import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  Button,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

// 1. Define the Interface for your data
interface InventoryItem {
  id: number;
  name: string;
  quantity: number;
}

export default function InventoryScreen() {
  const db = useSQLiteContext(); // Get DB access from the Provider
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>("");

  // 2. READ: Function to fetch data
  const fetchItems = async () => {
    // <InventoryItem> tells TS what the result looks like
    const result = await db.getAllAsync<InventoryItem>("SELECT * FROM items");
    setItems(result);
  };

  // Initial fetch on mount
  useEffect(() => {
    fetchItems();
  }, []);

  // 3. CREATE: Add Item
  const addItem = async () => {
    if (!newItemName.trim()) return;

    try {
      await db.runAsync(
        "INSERT INTO items (name, quantity) VALUES (?, ?)",
        newItemName,
        1
      );
      await fetchItems(); // Refresh list
      setNewItemName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  // 4. UPDATE: Increment Quantity
  const incrementQty = async (id: number, currentQty: number) => {
    try {
      await db.runAsync(
        "UPDATE items SET quantity = ? WHERE id = ?",
        currentQty + 1,
        id
      );
      await fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  // 5. DELETE: Remove Item
  const deleteItem = async (id: number) => {
    try {
      await db.runAsync("DELETE FROM items WHERE id = ?", id);
      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>My Warehouse</Text>

      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Item Name"
          value={newItemName}
          onChangeText={setNewItemName}
        />
        <Button
          title="Add Item"
          onPress={addItem}
        />
      </View>

      {/* List Section */}
      <FlatList
        data={items}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContent}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemQty}>Stock: {item.quantity}</Text>
            </View>

            <View style={styles.actions}>
              <TouchableOpacity
                style={[styles.btn, styles.btnBlue]}
                onPress={() => incrementQty(item.id, item.quantity)}
              >
                <Text style={styles.btnText}>+</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={[styles.btn, styles.btnRed]}
                onPress={() => deleteItem(item.id)}
              >
                <Text style={styles.btnText}>Del</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 60,
  },
  header: { fontSize: 24, fontWeight: "bold", marginBottom: 20 },
  inputContainer: { flexDirection: "row", marginBottom: 20, gap: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: "#ddd",
    backgroundColor: "#fff",
    padding: 10,
    borderRadius: 8,
  },
  listContent: { paddingBottom: 50 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "white",
    padding: 15,
    borderRadius: 10,
    marginBottom: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  itemName: { fontSize: 18, fontWeight: "600" },
  itemQty: { fontSize: 14, color: "#666", marginTop: 4 },
  actions: { flexDirection: "row", gap: 10 },
  btn: { paddingHorizontal: 15, paddingVertical: 8, borderRadius: 6 },
  btnBlue: { backgroundColor: "#007AFF" },
  btnRed: { backgroundColor: "#FF3B30" },
  btnText: { color: "white", fontWeight: "bold" },
});
