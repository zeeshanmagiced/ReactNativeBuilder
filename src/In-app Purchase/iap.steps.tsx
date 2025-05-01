
import RNIap, { ProductPurchase, SubscriptionPlatform } from 'react-native-iap'; // Make sure it's correctly imported
jest.mock("react-native-iap", () => ({
	initConnection: jest.fn()
	  .mockImplementation((): Promise<any> => Promise.resolve()),
	flushFailedPurchasesCachedAsPendingAndroid: jest.fn()
	  .mockImplementationOnce((): Promise<any> => Promise.reject("Error"))
	  .mockImplementation((): Promise<any> => Promise.resolve()),
	purchaseUpdatedListener: jest.fn()
	  .mockImplementation((callback) => {
		callback({});
		return {remove(){}}
	}),
	purchaseErrorListener:  jest.fn()
	.mockImplementation((callback) => {
	  callback({});
	  return {remove(){}}
  	}),
    getProducts: jest.fn()
		.mockImplementationOnce(() => {
			throw "ERROR";
		})
		.mockImplementation(() => {
			return [
				{
					productId: "123"
				}
			]
		}),
	requestPurchase: jest.fn(),
  getSubscriptions: jest.fn(),

	requestSubscription: jest.fn(),
	clearTransactionIOS: jest.fn()
	  .mockImplementation((callback) => callback({})),
}))

jest.spyOn(RNIap, "requestPurchase").mockResolvedValue({
    transactionId: "12345",
    productId: "test_sku",
    transactionDate: Date.now(),
    transactionReceipt: "dummy_receipt",
  } as ProductPurchase);


  jest.spyOn(RNIap, "requestPurchase").mockResolvedValue({
    transactionId: "12345",
    productId: "test_sku",
    transactionDate: Date.now(),
    transactionReceipt: "dummy_receipt",
  } as ProductPurchase);
   jest.spyOn(RNIap, "requestPurchase").mockResolvedValue({
    transactionId: "12345",
    productId: "test_sku",
    transactionDate: Date.now(),
    transactionReceipt: "dummy_receipt",
  } as ProductPurchase);