// User & Auth Types
export type UserRole = 'PARENT' | 'DRIVER' | 'ADMIN';

export interface User {
  id: string;
  email: string;
  role: UserRole;
  created_at: string;
  updated_at: string;
}

export interface JWTPayload {
  sub: string;
  email: string;
  role?: UserRole;
  iat?: number;
  exp?: number;
}

// Parent Types
export interface ParentProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone?: string;
  address?: string;
  city?: string;
  state?: string;
  zip_code?: string;
  created_at: string;
  updated_at: string;
}

export interface Student {
  id: string;
  parent_id: string;
  first_name: string;
  last_name: string;
  date_of_birth?: string;
  school_name?: string;
  grade?: string;
  pickup_address: string;
  pickup_city: string;
  pickup_state: string;
  pickup_zip_code: string;
  pickup_latitude?: number;
  pickup_longitude?: number;
  dropoff_address: string;
  dropoff_city: string;
  dropoff_state: string;
  dropoff_zip_code: string;
  dropoff_latitude?: number;
  dropoff_longitude?: number;
  special_instructions?: string;
  created_at: string;
  updated_at: string;
}

// Driver Types
export type DriverStatus = 'PENDING' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';

export interface DriverProfile {
  id: string;
  user_id: string;
  first_name: string;
  last_name: string;
  phone: string;
  license_number: string;
  license_expiry?: string;
  vehicle_make?: string;
  vehicle_model?: string;
  vehicle_year?: number;
  vehicle_color?: string;
  vehicle_plate?: string;
  license_document_url?: string;
  insurance_document_url?: string;
  status: DriverStatus;
  approved_at?: string;
  approved_by?: string;
  created_at: string;
  updated_at: string;
}

// Group Types
export type GroupStatus = 'ACTIVE' | 'INACTIVE' | 'ARCHIVED';

export interface Group {
  id: string;
  name: string;
  description?: string;
  driver_id?: string;
  status: GroupStatus;
  created_by: string;
  created_at: string;
  updated_at: string;
}

export interface GroupStudent {
  id: string;
  group_id: string;
  student_id: string;
  pickup_order?: number;
  dropoff_order?: number;
  created_at: string;
}

// Trip Types
export type TripType = 'MORNING' | 'AFTERNOON';
export type TripStatus = 'SCHEDULED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface TripSession {
  id: string;
  group_id: string;
  driver_id: string;
  trip_type: TripType;
  scheduled_date: string;
  scheduled_time: string;
  started_at?: string;
  completed_at?: string;
  status: TripStatus;
  created_at: string;
  updated_at: string;
}

export interface LocationPoint {
  id: string;
  trip_session_id: string;
  latitude: number;
  longitude: number;
  accuracy?: number;
  speed?: number;
  heading?: number;
  timestamp: string;
  created_at: string;
}

// Subscription Types
export type PlanType = 'MONTHLY' | 'WEEKLY';
export type SubscriptionStatus = 'ACTIVE' | 'CANCELLED' | 'PAST_DUE' | 'EXPIRED';

export interface Subscription {
  id: string;
  parent_id: string;
  student_id: string;
  group_id?: string;
  plan_type: PlanType;
  status: SubscriptionStatus;
  current_period_start: string;
  current_period_end: string;
  cancel_at_period_end: boolean;
  cancelled_at?: string;
  created_at: string;
  updated_at: string;
}

export type PaymentStatus = 'PENDING' | 'COMPLETED' | 'FAILED' | 'REFUNDED';

export interface PaymentTransaction {
  id: string;
  subscription_id: string;
  amount: number;
  currency: string;
  payment_provider: string;
  provider_transaction_id?: string;
  status: PaymentStatus;
  payment_method?: string;
  failure_reason?: string;
  metadata?: Record<string, unknown>;
  created_at: string;
  updated_at: string;
}

// API Request/Response Types
export interface ApiResponse<T = unknown> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  limit: number;
}

