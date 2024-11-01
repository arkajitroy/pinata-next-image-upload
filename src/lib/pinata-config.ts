"server only";

import { PinataSDK } from "pinata";

export const pinata = new PinataSDK({
  pinataJwt: `${process.env.NEXT_PINATA_JWT_KEY}`,
  pinataGateway: `${process.env.NEXT_PUBLIC_PINATA_GATEWAY_URL}`,
});
