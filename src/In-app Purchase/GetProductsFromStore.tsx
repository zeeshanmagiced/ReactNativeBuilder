
import * as RNIap from "react-native-iap";

// fetch plans from Api and Get products from Store
getPlansApiResponse = async (responseJson: any) => {
    const itemSKU = ['vipyearly', 'vipmonthly', 'basicyearly', 'basicmonthly'];
    const products = await RNIap.getSubscriptions({ skus: itemSKU });
    let skus = products ?? [];
    // Exchange Price from store
    this.setPlansPrices(responseJson,skus,itemSKU)
}

// Got plans and filter according to Store 
// i.e Plans details from api but prices from Store so User will get latest prices from Store only 
setPlansPrices = (responseJson: any, skus: any, itemSKU: any) => {
    const filteredPlans = responseJson.filter((element: any) => {
      if (itemSKU.includes(element.monthly_fee_product_id) || element.monthly_fee_product_id === "") {
        
        const monthlySku: any = skus.find((sku: any) => sku.productId === element.monthly_fee_product_id);
        if (monthlySku) {
            // For android While fetching from store they have different array elements 
          const monthlyPrice = this.getAndroidPrice(monthlySku);
          element.monthly_fee = monthlyPrice ? monthlyPrice : `$0.00`;
        }
  
        const yearlySku: any = skus.find((sku: any) => sku.productId === element.yearly_fee_product_id);
        if (yearlySku) {
          const yearlyPrice = this.getAndroidPrice(yearlySku);
          element.yearly_fee = yearlyPrice ? yearlyPrice : `$0.00`;
        }
  
        return true;
      }
      return false;
    });
  
    this.setState({ plan: filteredPlans });
  }

getAndroidPrice = (sku: any) => {
    if (sku?.subscriptionOfferDetails?.length > 0) {
      const offerDetails = sku.subscriptionOfferDetails[0];
      const pricingPhase = offerDetails.pricingPhases?.pricingPhaseList?.[0];
      if (pricingPhase?.formattedPrice) {
        return pricingPhase.formattedPrice;
      }
    }
    if (sku?.localizedPrice) {
      return sku.localizedPrice;
    }
  
    return `$0.00`;
  };