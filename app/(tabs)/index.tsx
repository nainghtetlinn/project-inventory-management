import { useSQLiteContext } from "expo-sqlite";
import React, { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { THEMES } from "@/constants/theme";
import { InventoryItem } from "@/types/inventory-item";

export default function InventoryScreen() {
  const db = useSQLiteContext();
  const [items, setItems] = useState<InventoryItem[]>([]);
  const [newItemName, setNewItemName] = useState<string>("");

  const fetchItems = async () => {
    const result = await db.getAllAsync<InventoryItem>("SELECT * FROM items");
    setItems(result);
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const addItem = async () => {
    if (!newItemName.trim()) return;

    try {
      await db.runAsync(
        "INSERT INTO items (name, quantity) VALUES (?, ?)",
        newItemName,
        1
      );
      await fetchItems();
      setNewItemName("");
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

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

  const decrementQty = async (id: number, currentQty: number) => {
    try {
      if (currentQty > 1) {
        await db.runAsync(
          "UPDATE items SET quantity = ? WHERE id = ?",
          currentQty - 1,
          id
        );
      } else {
        await db.runAsync("DELETE FROM items WHERE id = ?", id);
      }
      await fetchItems();
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  return (
    <View style={styles.container}>
      {/* Input Section */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="New Item Name"
          value={newItemName}
          onChangeText={setNewItemName}
        />

        <TouchableOpacity style={styles.addBtn}>
          <Text style={styles.addBtnText}>Add Item</Text>
        </TouchableOpacity>
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
                style={[styles.btn]}
                onPress={() => decrementQty(item.id, item.quantity)}
              >
                <Text style={styles.btnText}>-</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.btn]}
                onPress={() => incrementQty(item.id, item.quantity)}
              >
                <Text style={styles.btnText}>+</Text>
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
  inputContainer: { flexDirection: "row", marginBottom: 20, gap: 10 },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: THEMES.border.color,
    backgroundColor: THEMES.background,
    padding: 10,
    borderRadius: 8,
  },
  addBtn: {
    backgroundColor: THEMES.button.background,
    padding: 8,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  addBtnText: {
    color: THEMES.button.foreground,
  },
  listContent: { paddingBottom: 50 },
  card: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: THEMES.background,
    padding: 15,
    marginBottom: 16,
    borderRadius: 8,
    borderWidth: THEMES.border.width,
    borderColor: THEMES.border.color,
  },
  itemName: { fontSize: 18, fontWeight: "600" },
  itemQty: { fontSize: 14, color: "#666", marginTop: 4 },
  actions: { flexDirection: "row", gap: 10 },
  btn: {
    width: 36,
    height: 36,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: THEMES.border.radius,
    backgroundColor: THEMES.secondary.background,
  },
  btnText: {
    color: THEMES.secondary.paragraph,
    fontWeight: "bold",
    fontSize: 20,
  },
});
