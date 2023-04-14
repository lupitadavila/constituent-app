import React, { useEffect } from "react";
import type { GetServerSideProps } from "next";
import prisma from '../lib/prisma';
import { Container, Stack } from "@mui/material";
import { ConstituentProps } from "../types/index.types";
import { parseConstituents } from "../helpers/parse";
import AppHeader from "@/src/components/AppHeader";
import ConstituentProvider, { ConstituentContext, ConstituentContextType } from "../context/constituentContext";
import Search from "../components/Search";
import ConstituentData from "../components/ConstituentData";

export const getServerSideProps: GetServerSideProps = async () => {
  const constituentList = await prisma.constituent.findMany({
    include: {
      traits: true,
    },
  });

  return {
    props: { 
      constituentList: parseConstituents(constituentList)
     }
  };
};

type Props = {
  constituentList: ConstituentProps[];
};

const Home: React.FC<Props> = (props) => {

  return (
    <ConstituentProvider>
      <Container>
        <Stack>
          <AppHeader />
          <Search />
          <ConstituentData constituentDefaultList={props.constituentList} />
        </Stack>
      </Container>
    </ConstituentProvider>
  );
};

export default Home;
