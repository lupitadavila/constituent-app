import { Source } from "@prisma/client";
import { Registration, Stance } from "../types/index.types";

export interface L2User {
    id: string;
    first_name: string;
    last_name: string;
    Street_address_1: string | null;
    Street_address_2: string | null;
    City: string;
    Zip: string;
    Occupation: string;
    Voting_registration: Registration;
    Email: string;
    Phone: string;
    Household: string;
};

export interface ZendeskUser {
    Id: number;
    Name: string;
    Email: string;
    Phone: string;
    External_id: string;
    Created_at: string;
    Updated_at: string;
    High_school: string;
    Net_neutrality_stance: Stance;
};

export interface ConstituentCreateRequest {
    firstName: string;
    lastName: string;
    email: string;
    address?: string;
    phoneNumber: number;
    zip?: number;
    traits: TraitCreateRequest[];
}

export interface TraitCreateRequest {
    name: string;
    value: string;
    source: Source;
}
