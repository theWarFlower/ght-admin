export interface Request {
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
    'SCHEDULED',
    'FOLLOW UP REQUIRED',
    'NEW REQUEST',
    'PROPOSAL REQUIRED'
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

