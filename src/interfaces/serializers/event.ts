import { SocialMedia } from './commons';

interface EventoDateRange {
  start_at: Date;
  end_at?: Date | null;
}

export interface EventDate {
  defined?: Date | null;
  range: EventoDateRange | null;
}

interface EventPicture {
  app?: string | null;
  web?: string | null;
}

export interface EventImage {
  picture?: EventPicture | null;
  flyer?: string | null;
}

interface EventInfoContent {
  lang: string;
  general: string;
  observations: string;
  services: string;
  restrictions: string;
  access_limit: string;
}

export interface EventInfo {
  age_limit: number;
  duration: Date;
  content: EventInfoContent[];
}

export interface EventCost {
  cost: number;
  lower: number;
  high: number;
}

interface EventSeatmapCostPhases {
  name: string;
  amount: number;
  availability: number;
  cost: number;
  starts_at: Date;
  expires_at: Date;
  status: boolean;
}

export interface EventSeatmapCost {
  general?: number | null;
  phases?: EventSeatmapCostPhases[] | null;
}

export interface EventSeatmapLocation {
  row: string;
  spot: string;
  disability: boolean;
}

export interface EventSeatmapSpotRow {
  row?: string | null;
  start: number;
  end: number;
  disability: boolean;
}

interface EventServiceTimetable {
  name?: string | null;
  start_at: Date;
  end_at?: Date | null;
}

interface EventServiceConcept {
  name: string;
  timetable: EventServiceTimetable[];
}

export interface EventServiceSchedule {
  concept: EventServiceConcept;
  cost: number;
  limit: number;
}

export interface EventServiceSettings {
  currency: string;
  cost: number;
  limit: number;
}

interface EventSettingsTicketResale {
  enable: boolean;
  start_at: Date;
  end_at: Date;
}

interface EventSettingsTicketReserve {
  enable: boolean;
  cost_percentage: number;
  days_limit: number;
}

interface EventSettingsTicket {
  resale?: EventSettingsTicketResale | null;
  reserve?: EventSettingsTicketReserve | null;
  sell_limit: number;
  pre_sell_start_at: Date;
  sell_start_at: Date;
}

export interface EventSettings {
  currency: string;
  tickets?: EventSettingsTicket | null;
  isFree: boolean;
  isCharity: boolean;
  isSubscription: boolean;
  msi: {
    month: number;
    status: boolean;
  }[];
}

interface EventStatShared {
  facebook: number;
  twitter: number;
  instagram: number;
  whatsapp: number;
  telegram: number;
}

export interface EventStat {
  visit: number;
  like: number;
  attend: number;
  purchase: number;
  shared?: EventStatShared;
}

export interface EventSupplierData {
  type: string;
  url: string;
  key?: string | null;
}

export interface EventUrl {
  ticket?: string | null;
  streaming?: string | null;
}

interface EventVenueInfoPayment {
  cash: boolean;
  card: boolean;
  debit: boolean;
}

interface EventVenueInfoSchedule {
  day: string;
  start_at: Date;
  end_at: Date;
}

interface EventVenueInfoBox {
  number: string;
  schedule: EventVenueInfoSchedule[];
  payment: EventVenueInfoPayment;
}

interface EventVenueInfoParking {
  currency: string;
  cost: number;
}

export interface EventVenueInfo {
  quota?: string;
  url?: string | null;
  social_media?: SocialMedia | null;
  parking?: EventVenueInfoParking | null;
  box_office?: EventVenueInfoBox | null;
  accessible_seats?: boolean | null;
  generic_rules?: string | null;
  children_rules?: string | null;
}
