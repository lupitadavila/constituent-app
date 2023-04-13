import React from "react";
import { Button, IconButton, Stack } from "@mui/material";
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import SyncIcon from '@mui/icons-material/Sync';
import DeleteIcon from '@mui/icons-material/Delete';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { l2Api } from "@/src/lib/l2";
import { L2User, ZendeskUser } from "@/src/interfaces/index.interface";
import { zendeskApi } from "@/src/lib/zendesk";

const DataMenu: React.FC = (props) => {

    const handleL2Import = async () => {
        try {
            const users: L2User[] = await l2Api.getUsers();
            console.log(users);
        } catch(err) {
            console.error(err);
        }
    };

    const handleZendeskImport = async () => {
        try {
            const users: ZendeskUser[] = await zendeskApi.getUsers();
            console.log(users);
        } catch(err) {
            console.error(err);
        }
    }

    return (
        <Stack direction="row" alignItems="center" spacing={2} mb={3}>
            <Button
                variant="contained"
                component="label"
                startIcon={<UploadFileIcon />}
            >
                Upload CSV
                <input hidden accept=".csv" type="file" />
            </Button>
            <Button
                variant="contained"
                component="label"
                startIcon={<ImportExportIcon />}
                onClick={handleL2Import}
            >
                Import from L2
            </Button>
            <Button
                variant="contained"
                component="label"
                startIcon={<SyncIcon />}
                onClick={handleZendeskImport}
            >
                Import from Zendesk
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