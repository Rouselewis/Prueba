export interface UserPayment {
  stripe?: string | null;
  paypal?: string | null;
}

export interface UserCard {
  stripeId: string;
  card: string;
  type: string;
  name: string;
  exp: string;
}

export interface UserPromoter {
  selfie: string;
  id_front: string;
  id_back: string;
  status: number;
}

interface UserStat {
  impressions: number;
  clicks: number;
}

export interface UserPublicityStat {
  app: UserStat;
  web: UserStat;
}

export interface UserSettings {
  lang: string;
  radius_search?: string;
  receive_mail: boolean;
  receive_notifications: boolean;
}

export interface UserTicketExchange {
  user_id: string;
  type: boolean;
}

export interface UserTicketSettings {
  resale: boolean;
  transfer: boolean;
}
