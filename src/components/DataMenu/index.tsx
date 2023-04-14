import React, { useState } from "react";
import { Alert, Box, Button, IconButton, Stack } from "@mui/material";
import LoadingButton from '@mui/lab/LoadingButton';
import UploadFileIcon from '@mui/icons-material/UploadFile';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import DeleteIcon from '@mui/icons-material/Delete';
import CleaningServicesIcon from '@mui/icons-material/CleaningServices';
import { l2Api } from "@/src/lib/l2";
import { ConstituentCreateRequest, L2User, ZendeskUser } from "@/src/interfaces/index.interface";
import { zendeskApi } from "@/src/lib/zendesk";
import { mapL2ConstituentRequest, mapZendeskConstituentRequest } from "@/src/helpers/parse";
import { apiClient } from "@/src/lib/api";
import { ConstituentContext, ConstituentContextType } from "@/src/context/constituentContext";
import { ConstituentProps } from "@/src/types/index.types";

type Props = {
    onDeleteRow: (id: string) => void;
    onAddRow: (r: ConstituentProps) => void;
};

const DataMenu: React.FC<Props> = (props) => {

    const [isL2Loading, setL2Loading] = useState(false);
    const [isError, setError] = useState(false)
    const [errorMsg, setErrorMsg] = useState(null);
    const [isSuccess, setSuccess] = useState(false);
    const [isZendeskLoading, setZendeskLoading] = useState(false);
    
    const {
        selectedConstituentIds,
        constituents,
    } = React.useContext(ConstituentContext) as ConstituentContextType;

    const handleL2Import = async () => {
        setError(false);
        setSuccess(false);
        setL2Loading(true);
        try {
            const users: L2User[] = await l2Api.getUsers();
            
            users.map(user => {
                const requestData = mapL2ConstituentRequest(user);
                apiClient.createConstituent(requestData)
                    .then((res) => {
                        setL2Loading(false);
                        if (res.status === 500) {
                            setError(true);
                            throw("Error occured")
                        } else if (res.status == 201) {
                            setSuccess(true);
                        }
                        return res.json();
                    })
                    .then(constituent => {
                        props.onAddRow(constituent);
                    })
                    .catch(err => console.log(err))
            });
        } catch(err) {
            console.log(err);
        }
    };

    const handleZendeskImport = async () => {
        try {
            setError(false);
            setSuccess(false);
            setZendeskLoading(true);

            const users: ZendeskUser[] = await zendeskApi.getUsers();

            users.map(user => {
                const requestData: ConstituentCreateRequest = mapZendeskConstituentRequest(user);
                apiClient.createConstituent(requestData)
                    .then((res) => {
                        setZendeskLoading(false);
                        if (res.status === 500) {
                            setError(true);
                            throw("Error");
                        } else if (res.status == 201) {
                            setSuccess(true);
                        }
                        return res.json();
                    })
                    .then(constituent => {
                        props.onAddRow(constituent);
                    })
                    .catch(err => console.log(err))
            });

        } catch(err) {
            console.debug(err);
        }
    };

    const handleDelete = () => {
        if (selectedConstituentIds !== null) {
            selectedConstituentIds.map((id) => {
                apiClient.deleteConstituent(id)
                    .then(() => {
                        props.onDeleteRow(id);
                    })
            });
        }
    };

    const handleClean = () => {
        if (selectedConstituentIds !== null && constituents != null) {
            const cleaningList = constituents.filter(c => {
                return selectedConstituentIds.indexOf(c.id) !== -1
            });
            console.log("starting to clean!")
        }
    };

    const renderError = (isError: Boolean) => {
        const alert = (
            <Stack mb={3}>
                <Alert severity="error">{errorMsg ? errorMsg : "Some or all data could not be imported."}</Alert>
            </Stack>
        );
        return isError ? alert : null;
    };

    const renderSuccess = (isSuccess: Boolean) => {
        const alert = (
            <Stack mb={3}>
                <Alert severity="success">
                    Users successfully imported.
                </Alert>
            </Stack>
        );
        return isSuccess ? alert : null;
    };

    const isDisabled: boolean = (selectedConstituentIds && selectedConstituentIds?.length == 0) as boolean;

    return (
        <Box>
            {renderError(isError)}
            {renderSuccess(isSuccess)}
            <Stack direction="row" alignItems="center" spacing={2} mb={3}>
                <Button
                    variant="contained"
                    component="label"
                    startIcon={<UploadFileIcon />}
                >
                    Upload CSV
                    <input hidden accept=".csv" type="file" />
                </Button>
                <LoadingButton
                    variant="contained"
                    component="label"
                    startIcon={<ImportExportIcon />}
                    onClick={handleL2Import}
                    loading={isL2Loading}
                >
                    Import from L2
                </LoadingButton>
                <LoadingButton
                    variant="contained"
                    component="label"
                    startIcon={<ImportExportIcon />}
                    onClick={handleZendeskImport}
                    loading={isZendeskLoading}
                >
                    Import from Zendesk
                </LoadingButton>
                <IconButton 
                    aria-label="delete"
                    onClick={handleDelete}
                    disabled={isDisabled}
                >
                    <DeleteIcon />
                </IconButton>
                <IconButton
                    aria-label="Data cleanup"
                    onClick={handleClean}
                    disabled={isDisabled}
                >
                    <CleaningServicesIcon />
                </IconButton>
            </Stack>
        </Box>
    );
};

export default DataMenu;
