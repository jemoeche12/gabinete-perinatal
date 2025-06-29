import { useCallback, useState, useEffect, useRef } from "react";
import * as SQLite from "expo-sqlite";
import { Alert } from "react-native";

export const useDB = () => {
 
  const dbRef = useRef(null);
  const [dbInitialized, setDbInitialized] = useState(false);
  const [dbError, setDbError] = useState(null); 

  const getDatabaseInstance = useCallback(() => {
    if (dbRef.current) {
      return dbRef.current; 
    }
    try {
      const db = SQLite.openDatabaseSync("sessions.db");
      dbRef.current = db; 
      return db;
    } catch (error) {
      setDbError(new Error("Failed to open database."));
      throw error; 
    }
  }, []); 
  const initDB = useCallback(async () => {
    if (dbInitialized) {
      return;
    }
    try {
      const db = getDatabaseInstance();
      if (!db) {
        throw new Error("Database instance is null after opening.");
      }

      const sql = `
        CREATE TABLE IF NOT EXISTS sessions (
          localId TEXT PRIMARY KEY NOT NULL,
          email TEXT NOT NULL,
          token TEXT NOT NULL
        );`;

      await db.execAsync(sql); 
      setDbInitialized(true); 
      setDbError(null); 
    } catch (error) {
      setDbInitialized(false);
      setDbError(new Error("Failed to initialize database table."));
      throw error; 
    }
  }, [dbInitialized, getDatabaseInstance]);

  useEffect(() => {
    initDB().catch(e => {
      Alert.alert("[useDB] useEffect: Error during initial DB setup:", e);
    });
  }, [initDB]); 

  

  const insertSession = useCallback(
    async ({ email, localId, token }) => {
      if (!dbRef.current || !dbInitialized) {
        throw new Error("Database not ready for operation.");
      }
      const sql = `INSERT OR REPLACE INTO sessions(localId, email, token) VALUES(?, ?, ?)`;
      return await dbRef.current.runAsync(sql, [localId, email, token]);
    },
    [dbInitialized] 
  );

  const getSession = useCallback(async () => {
    if (!dbRef.current || !dbInitialized) {
     
      return null;
    }
    const sql = `SELECT * FROM sessions`;
    return await dbRef.current.getFirstAsync(sql);
  }, [dbInitialized]);

  const truncateSessionTable = useCallback(async () => {
    if (!dbRef.current || !dbInitialized) {
      throw new Error("Database not ready for operation.");
    }
    const sql = `DELETE FROM sessions`;
    return await dbRef.current.execAsync(sql);
  }, [dbInitialized]);

  return {
    dbInitialized,
    dbError, 
    initDB,
    insertSession,
    getSession,
    truncateSessionTable,
  };
};