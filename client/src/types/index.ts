import { LayoutDashboardIcon } from "@/components/ui/Icons";

export interface DashboardNavItem {
  href: string;
  icon: typeof LayoutDashboardIcon; // use 'typeof' here for the icon type
  srText: string;
  name: string;
}

export type Event = {
  id: string;
  image?: string;
  name: string;
  date: string;
  time: string;
  location: string;
  available_tickets: number;
  tickets_sold?: number;
  ticket_price: number;
  slug: string;
  meal_provides: boolean;
  description: string;
  default?: boolean;
  status: 0 | 1 | 2 | 3; // 0 = Pending, 1 = Active, 2 = Rejected, 3 = Archived
  created_by?: string;
};

export type Ticket = {
  id: string;
  name: string;
  email: string;
  payment_method: 1 | 2 | null; // 1 = Cash, 2 = Card, null = free
  status: 0 | 1 | 2; // 0 = not-paid, 1 = paid, 2 = refunded
  mobile?: string;
  meal_type?: number | null;
  refreshments?: 0 | 1 | null;
  lunch?: 0 | 1 | null;
  attendance: 0 | 1; // 0 = not-attended, 1 = attended
  arrival: string | null;
  event_id?: string;
};

export type Participant = {
  id: string;
  name: string;
  email: string;
  mobile: string;
  mealType: string;
  refreshments: number;
  lunch: number;
  attendance: number;
  arrival: string;
};

export interface TicketConfirmationProps {
  username: string;
  event: string;
  eventImage: string;
  date: string;
  time: string;
  location: string;
  ticketId: string;
  ticketUrl: string;
  subject: string;
  userEmail:string;
}


export interface PaymentColumns {
  user_id: string;
  user_name : string;
  to_be_paid: number;
}