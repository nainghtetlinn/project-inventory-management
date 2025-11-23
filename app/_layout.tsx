import { Stack } from "expo-router";
import { SQLiteProvider, type SQLiteDatabase } from "expo-sqlite";

export default function RootLayout() {
  async function initializeDB(db: SQLiteDatabase) {
    await db.execAsync(`
      PRAGMA journal_mode = WAL;
      CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY NOT NULL, 
        name TEXT NOT NULL, 
        quantity INTEGER DEFAULT 1
      );
    `);
  }

  return (
    <SQLiteProvider
      databaseName="inventory.db"
      onInit={initializeDB}
    >
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />
    </SQLiteProvider>
  );
}
