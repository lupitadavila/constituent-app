import React from "react";
import AssuredWorkloadIcon from '@mui/icons-material/AssuredWorkload';
import { Breadcrumbs, Grid, Typography } from "@mui/material";
import Link from "next/link";

type Props = {
    pageName?: string;
  };

const AppHeader: React.FC<Props> = (props) => {

    const renderBreadcrumbs = (pageName: string | undefined) => {
        if (pageName === undefined) {
            return null;
        }
        return (
            <Breadcrumbs maxItems={2} aria-label="breadcrumb">
                <Link underline="hover" color="inherit" href="/">
                    Home
                </Link>
                <Typography color="text.primary">{pageName}</Typography>
            </Breadcrumbs>
        );
    };

    return (
        <Grid container spacing={2} mb={1}>
            <Grid item xs={12}>
                <Typography variant="h4" component="h1" mb={3}>
                    <AssuredWorkloadIcon /> Constituents.io
                </Typography>
                {renderBreadcrumbs(props.pageName)}
            </Grid>
        </Grid>
    );
};

export default AppHeader;
