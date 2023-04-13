import { ConstituentProps } from "@/interfaces";
import prisma from "@/lib/prisma";
import { Trait } from "@prisma/client";
import { Container, Paper, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import React from "react";


type Props = {
    constituent: ConstituentProps,
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params;
    const constituent = await prisma.constituent.findUnique({ where: { id } });

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
                <Typography variant="p" mb={3}>
                    {constituent.traits}
                </Typography>
            </Paper>
            
            
        </Container>
    );
}



export default UserPage;