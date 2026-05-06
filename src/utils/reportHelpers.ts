import * as Location from 'expo-location';
import { Report } from '../context/ReportContext';

/**
 * Builds a human-readable title from category and severity.
 */
export function createReportTitle(category: string, severity: string): string {
    return `${category} - ${severity} Priority`;
}

/**
 * Validates required fields before saving a report.
 * Returns an error string if invalid, empty string if valid.
 */
export function validateReportInput(category: string, severity: string, notes: string): string {
    if (!category) return 'Please select an issue type.';
  if (!severity) return 'Please select an urgency level.';
  if (!notes.trim()) return 'Please add a description of the issue.';
  return '';
}

/**
 * Reverse geocodes coordinates into a human-readable address string.
 * Returns a formatted address like "123 Main St, Milton, ON"
 * Falls back gracefully if geocoding fails.
 */

export async function reverseGeocode(
  latitude: number,
  longitude: number
): Promise<string> {
  try {
    const results = await Location.reverseGeocodeAsync({ latitude, longitude });
    if (results && results.length > 0) {
      const loc = results[0];
      const parts = [
        loc.streetNumber,
        loc.street,
        loc.city,
        loc.region,
      ].filter(Boolean);
      return parts.join(', ') || `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
    }
  } catch (e) {
    console.warn('[reverseGeocode] Failed:', e);
  }
  // Fallback to raw coordinates
  return `${latitude.toFixed(5)}, ${longitude.toFixed(5)}`;
}
 
/**
 * Assembles a new Report object from raw input data.
 * Address is passed in after async reverse geocoding.
 */
export function createNewReport( data : {
    category: string;
    severity: string;
    notes: string;
    photoURI: string | null;
    latitude: number;
    longitude: number;
}): Report {
    return {
        id: generateId(),
        title: createReportTitle(data.category, data.severity),
        category: data.category,
        severity: data.severity,
        notes: data.notes,
        photoURI: data.photoURI,
        latitude: data.latitude,
        longitude: data.longitude,
        address: data.address,
        status: 'Open',
        createdAt: new Date(),
    };
}

 
/**
 * Generates a collision-safe unique ID.
 * Uses crypto.randomUUID() when available (React Native 0.73+),
 * falls back to a timestamp + random suffix.
 */
export function generateId(): string {
  if (typeof crypto !== 'undefined' && crypto.randomUUID) {
    return crypto.randomUUID();
  }
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}
 