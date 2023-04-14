import { Source } from "@prisma/client";
import { ConstituentCreateRequest, L2User, TraitCreateRequest, ZendeskUser } from "../interfaces/index.interface";
import { ConstituentProps, TraitProps } from "../types/index.types";

export const parseTraits = (traits: any) : TraitProps[] => {
    if (traits === undefined) {
        return [];
    }
    return traits.map((trait: any) => ({
      ...trait,
      createdAt: trait.createdAt.toISOString(),
      updatedAt: trait.updatedAt.toISOString(),
    } as unknown as TraitProps))
};

export const parseConstituent = (constituent: any) : ConstituentProps => {
    return ({
        ...constituent,
        createdAt: constituent.createdAt.toISOString(),
        updatedAt: constituent.updatedAt.toISOString(),
        traits: parseTraits(constituent.traits),
    } as unknown as ConstituentProps);
};

export const parseConstituents = (constituents: any): ConstituentProps[] => {
    return constituents.map((constituent: any) => parseConstituent(constituent))
};

export const mapL2ConstituentRequest = (user : L2User) : ConstituentCreateRequest => {
    const occupation: TraitCreateRequest = {
        name: "occupation",
        value: user.Occupation,
        source: Source.L2,
    };

    const household: TraitCreateRequest = {
        name: "household",
        value: user.Household,
        source: Source.L2,
    }
    const registration: TraitCreateRequest = {
        name: "votingRegistration",
        value: user.Voting_registration,
        source: Source.L2
    }
    return {
        firstName: user.first_name,
        lastName: user.last_name,
        email: user.Email,
        address: `${user.Street_address_1} ${user.Street_address_2}`,
        phoneNumber: Number(user.Phone),
        zip: Number(user.Zip),
        traits: [occupation, household, registration],
    };
};

export const mapZendeskConstituentRequest = (user : ZendeskUser) : ConstituentCreateRequest => {
    const highSchool: TraitCreateRequest = {
        name: "highSchool",
        value: user.High_school,
        source: Source.ZENDESK,
    };

    const externalId: TraitCreateRequest = {
        name: "externalId",
        value: user.External_id,
        source: Source.ZENDESK,
    };

    const netNeutrality: TraitCreateRequest = {
        name: "netNeutralityStance",
        value: user.Net_neutrality_stance,
        source: Source.ZENDESK,
    };

    const name = user.Name.split(" ");

    return {
        firstName: name[0],
        lastName: name[1],
        email: user.Email,
        phoneNumber: Number(user.Phone),
        traits: [netNeutrality, highSchool, externalId],
    };
};
