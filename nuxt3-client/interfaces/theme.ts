import type { Dictionary } from 'lodash';

export interface ColorShades {
  '50': string;
  '100': string;
  '200': string;
  '300': string;
  '400': string;
  '500': string;
  '600': string;
  '700': string;
  '800': string;
  '900': string;
  '950': string;
}

export interface Theme extends Dictionary<ColorShades> {
  primaryColor: ColorShades;
  actionButtonColor: ColorShades;
  listingButtonColor: ColorShades;
  secondaryButtonColor: ColorShades;
  primaryLinksColor: ColorShades;
  secondaryLinksColor: ColorShades;
  successAlertColor: ColorShades;
  errorAlertColor: ColorShades;
  warningAlertColor: ColorShades;
  informationAlertColor: ColorShades;
}

export interface AuctionTheme {
  auctionBannerColor: string;
}
