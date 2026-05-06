/**
 * CivicSnap — Report Context
 * ─────────────────────────────────────────────────────────────────
 * Manages report state and persists to AsyncStorage across restarts.
 * Reports now include a human-readable address field from reverse geocoding.
 */

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Types ────────────────────────────────────────────────────────

export type ReportStatus = "Open" | "Resolved";

export type Report = {
  id: string;
  title: string;
  category: string;
  severity: string;
  notes: string;
  photoURI: string | null;
  status: ReportStatus;
  latitude: number;
  longitude: number;
  address: string;       // human-readable from reverse geocoding
  createdAt: Date;
};

type ReportContextType = {
  reports: Report[];
  isLoading: boolean;
  addReport: (report: Report) => Promise<void>;
  updateReportStatus: (id: string, status: ReportStatus) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
};

// ─── Storage helpers ──────────────────────────────────────────────

const STORAGE_KEY = "@civicsnap:reports";

function serialise(reports: Report[]): string {
  return JSON.stringify(reports);
}

function deserialise(raw: string): Report[] {
  const parsed = JSON.parse(raw) as Array<
    Omit<Report, "createdAt"> & { createdAt: string }
  >;
  return parsed.map((r) => ({
    ...r,
    address: r.address ?? "",   // handle old records without address
    createdAt: new Date(r.createdAt),
  }));
}

async function loadFromStorage(): Promise<Report[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? deserialise(raw) : [];
  } catch (e) {
    console.error("[ReportContext] Failed to load:", e);
    return [];
  }
}

async function saveToStorage(reports: Report[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, serialise(reports));
  } catch (e) {
    console.error("[ReportContext] Failed to save:", e);
  }
}

// ─── Context ──────────────────────────────────────────────────────

const ReportContext = createContext<ReportContextType | undefined>(undefined);

export function ReportProvider({ children }: { children: React.ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadFromStorage().then((saved) => {
      setReports(saved);
      setIsLoading(false);
    });
  }, []);

  const addReport = async (report: Report): Promise<void> => {
    const updated = [report, ...reports];
    setReports(updated);
    await saveToStorage(updated);
  };

  const updateReportStatus = async (
    id: string,
    status: ReportStatus
  ): Promise<void> => {
    const updated = reports.map((r) => (r.id === id ? { ...r, status } : r));
    setReports(updated);
    await saveToStorage(updated);
  };

  const deleteReport = async (id: string): Promise<void> => {
    const updated = reports.filter((r) => r.id !== id);
    setReports(updated);
    await saveToStorage(updated);
  };

  return (
    <ReportContext.Provider
      value={{ reports, isLoading, addReport, updateReportStatus, deleteReport }}
    >
      {children}
    </ReportContext.Provider>
  );
}

export function useReportContext() {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
}