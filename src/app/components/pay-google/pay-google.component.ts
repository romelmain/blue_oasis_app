import { Component } from '@angular/core';
import { GooglePayButtonModule } from '@google-pay/button-angular';

@Component({
  selector: 'app-pay-google',
  standalone: true,
  imports: [GooglePayButtonModule],
  templateUrl: './pay-google.component.html',
  styleUrl: './pay-google.component.css',
})
export class PayGoogleComponent {
  buttonWidth = 240;

  totalToto = 200.0;

  paymentRequest: google.payments.api.PaymentDataRequest = {
    apiVersion: 2,
    apiVersionMinor: 0,
    allowedPaymentMethods: [
      {
        type: 'CARD',
        parameters: {
          allowedAuthMethods: ['PAN_ONLY', 'CRYPTOGRAM_3DS'],
          allowedCardNetworks: ['AMEX', 'VISA', 'MASTERCARD'],
        },
        tokenizationSpecification: {
          type: 'PAYMENT_GATEWAY',
          parameters: {
            gateway: 'example',
            gatewayMerchantId: 'exampleGatewayMerchantId',
          },
        },
      },
    ],
    merchantInfo: {
      merchantId: '12345678901234567890',
      merchantName: 'Demo Merchant',
    },
    transactionInfo: {
      totalPriceStatus: 'FINAL',
      totalPriceLabel: 'Total',
      totalPrice: this.totalToto.toFixed(),
      currencyCode: 'USD',
      countryCode: 'US',
    },
  };

  onLoadPaymentData(event: any) {
    console.log(event, '>> Data Pago Realizado !!');
  }

  onError = (event: ErrorEvent): void => {
    console.error('error', event.error);
  };
}
