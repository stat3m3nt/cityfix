# 🏙️ CityFix — Municipal Infrastructure Reporter
 
A mobile field reporting app built with **React Native (Expo)** that empowers citizens to report and track municipal infrastructure issues — potholes, broken streetlights, damaged sidewalks, and more — with real GPS location, photos, and local persistence.
 
---
 
## 🎯 Problem It Solves
 
Citizens often have no easy, structured way to report infrastructure issues to their city. CityFix lets anyone quickly document an issue with a photo, GPS location, and severity level — creating a personal log of community problems they've submitted. Every report is pinned to an exact GPS coordinate, displayed on an interactive map, and persists across app restarts.
 
---
 
## 🚀 Features
 
| Feature | Description |
|---|---|
| 📍 GPS Location | Captures your exact coordinates on every report |
| 📸 Photo Capture | Built-in camera with retake support |
| 🗺️ Interactive Map | Color-coded markers by severity; tap to view full report details |
| 🗂️ Filter & Track | Filter reports by All / Open / Resolved with live counts |
| 💾 Persistent Storage | Reports survive app restarts via AsyncStorage |
| 🗑️ Delete Reports | Remove resolved or accidental reports |
 
---
 
## 🛠️ Tech Stack
 
- **React Native** (Expo SDK 55) + **TypeScript**
- **Expo Router** — file-based navigation
- **expo-location** — GPS coordinates
- **expo-camera** — photo capture
- **react-native-maps** — interactive map with Google Maps
- **AsyncStorage** — local persistence
- **React Context API** — global state management
---
 
## 📐 Architecture
 
```
src/
├── app/(tabs)/
│   ├── index.tsx          # Home dashboard with stats
│   ├── create-report.tsx  # Report creation form
│   ├── reports.tsx        # Full report list with filter tabs
│   └── map.tsx            # Interactive map with marker detail modal
├── components/
│   ├── common/            # ScreenHeader, EmptyState
│   └── reports/           # ReportCard, ReportList, ReportPhotoInput, SeveritySelector
├── context/
│   └── ReportContext.tsx  # Global state + AsyncStorage persistence
├── hooks/
│   ├── useCreateReport.ts # Form state, camera, save logic
│   └── useCurrentLocation.ts
├── utils/
│   └── reportHelpers.ts
└── constants/
    ├── colors.ts
    └── reportOptions.ts
```
 
---
 
## ⚙️ Installation & Setup
 
```bash
git clone https://github.com/stat3m3nt/cityfix.git
cd cityfix
npm install
```
 
Create a `.env` file in the project root (see `.env.example`):
```
EXPO_PUBLIC_GOOGLE_MAPS_API_KEY=your_google_maps_key_here
```
 
Run a dev build (required — Expo Go is not supported due to native modules):
```bash
npx expo run:android   # Android (requires Android Studio)
npx expo run:ios       # iOS (requires Xcode on macOS)
```
 
Then start the Metro bundler:
```bash
npx expo start --dev-client
```
 
> **Note:** A Google Maps API key is required for the map screen. Get one at [console.cloud.google.com](https://console.cloud.google.com) and enable Maps SDK for Android.
 
---
 
## 🗺️ Roadmap
 
- [ ] Supabase backend — sync reports across devices
- [ ] User authentication — Google Sign-In
- [ ] 311 API integration — submit directly to city systems
- [ ] Push notifications — get updates when your report is actioned
- [ ] Offline mode with sync queue
---
 
## 👤 Author
 
**Andrew Evboifo** — [GitHub](https://github.com/stat3m3nt)
 
