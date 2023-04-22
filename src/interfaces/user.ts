import { AdvertisementOrderItem } from './advertisement';
import { Event, EventCategory, EventSubcategory } from './event';
import { Phone, Address, Tax, Collection } from './serializers/commons';
import {
  UserSettings,
  UserPayment,
  UserPromoter,
  UserPublicityStat,
  UserTicketSettings,
  UserTicketExchange,
} from './serializers/user';

export type Role = 'SUPER_ADMIN' | 'ADMIN' | 'PROMOTER' | 'EDITOR' | 'USER';

export interface User {
  _id: string;
  uid?: string;
  id_token?: string;
  role?: Role | null;
  roles?: string[] | Role[];
  firstname?: string | null;
  surname?: string | null;
  username?: string | null;
  email?: string | null;
  phones?: Phone[] | null;
  sex?: string | null;
  birthday?: Date | null;
  avatar?: string | null;
  address?: Address | null;
  settings?: UserSettings | null;
  payment_data?: UserPayment | null;
  tax_data?: Tax | null;
  promoter?: UserPromoter | null;
  verified?: boolean;
  status?: boolean;
  id?: string;
}

export interface UserBanner {
  user_id: string;
  item_id: AdvertisementOrderItem;
  image: string;
  link: string;
  stats: UserPublicityStat;
  status?: boolean;
  expires_at: Date;
}

export interface UserBannerReview {
  user_banner_id: string;
  comment: string;
  reviewed_by: string;
}

export interface UserCostum {
  user_id: string;
  events_categories: EventCategory;
  events_subcategories: EventSubcategory;
}

export interface UserFavorite {
  user_id: Collection;
  events_likes: Collection[];
  events_attends: Collection[];
}

export interface UserFollow {
  user_id: string;
  events_tags: Event[];
}

export interface UserRecommend {
  user_id: string;
  item_id: string;
  name: string;
  description: string;
  image: string;
  link: string;
  stats: UserPublicityStat;
  status?: boolean;
  expires_at: Date;
}

export interface UserRecommendReview {
  user_recommend_id: string;
  comment: string;
  reviewed_by: string;
}

export interface UserReview {
  user_id: string;
  comment: string;
  reviewed_by: string;
}

export interface UserTicket {
  user_id: string;
  item_id: string;
  ticket: string;
  settings: UserTicketSettings;
  exchange?: UserTicketExchange;
  status?: boolean;
}

export interface UserAttends {
  events_attends_list: Event[];
}
