import React from "react";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Typography } from "@mui/material";

const AppHeader: React.FC = () => {

    return (
        <Typography variant="h4" component="h1" mb={3}>
            <AssuredWorkloadIcon /> Constituents.io
        </Typography>
    );
};

export default AppHeader;