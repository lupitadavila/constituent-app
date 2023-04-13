import { ConstituentProps } from "@/src/interfaces/index.interface";
import prisma from "@/src/lib/prisma";
import { Trait } from "@prisma/client";
import { Container, Paper, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";


type Props = {
    constituent: ConstituentProps,
};

type Params = {
    id: string,
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as Params;
    const constituent = await prisma.constituent.findUnique({ where: { id } });

    if (constituent === null) {
        return {
            props: { constituent: null}
        }
    }

    return {
        props: {
            constituent: ({
                ...constituent,
                createdAt: constituent.createdAt.toISOString(),
                updatedAt: constituent.updatedAt.toISOString(),
            } as unknown as ConstituentProps )
        },
    };
};

const UserPage: React.FC<Props> = (props) => {
    const { constituent } = props;

    return (
        <Container>
            <Paper>
                <Typography variant="h4" component="h1" mb={3}>
                    {constituent.firstName} {constituent.lastName}
                </Typography>
                <Typography mb={3}>
                    {constituent.email}
                </Typography>
            </Paper>
            
            
        </Container>
    );
}



export default UserPage;