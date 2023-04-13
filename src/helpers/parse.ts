import { ConstituentProps, TraitProps } from "../types/index.types";

export const parseTraits = (traits: any) : TraitProps[] => {
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