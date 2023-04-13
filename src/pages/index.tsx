import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import prisma from '../lib/prisma';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ConstituentProps } from "@/src/interfaces";
import { Box, Button, Container, Divider, IconButton, InputBase, Stack, Typography } from "@mui/material";
import DataMenu from "@/src/components/DataMenu";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';

export const getServerSideProps: GetServerSideProps = async () => {
  const constituentList = await prisma.constituent.findMany();

  return {
    props: { 
      constituentList: constituentList.map((constituent: any) => ({
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

const Home: React.FC<Props> = (props) => {
  const [constituentData, setData] = useState(null);
  const [isLoading, setLoading] = useState(false);

  const renderButtonById = (params: GridRenderCellParams) => {
    return (
      <Button
        variant="text"
        href={"/constituents/" + params.value}
      >
        View
      </Button>
    )
  };
  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'registration', headerName: 'Political Party', width: 130 },
    { field: 'id', headerName: 'Details', width: 130, renderCell: renderButtonById },
  ];

  const onSearchInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const query = event.target.value;

    fetch(`/api/constituents?q=${query}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      });
  };
  
  return (
    <Container>
      <Stack>
        <Typography variant="h4" component="h1" mb={3}>
          <AssuredWorkloadIcon /> Constituents.io
        </Typography>
        <Paper
            sx={{ p: '2px 6px', display: 'flex', alignItems: 'center', width: 400, marginBottom: "3em" }}
          >
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Search Constituents"
              inputProps={{ 'aria-label': 'search constituents' }}
              onChange={onSearchInput}
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
              rows={constituentData ? constituentData : props.constituentList}
              columns={columns}
              checkboxSelection
              rowSelection
              loading={isLoading}
            />
        </Box>
      </Stack>
      </Container>
  );
};

export default Home;
