import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import axios from "axios";

const Reports = () => {
  const [rows, setRows] = React.useState([]);


const fetchDataFromAPI = async () => {
  try {
    const response = await axios.get('http://localhost:8080/api/user/statistics'); // Replace this with your API endpoint
    const data = response.data;
    setRows(data); // Update the state with the fetched data
  } catch (error) {
    console.error('Error fetching data:', error);
  }
};

React.useEffect(() => {
  // Fetch data when the component mounts
  fetchDataFromAPI();
}, []);



  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Dessert (100g serving)</TableCell>
            <TableCell align="right">Calories</TableCell>
            <TableCell align="right">Fat&nbsp;(g)</TableCell>
            <TableCell align="right">Carbs&nbsp;(g)</TableCell>
            <TableCell align="right">Protein&nbsp;(g)</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.username}</TableCell>
              <TableCell align="right">{row.email}</TableCell>
              <TableCell align="right">{row.registrationTime}</TableCell>
              <TableCell align="right">{row.activationTime}</TableCell>
              <TableCell align="right">{row.lastLoginTime}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );

};

export default Reports;

