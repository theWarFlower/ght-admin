import { RaRecord } from "react-admin";

export interface Request extends RaRecord {
  id: number;
  name: string;
  phone: string;
  email: string;
  status: StatusType[];
  type: RequestType[];
  description: string;
  remarks: string;
  location: LocationType[];
  createdtime: string;
}

export const statusTypes = [
  'NEW REQUEST',
  'SCHEDULED',
  'PROPOSAL REQUIRED',
  'FOLLOW UP REQUIRED',
  'COMPLETED'
] as const

export type StatusType = typeof statusTypes[number]

export const locationTypes = [
  'Atlanta',
  'Birmingham',
  '30A'
] as const

export type LocationType = typeof locationTypes[number]

export const requestTypes = [
  'A/V Automation',
  'Electrical',
  'Lighting Control',
  'Network/Wi-Fi',
  'Security',
  'Other'
] as const

export type RequestType = typeof requestTypes[number]

export interface Message extends RaRecord {
  id: number;
  author: "customer" | "agent";
  message: string;
  ticket_id: number;
  email: string;
  customer_id: number;
  agent_id: number;
  timestamp: string;
}

export interface Customer extends RaRecord {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  avatar: string;
  update_at?: string;
}
