import React, { useState } from "react";
import { apiClient } from "@/src/lib/api";
import { Divider, IconButton, InputBase, Paper } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import TuneIcon from '@mui/icons-material/Tune';
import { ConstituentContext, ConstituentContextType } from "@/src/context/constituentContext";

const Search: React.FC = () => {
    const {setConstituents} = React.useContext(ConstituentContext) as ConstituentContextType;

    const onSearchInput = (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
        const query = event.target.value;

        apiClient.fetchConstituentsByQuery(query)
            .then((res) => res.json())
            .then((data) => setConstituents(data));
    };

    return (
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
    );
};

export default Search;