export interface DetailCapType {
  name: string;
  date: string;
  host_name: string;
  is_paid: boolean;
  quota: number;
  location: string;
  details: string;
}

export interface DetailParticipantsType {
  id: number;
  user_name: string;
  pictures: string;
}

export interface DetailTicketType {
  quota: number;
  price: string;
  ticket_name: string;
  ticket_id: number;
}

export interface DetailCommentType {
  comment: string;
  id: number;
  pictures: string;
  user_name: string;
}

export interface objPostType {
  comment?: string;
  event_id: number;
}

export interface objReservType {
  event_id: number;
  phone_number: string;
  payment_method: string;
  bank: string;
  tickets: Partial<objTicketType[]>;
}

export interface objTicketType {
  ticket_id?: number;
  quantity?: number;
  ticket_name?: string;
}
