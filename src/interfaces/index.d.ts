import { Trait, VotingRegistration } from "@prisma/client";
import { UUID } from "crypto";

export type ConstituentProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: number;
    zip: number;
    registration: VotingRegistration;
    traits: Trait[];
    createdAt: string;
    updatedAt: string;
};

enum VotingRegistrationL2 {
    Democrat = "DEMOCRAT",
    Republican = "REPUBLICAN",
    Independent = "INDEPENDENT",
    Unregistered = "UNREGISTERED",
};

enum Stance {
    Pro = "PRO",
    Con = "CON",
};

export type L2User = {
    id: string;
    first_name: string;
    last_name: string;
    Street_address_1: string | null;
    Street_address_2: string | null;
    City: string;
    Zip: string;
    Occupation: string;
    Voting_registration: VotingRegistrationL2;
    Email: string;
    Phone: string;
    Household: string;
}''

export type ZendeskUser = {
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
