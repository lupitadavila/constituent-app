import React from "react";
import { Button, Container, IconButton, Paper, Stack, Typography } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';

const DataMenu: React.FC = (props) => {
    const handleFile = (files) => {
        var reader = new FileReader();
        reader.onload = function(e) {
            // Use reader.result
            alert(reader.result)
        }
        reader.readAsText(files[0]);

    }
    return (
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
                onSubmit={handleFile}
            >
                Upload CSV
                <input hidden accept=".csv" type="file" />
            </Button>
            <Button
                variant="contained"
                component="label"
                startIcon={<ImportExportIcon />}
            >
                Import from L2
            </Button>
            <Button
                variant="contained"
                component="label"
                startIcon={<SyncIcon />}
            >
                Sync from Zendesk
            </Button>
            <IconButton aria-label="delete">
                <DeleteIcon />
            </IconButton>
            <IconButton aria-label="Data cleanup">
                <CleaningServicesIcon />
            </IconButton>
        </Stack>
    );
}



export default DataMenu;