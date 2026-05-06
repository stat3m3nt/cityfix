/**
 * GeoSnapFieldReporter - Reports Context
 * -------------------------------------------------------------------
 * Persists reports to AsyncStorage so they survive app restarts.
 *
 * Install dependency first:
 *   npx expo install @react-native-async-storage/async-storage
 */

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

// ─── Types ────────────────────────────────────────────────────────────────────

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
  createdAt: Date;
};

type ReportContextType = {
  reports: Report[];
  isLoading: boolean;
  addReport: (report: Report) => Promise<void>;
  updateReportStatus: (id: string, status: ReportStatus) => Promise<void>;
  deleteReport: (id: string) => Promise<void>;
};

// ─── Constants ────────────────────────────────────────────────────────────────

const STORAGE_KEY = "@geosnap:reports";

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * AsyncStorage stores strings only.
 * Dates are serialised as ISO strings and must be revived on read.
 */
function serialise(reports: Report[]): string {
  return JSON.stringify(reports);
}

function deserialise(raw: string): Report[] {
  const parsed = JSON.parse(raw) as Array<
    Omit<Report, "createdAt"> & { createdAt: string }
  >;
  return parsed.map((r) => ({
    ...r,
    createdAt: new Date(r.createdAt), // revive Date from ISO string
  }));
}

async function loadFromStorage(): Promise<Report[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE_KEY);
    return raw ? deserialise(raw) : [];
  } catch (e) {
    console.error("[ReportContext] Failed to load reports:", e);
    return [];
  }
}

async function saveToStorage(reports: Report[]): Promise<void> {
  try {
    await AsyncStorage.setItem(STORAGE_KEY, serialise(reports));
  } catch (e) {
    console.error("[ReportContext] Failed to save reports:", e);
  }
}

// ─── Context ──────────────────────────────────────────────────────────────────

const ReportContext = createContext<ReportContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────

export function ReportProvider({ children }: { children: ReactNode }) {
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Load persisted reports once on mount
  useEffect(() => {
    loadFromStorage().then((saved) => {
      setReports(saved);
      setIsLoading(false);
    });
  }, []);

  /**
   * Add a new report and immediately persist the updated list.
   */
  const addReport = async (report: Report): Promise<void> => {
    const updated = [report, ...reports];
    setReports(updated);
    await saveToStorage(updated);
  };

  /**
   * Flip the status of one report (Open ↔ Resolved) and persist.
   */
  const updateReportStatus = async (
    id: string,
    status: ReportStatus
  ): Promise<void> => {
    const updated = reports.map((r) => (r.id === id ? { ...r, status } : r));
    setReports(updated);
    await saveToStorage(updated);
  };

  /**
   * Delete a report by id and persist.
   * Bonus feature — useful for demos and portfolio walkthroughs.
   */
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

// ─── Hook ─────────────────────────────────────────────────────────────────────

export function useReportContext() {
  const context = useContext(ReportContext);
  if (!context) {
    throw new Error("useReportContext must be used within a ReportProvider");
  }
  return context;
}