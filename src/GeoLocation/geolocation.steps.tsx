jest.mock("react-native-geolocation-service", () => ({
    getCurrentPosition: jest.fn((success, error) => {
      success({
        coords: {
          latitude: 123,
          longitude: 45,
        },
      });
      error({
       
      })
    }),
    requestAuthorization: () => "granted",
    requestAuthorization: () => "denied",
    requestAuthorization: () => "disabled",
  }));
  jest.mock('react-native-geolocation-service', () => ({
    requestAuthorization: jest.fn(),
  }));