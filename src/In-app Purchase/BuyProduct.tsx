
import * as RNIap from "react-native-iap";

getOfferToken = (subscriptionDetails:any) =>{
  const offerToken = Platform.OS === 'android'
    ? subscriptionDetails.subscriptionOfferDetails[0]?.offerToken || null
    : null
    return offerToken
}
afterOfferToken = async(sku:any,offerToken:any) =>{
  try {
    const subscriptionResponse = await RNIap.requestSubscription({
      sku,
      ...(offerToken && {
          subscriptionOffers: [{sku, offerToken}],
      }),
      });
    console.log("Subscription Request Successful:", subscriptionResponse);
    this.registerSubscription();
  } catch (error) {
    console.error("Error during subscription request:", error);
  }
}
handlePurchase = async (productId : string | undefined | null) => {
  try {
    if (productId === undefined) {
      productId = this.state.modality === ModalityEnum.montly ? "basicmonthly" : "basicyearly";
    }
    if (productId === null) {
      Alert.alert(`Purchase is not properly configured, null`)
      return;
    }
    if (productId === "") {
      Alert.alert(`Purchase is not properly configured, empty`)
      return;
    }
    const subscriptions = await RNIap.getSubscriptions({skus: [productId]});
    const subscriptionDetails:any = subscriptions[0];
    const sku = subscriptionDetails.productId;
    if(Platform.OS=="ios"){
      const subscriptionResponse = await RNIap.requestSubscription({
        sku,
        });
      console.log("Subscription Request Successful:", subscriptionResponse);
      // API call after success Purchase
      this.registerSubscription();
    }else{
      // in Android need to get Offer Token first 
      const offerToken = this.getOfferToken(subscriptionDetails)
        if (!offerToken) {
          return;
        }
        this.afterOfferToken(sku,offerToken)
    }
      
   
  } catch (e) {
    Alert.alert(`Purchase was not finished`)
  }
};

