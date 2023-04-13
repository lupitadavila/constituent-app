import React from "react";
import type { GetServerSideProps } from "next";
import prisma from '../lib/prisma';
import { Constituent } from "@prisma/client";
import Paper from '@mui/material/Paper';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ConstituentProps } from "@/interfaces";
import { Box, Button, Container, Divider, IconButton, InputBase, Stack, Typography } from "@mui/material";
import DataMenu from "@/components/DataMenu";

export const getServerSideProps: GetServerSideProps = async () => {
  const constituentList = await prisma.constituent.findMany();

  return {
    props: { 
      constituentList: constituentList.map((constituent: Constituent) => ({
        ...constituent,
        createdAt: constituent.createdAt.toISOString(),
        updatedAt: constituent.updatedAt.toISOString(),
      } as unknown as ConstituentProps))
     }
  };
};

type Props = {
  constituentList: ConstituentProps [];
};

const renderButtonById = (params: GridRenderCellParams) => {
  return (
    <Button
      variant="text"
      href={"/constituents/" + params.value}
    >
      Edit
    </Button>
  )
}

const columns: GridColDef[] = [
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130 },
  { field: 'email', headerName: 'Email', width: 130 },
  { field: 'address', headerName: 'Address', width: 200 },
  { field: 'registration', headerName: 'Voter Registration', width: 130 },
  { field: 'id', headerName: 'Details', width: 130, renderCell: renderButtonById },
];

const Home: React.FC<Props> = (props) => {
  return (
    <Container>
      <Stack>
        <Typography variant="h4" component="h1" mb={3}>ConstituentsApp</Typography>
        <Paper
            component="form"
            sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', width: 400, marginBottom: "3em" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Constituents"
              inputProps={{ 'aria-label': 'search constituents' }}
            />
            <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
              <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} aria-label="uploads">
              <TuneIcon />
            </IconButton>
        </Paper>
        <DataMenu />
        <Box style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={props.constituentList}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              rowSelection
            />
        </Box>
      </Stack>
      </Container>
  );
};

export default Home;
