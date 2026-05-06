export default{
  expo: {
    name: "geosnap-field-reporter",
    slug: "geosnap-field-reporter",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/images/geoSnap-icon.png",
    scheme: "geosnapfieldreporter",
    userInterfaceStyle: "automatic",
    ios: {
      supportsTablet: true
    },
    android: {
      package: "com.stat3m3nt.geosnapfieldreporter",
      adaptiveIcon: {
        backgroundColor: "#3C3489",
        foregroundImage: "./assets/images/android/mipmap-xxxhdpi/ic_launcher.png",
      },
      permissions: ["ACCESS_COARSE_LOCATION", "ACCESS_FINE_LOCATION"],
      predictiveBackGestureEnabled: false,
      config: {
        googleMaps: {
          apiKey: process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY,
        },
      },
    },

    web: {
      output: "static",
      // favicon: "./assets/images/favicon.png"
    },
    plugins: [
      "expo-router",
      "expo-dev-client",
      [
        "expo-splash-screen",
        {
          image: "./assets/images/geoSnap-splash-icon.png",
          imageWidth: 200,
          resizeMode: "contain",
          backgroundColor: "#3C3489",
          dark: {
            backgroundColor: "#000000"
          }
        }
      ],
      "expo-font",
    ],
    experiments: {
      "typedRoutes": true,
      "reactCompiler": true
    }
  }
}

