export interface PaginationParams {
  size?: number;
  page?: number;
  searchkey?: string;
  searchword?: string;
  sortby?: string;
  descending?: boolean;
}

interface AddressName {
  long_name: string;
  short_name?: string;
}

export interface Address {
  addressname?: string;
  latitude?: string;
  longitude?: string;
  address: string;
  address2?: string;
  city: string;
  state: AddressName;
  country: AddressName;
  short_state?: string;
  short_country?: string;
  zipcode: string;
  currency?: string;
  venue?: string;
  type?: string;
  quota?: string;
  url?: string;
  generic_rules?: string;
  children_rules?: string;
  accessible?: boolean;
  facebook?: string;
  instagram?: string;
  twitter?: string;
  cost?: number;
  box_office?: number;
  cash?: boolean;
  credit?: boolean;
  debit?: boolean;
  day?: {
    day: string;
    start_at: string;
    end_at: string;
  }[];
}

export interface CreateTicket {
  event_id: string;
  date: Date;
  schedule: string;
  resale: boolean;
  reserve: boolean;
  starting_date: Date;
  ending_date: Date;
  cost_percentage: number;
  pay_limit: number;
  free_event: boolean;
  charity: boolean;
  subscription: boolean;
  sell_limit: number;
  currency: string;
  sale_start: Date;
  pre_sale_start: Date;
  three_months: boolean;
  six_months: boolean;
  nine_months: boolean;
}

export interface Collection {
  id: string;
  collection: string;
}

export interface BasicTranslate {
  lang: string;
  name: string;
}

export interface Content {
  lang: string;
  name: string;
  description: string;
}

export interface OrderGateway {
  name: string;
  reference: string;
  invoice_id: string;
  discount_code: string;
  date: Date;
}

export interface Phone {
  phone?: string | null;
  type?: string | null;
}

export interface RegionCost {
  region: string;
  amount: number;
  cost: number;
}

export interface SocialMedia {
  facebook?: string | null;
  instagram?: string | null;
  twitter?: string | null;
}

export interface Tax {
  business_name: string;
  rfc: string;
  zipcode: string;
  cfdi: string;
}

export interface WithDocs<T> {
  items: T[];
  first: any;
  last: any;
  next: any;
  page: number;
  total: number;
  previous: any;
  size: number;
}
