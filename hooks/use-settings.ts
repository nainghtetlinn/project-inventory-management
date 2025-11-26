import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";

type SortOption = "name" | "stock_asc" | "stock_desc";

export const useSettings = (
  defaultValues: {
    threshhold?: string;
    sortBy?: SortOption;
  } = { threshhold: "5", sortBy: "name" }
) => {
  const [threshold, setThreshold] = useState(defaultValues.threshhold || "5");
  const [sortBy, setSortBy] = useState<SortOption>(
    defaultValues.sortBy || "name"
  );

  const loadPreferences = async () => {
    try {
      const savedThreshold = await AsyncStorage.getItem("pref_threshold");
      const savedSort = await AsyncStorage.getItem("pref_sort");

      console.log(savedThreshold, savedSort);

      if (savedThreshold) setThreshold(savedThreshold);
      if (savedSort) setSortBy(savedSort as SortOption);
    } catch (e) {
      console.error("Failed to load settings", e);
    }
  };

  const updateThreshold = async (newThreshold: string) => {
    try {
      await AsyncStorage.setItem("pref_threshold", newThreshold);
      setThreshold(newThreshold);
    } catch (error) {
      console.error("Failed to update threshold", error);
    }
  };

  const updateSortBy = async (newSort: SortOption) => {
    try {
      await AsyncStorage.setItem("pref_sort", newSort);
      setSortBy(newSort);
    } catch (error) {
      console.error("Failed to update sort by", error);
    }
  };

  useEffect(() => {
    loadPreferences();
  }, []);

  return { threshold, sortBy, updateThreshold, updateSortBy };
};
