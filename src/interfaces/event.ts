import {
  Address,
  BasicTranslate,
  Collection,
  Content,
  OrderGateway,
  SocialMedia,
} from './serializers/commons';
import {
  EventCost,
  EventDate,
  EventImage,
  EventInfo,
  EventSeatmapCost,
  EventSeatmapLocation,
  EventSeatmapSpotRow,
  EventServiceSchedule,
  EventServiceSettings,
  EventSettings,
  EventStat,
  EventSupplierData,
  EventUrl,
  EventVenueInfo,
} from './serializers/event';

export interface Event {
  _id: string;
  user_id: string;
  supplier_id?: {
    id: string;
    collection: string;
  } | null;
  category_id: EventCategory;
  subcategory_id: string | null;
  special_category_id?: string | null;
  tags: EventTag[];
  content: Content[];
  info: EventInfo;
  images?: EventImage | null;
  social_media?: SocialMedia | null;
  stats: EventStat;
  settings: EventSettings;
  status?: boolean;
  created_at: string;
}

export interface EventNew {
  event_general: {
    supplier_id: string;
    category_id: string;
    sub_category_id: string;
    sub_sub_cateogry_id: string;
    images: {
      web: string;
      app: string;
      flyer: string;
    };
    tags: string[];
    content: {
      name: string;
      description: string;
      lang: string;
    }[];
  };
  event_aditional: {
    social_media: {
      facebook: string;
      instagram: string;
      twitter: string;
    };
    info: {
      age_limit: number;
      duration: string;
      content: {
        lang: string;
        general: string;
        observations: string;
        services: string;
        restrictions: string;
        access_limit: string;
      }[];
    };
  };
  eventDates: {
    dates: {
      range: {
        start_at: Date;
        end_at: Date;
      };
    };
    schedules: {
      start_at: Date;
      end_at: Date;
      costs: {
        cost: number;
        lower: number;
        high: number;
      };
      urls: {
        ticket: string;
        streaming: string;
      };
    }[];
  };
}
export interface EventCategory {
  _id: string;
  category: BasicTranslate[];
  picture: string;
  color: string;
  status?: boolean;
  content: Content[];
}

export interface EventDiscount {
  schedule_timetable_id?: string | null;
  service_id?: string | null;
  seatmap_id: string | null;
  name: BasicTranslate[];
  coupon: string;
  discount: string;
  limit?: number;
  status?: number;
  expires_at?: Date | null;
}

export interface EventOrder {
  user_id: string;
  invoice_status?: boolean;
  status?: boolean;
}

export interface EventOrderItem {
  order_id: string;
  seatmap_spot_id?: EventSeatmapSpot | null;
  service_spot_id?: EventServiceSpot | null;
  discount_id?: EventDiscount | null;
  cost?: number;
  fees?: number;
  taxes?: number;
  discount?: number;
  total?: number;
}

export interface EventOrderPayment {
  order_id: string;
  gateway: OrderGateway;
  cost?: number;
  fees?: number;
  taxes?: number;
  discount?: number;
  total?: number;
  comment?: string | null;
  status?: number;
}

export interface EventSchedule {
  event_id: string;
  venue_id: string;
  type: EventDate;
  status?: boolean;
}

export interface EventScheduleTimetable {
  schedule_id: string;
  start_at: Date;
  end_at?: Date | null;
  costs: EventCost;
  urls: EventUrl;
  sold_out?: boolean;
  status?: boolean;
}

export interface EventSeatmap {
  schedule_timetable_id: string;
  section: string;
  spots: EventSeatmapSpotRow[];
  costs: EventSeatmapCost;
  status?: boolean;
}

export interface EventSeatmapSpot {
  seatmap_id: string;
  location: EventSeatmapLocation;
  cost: number;
  available: boolean;
  status?: boolean;
}

export interface EventService {
  schedule_timetable_id: string;
  category_id: string;
  name: string;
  description: string;
  suggestions: string;
  schedule: EventServiceSchedule;
  settings: EventServiceSettings;
}

export interface EventServiceCategory {
  category: BasicTranslate[];
  status?: boolean;
}

export interface EventServiceSpot {
  service_id: string;
  spot: number;
  cost: number;
  disability?: boolean;
  available?: boolean;
  status?: boolean;
}

export interface EventSpecialCategory {
  _id: string;
  user_id: string;
  category: Content[];
  header_img: string;
  event_img: string;
  color: string;
  status?: boolean;
  initial_date: string;
  finish_date: string;
  location: {
    latitude: string;
    longitude: string;
    city: string;
    state: {
      long_name: string;
      short_name: string;
    };
    country: {
      long_name: string;
      short_name: string;
    };
    description: string;
  };
  description: string;
}

export interface EventSubcategory {
  category_id: string;
  subcategory: BasicTranslate[];
  status?: boolean;
}

export interface EventSubsubcategory {
  category_id: string;
  subcategory_id: string;
  subsubcategory: BasicTranslate[];
  status?: boolean;
}

export interface EventSupplier {
  _id: string;
  user_id?: string | null;
  name: string;
  url: string;
  color: string;
  data?: EventSupplierData | null;
  status?: boolean;
}

export interface EventTag {
  tag: string;
  status?: boolean;
}

export interface EventVenue {
  _id: string;
  category_id: Collection;
  name: string;
  address: Address;
  info?: EventVenueInfo | null;
  status?: boolean;
  created_at: string;
}

export interface EventVenueCategory {
  category: BasicTranslate[];
  status?: boolean;
  _id: string;
}
