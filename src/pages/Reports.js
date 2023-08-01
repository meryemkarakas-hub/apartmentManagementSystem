import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import TablePagination from '@mui/material/TablePagination';
import axios from "axios";

const Reports = () => {
  const [rows, setRows] = React.useState([]);
  const [page, setPage] = React.useState(0); 
  const rowsPerPage = 10;

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/statistics'); 
      const data = response.data;
      setRows(data); 
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    }
  };

  React.useEffect(() => {
    fetchDataFromAPI();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); 
  };

 
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0'); 
    const year = date.getFullYear(); 
    const hours = String(date.getHours()).padStart(2, '0'); 
    const minutes = String(date.getMinutes()).padStart(2, '0');
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  
  const startIndex = page * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 800 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell align="left" sx={{ color: 'black', fontWeight: 'bold' }}>Kullanıcı Adı</TableCell>
            <TableCell align="left" sx={{ color: 'black', fontWeight: 'bold' }}>E-Posta Adresi</TableCell>
            <TableCell align="left" sx={{ color: 'black', fontWeight: 'bold' }}>Kayıt Zamanı</TableCell>
            <TableCell align="left" sx={{ color: 'black', fontWeight: 'bold' }}>Aktivasyon Zamanı</TableCell>
            <TableCell align="left" sx={{ color: 'black', fontWeight: 'bold' }}>En Son Giriş Zamanı</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.slice(startIndex, endIndex).map((row) => (
            <TableRow
              key={row.username}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell align="left" component="th" scope="row">
                {row.username}
              </TableCell>
              <TableCell align="left">{row.email}</TableCell>
              <TableCell align="left">{formatDateTime(row.registrationTime)}</TableCell>
              <TableCell align="left">{formatDateTime(row.activationTime)}</TableCell>
              <TableCell align="left">{formatDateTime(row.lastLoginTime)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        component="div"
        count={rows.length} 
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        rowsPerPageOptions={[10]} 
        labelRowsPerPage={null} 
      />
    </TableContainer>
  );
};

export default Reports;
