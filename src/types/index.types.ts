import { Source } from "@prisma/client";

export type ConstituentProps = {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
    address: string;
    phoneNumber: number;
    zip: number;
    traits: TraitProps[];
    createdAt: string;
    updatedAt: string;
};

export type TraitProps = {
    id: string;
    name: string;
    value: string;
    source: Source;
    constituentId: string;
    createdAt: string;
    updatedAt: string;
}

export type Registration = "democrat" | "republican" | "independent" | "unregistered";

export type Stance = "pro" | "con";
