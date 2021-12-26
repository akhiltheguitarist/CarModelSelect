import React, { useEffect, useState } from "react";
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'make', headerName: 'make', width: 90 },
  { field: 'model', headerName: 'model', width: 130 },
  { field: 'enginePowerPS', headerName: 'enginePowerPS', width: 130 },
  { field: 'enginePowerKW', headerName: 'enginePowerKW', width: 130 },
  { field: 'fuelType', headerName: 'fuelType', width: 130 },
  { field: 'bodyType', headerName: 'bodyType', width: 130 },
  { field: 'engineCapacity', headerName: 'engineCapacity', width: 130 },
];


const DisplayElement = (props) => {

   const [rowData, setRowData] = useState([]) 
  useEffect(() => {
      const newRowData = props.rows.map((element, index) => ({...element, id:index }));
      setRowData(newRowData)
  }, [props.rows])  

  return (
    <div style={{ height: 500, width: '70%', 'paddingTop': '30px' }}>
      <DataGrid
        rows={rowData}
        columns={columns}
        pageSize={20}
        rowsPerPageOptions={[15]}
        
      />
    </div>
  );
}

export default DisplayElement