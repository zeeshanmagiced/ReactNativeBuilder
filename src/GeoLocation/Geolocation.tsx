// Access Code 

import Geolocation from "react-native-geolocation-service";
import { Alert, PermissionsAndroid, Platform } from "react-native";
hasLocationPermissionIOS = async () => {
    const status = await Geolocation.requestAuthorization("whenInUse");

    if (status === "granted") {
      return true;
    }

    if (status === "denied" || status === "disabled") {
      this.showAlert(
        "Alert",
        `Permissions denied, please change it from settings.`
      );
    }

    return false;
  };

  hasLocationPermission = async () => {
    if (Platform.OS === "ios") {
      const hasPermission = await this.hasLocationPermissionIOS();
      return hasPermission;
    }

    const hasPermissionFine = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const hasPermissionCoarse = await PermissionsAndroid.check(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    if (hasPermissionFine || hasPermissionCoarse) {
      return true;
    }

    const statusFINE = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
    );
    const statusCOARSE = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.ACCESS_COARSE_LOCATION
    );

    if (
      statusFINE === PermissionsAndroid.RESULTS.GRANTED ||
      statusCOARSE === PermissionsAndroid.RESULTS.GRANTED
    ) {
      return true;
    }

    if (
      statusFINE === PermissionsAndroid.RESULTS.DENIED ||
      statusCOARSE === PermissionsAndroid.RESULTS.NEVER_ASK_AGAIN
    ) {
      this.showAlert(
        "Alert",
        `Permissions denied, please change it from settings.`
      );
    }

    return false;
  };


  // Get Location 

  getLocation = async (token: any) => {
    const hasLocationPermission = await this.hasLocationPermission();
    console.log("Permission Granted ?", hasLocationPermission);
    Geolocation.getCurrentPosition(
      async (position: any) => {
          // Here is your location after taking all permissions
            let locationUrl = `?latitude=${position.coords.latitude}&longitude=${position.coords.longitude}`;

        // api calling to register User's location
        this.callGetLocationAPI(locationUrl, token);
      },
      (error: any) => {
        console.log("Error", error);
      },
      {
        enableHighAccuracy: false,
        timeout: 15000,
        distanceFilter: 0,
        forceRequestLocation: true,
        showLocationDialog: false,
      }
    );
  };