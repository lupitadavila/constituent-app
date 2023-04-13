import { Trait } from "@prisma/client";

export type ConstituentProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: number;
    zip: number;
    traits: Trait[];
    createdAt: string;
    updatedAt: string;
};

export type Registration = 'democrat' | 'republican' | 'independent' | 'unregistered';

export type Stance = 'pro' | 'con';