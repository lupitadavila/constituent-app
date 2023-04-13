import { Trait, VotingRegistration } from "@prisma/client";

export type ConstituentProps = {
    id: number;
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