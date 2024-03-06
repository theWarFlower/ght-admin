import { Identifier, RaRecord } from "react-admin";

export interface Customer extends RaRecord {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address1: string;
  address2: string;
  zipcode: string;
  city: string;
  state: string;
  comment_ids: Identifier[]
  projects_ids: Identifier[]
}

/*
export interface Project extends RaRecord {
  id: number;
  sales_order: number;
  customer_id: Identifier;
  agent_id: Identifier;
  description: string;
  stage_id: number;
  status: string;
  created_at: string;
  updated_at: string;
  
}

export interface Comment extends RaRecord {
  id: number;
  author: "customer" | "agent";
  message: string;
  request_id: Identifier;
  customer_id: Identifier;
  agent_id: Identifier;
  created_at: string;
}


export interface Tag extends RaRecord {
  name: string;
  color: string;
}

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
*/