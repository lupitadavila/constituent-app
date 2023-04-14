import React, { useEffect } from "react";
import { ConstituentProps } from "@/src/types/index.types";
import { Box, Button, Chip } from "@mui/material";
import FaceIcon from '@mui/icons-material/Face';
import { DataGrid, GridColDef, GridRenderCellParams, GridRowId, GridRowSelectionModel, useGridApiRef } from '@mui/x-data-grid';
import { ConstituentContext, ConstituentContextType } from "@/src/context/constituentContext";
import DataMenu from "../DataMenu";

type Props = {
    constituentDefaultList: ConstituentProps[];
};

const ConstituentData: React.FC<Props> = (props) => {
    const {
        constituents,
        setSelectedConstituentIds,
        setConstituents
    } = React.useContext(ConstituentContext) as ConstituentContextType;

    const apiRef = useGridApiRef();

    useEffect(() => {
      setConstituents(props.constituentDefaultList);
    });

    const renderTraits = (params: GridRenderCellParams) => {
        return <Chip icon={<FaceIcon />} label={params.value.length} />;
      };
    
    const handleRowSelect = (rows: GridRowSelectionModel) => {
        const ids : string[] = [];
        rows.map((row: GridRowId) => ids.push(row as string))
        setSelectedConstituentIds(ids);
    };

    const handleDeleteRow = (id: string) => {
      apiRef.current.updateRows([{ id: id, _action: 'delete' }]);
    };

    const handleAddRow = (r: ConstituentProps) => {
      apiRef.current.updateRows([r])
    }

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
        { field: 'traits', headerName: 'Traits', width: 130, renderCell: renderTraits },
        { field: 'id', headerName: 'Details', width: 130, renderCell: renderButtonById },
    ];

    

    return (
        <Box style={{ height: 400, width: '100%' }}>
            <DataMenu onDeleteRow={handleDeleteRow} onAddRow={handleAddRow}/>
            <DataGrid
              rows={constituents && constituents.length <= 1 ? constituents : props.constituentDefaultList}
              columns={columns}
              checkboxSelection
              rowSelection
              onRowSelectionModelChange={handleRowSelect}
              apiRef={apiRef}
            />
        </Box>
    );
};

export default ConstituentData;