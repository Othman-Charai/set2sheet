export default interface IOrder {
  id: String
  ref: String
  created_at: String
  status: Number
  vat: Number
  total: Number
  notes: Number
  tags: Number
  payement: IPayement
}

interface IPayement {
  status_text: String
  status: Number
  created_at: String
  payload: IPaymentPayload
}

interface IPaymentPayload {
  gateway: String
  response: {
    currencyCode: String
    transactionId: String
    merchantOrderId: String
    orderNumber: String
    recurrentInstallmentId: String
    responseMsg: String
    responseCode: String
    total: String
    lineItems: ILineItem[]
    billingAddr: IAddress
    shippingAddr: IAddress
  }
}

interface ILineItem {
  description: String
  duration: String
  options: any[]
  price: Number
  quantity: Number
  recurrence: any
  startupFee: any
  productId: String
  tangible: any
  name: String
  type: String
}

interface IAddress {
  addrLine1: String
  addrLine2: String
  city: String
  zipCode: String
  phoneNumber: String
  phoneExtension: String
  email: String
  country: String
  name: String
  state: String
}
