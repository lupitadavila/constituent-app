import React, { useState } from "react";
import type { GetServerSideProps } from "next";
import prisma from '../lib/prisma';
import Paper from '@mui/material/Paper';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId, GridRowSelectionModel } from '@mui/x-data-grid';
import { Box, Button, Chip, Container, Divider, IconButton, InputBase, Stack } from "@mui/material";
import DataMenu from "@/src/components/DataMenu";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import FaceIcon from '@mui/icons-material/Face';
import { ConstituentProps } from "../types/index.types";
import { parseConstituents } from "../helpers/parse";
import AppHeader from "@/src/components/AppHeader";
import { apiClient } from "../lib/api";
import ConstituentProvider, { ConstituentContext } from "../context/constituentContext";

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
  const [constituentData, setData] = useState(null);
  const [selectedConstituentIds, setSelectedConstituentIds] = useState([] as string[]);
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

  const renderTraits = (params: GridRenderCellParams) => {
    return <Chip icon={<FaceIcon />} label={params.value.length} />;
  };

  const columns: GridColDef[] = [
    { field: 'firstName', headerName: 'First name', width: 130 },
    { field: 'lastName', headerName: 'Last name', width: 130 },
    { field: 'email', headerName: 'Email', width: 130 },
    { field: 'address', headerName: 'Address', width: 200 },
    { field: 'traits', headerName: 'Traits', width: 130, renderCell: renderTraits },
    { field: 'id', headerName: 'Details', width: 130, renderCell: renderButtonById },
  ];

  const onSearchInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    const query = event.target.value;

    apiClient.fetchConstituentsByQuery(query)
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      });
  };

  const onRowSelect = (rows: GridRowSelectionModel) => {
    const ids : string[] = [];
    rows.map((row: GridRowId) => ids.push(row as string))
    setSelectedConstituentIds(ids);
  };
  
  return (
    <ConstituentProvider>
      <Container>
      <Stack>
        <AppHeader />
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
        <DataMenu selectedConstituentIds={selectedConstituentIds}/>
        <Box style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={constituentData ? constituentData : props.constituentList}
              columns={columns}
              checkboxSelection
              rowSelection
              loading={isLoading}
              onRowSelectionModelChange={onRowSelect}
            />
        </Box>
      </Stack>
      </Container>
    </ConstituentProvider>
  );
};

export default Home;
