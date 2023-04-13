import React from "react";
import prisma from "@/src/lib/prisma";
import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import { GetServerSideProps } from "next";
import AppHeader from "@/src/components/AppHeader";
import { ConstituentProps, TraitProps } from "@/src/types/index.types";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { parseConstituent } from "@/src/helpers/parse";
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import EmailIcon from '@mui/icons-material/Email';
import HomeIcon from '@mui/icons-material/Home';
import FaceIcon from '@mui/icons-material/Face';


type Props = {
    constituent: ConstituentProps,
};

type Params = {
    id: string,
};

export const getServerSideProps: GetServerSideProps = async ({ params }) => {
    const { id } = params as Params;
    const constituent = await prisma.constituent.findUnique({ 
        where: { id },
        include: {
            traits: true,
        },
    });

    if (constituent === null) {
        return {
            props: { constituent: null}
        }
    }

    return {
        props: {
            constituent: parseConstituent(constituent)
        },
    };
};

const UserPage: React.FC<Props> = (props) => {
    const { constituent } = props;

    const renderTraits = (traits: TraitProps[]) => {

        if(traits === undefined) {
            return(
                <Typography>No traits</Typography>
            );
        }
        
        const columns: GridColDef[] = [
            { field: 'name', headerName: 'Name', width: 200 },
            { field: 'value', headerName: 'Value', width: 250 },
            { field: 'source', headerName: 'Data Source', width: 130 },
        ];

        return (
            <Box style={{ height: 400, width: '100%' }}>
                <DataGrid
                rows={traits}
                columns={columns}
                />
            </Box>
        );
    };

    const fullName = `${constituent.firstName} ${constituent.lastName}`;

    return (
        <Container>
            <Stack>
                <AppHeader pageName={fullName}/>
                <Paper elevation={3}>
                    <Stack padding={4}>
                        <Typography variant="h4" component="h1" mb={3}>
                            {fullName}
                        </Typography>
                        <Typography mb={3}>
                            <EmailIcon /> {constituent.email}
                        </Typography>
                        <Typography mb={3}>
                            <HomeIcon /> {constituent.address} {constituent.zip}
                        </Typography>
                        <Typography mb={3}>
                            <LocalPhoneIcon /> {constituent.phoneNumber}
                        </Typography>
                        <Typography variant="h5" component="h2">
                            <FaceIcon /> Traits
                        </Typography>
                        {renderTraits(constituent.traits)}
                    </Stack>
                </Paper>
            </Stack>
        </Container>
    );
}



export default UserPage;