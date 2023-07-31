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
  const [page, setPage] = React.useState(0); // Geçerli sayfayı takip etmek için durum
  const rowsPerPage = 10; // Sayfa başına 10 satır göster

  const fetchDataFromAPI = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/user/statistics'); // API endpointinizi buraya yazın
      const data = response.data;
      setRows(data); // Getirilen veri ile durumu güncelle
    } catch (error) {
      console.error('Veri alınırken hata oluştu:', error);
    }
  };

  React.useEffect(() => {
    // Sayfa yüklendiğinde veriyi getir
    fetchDataFromAPI();
  }, []);

  const handleChangePage = (event, newPage) => {
    setPage(newPage); // Sayfa değiştiğinde geçerli sayfayı güncelle
  };

  // Tarih ve saati "gün/ay/yıl, saat:dakika" formatında göstermek için fonksiyonu düzenle
  const formatDateTime = (dateTimeString) => {
    const date = new Date(dateTimeString);
    const day = String(date.getDate()).padStart(2, '0'); // Günü iki haneli göster ve başına 0 ekle (eğer gerekli)
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Ayı iki haneli göster ve başına 0 ekle (eğer gerekli)
    const year = date.getFullYear(); // Yılı doğrudan al
    const hours = String(date.getHours()).padStart(2, '0'); // Saati iki haneli göster ve başına 0 ekle (eğer gerekli)
    const minutes = String(date.getMinutes()).padStart(2, '0'); // Dakikayı iki haneli göster ve başına 0 ekle (eğer gerekli)
    return `${day}/${month}/${year}, ${hours}:${minutes}`;
  };

  // Geçerli sayfadaki ilk ve son satırların indekslerini hesapla
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
        count={rows.length} // Toplam satır sayısı
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage} // Sayfa değişikliklerini yöneten fonksiyon
        rowsPerPageOptions={[10]} // Sayfa başına satır seçeneklerini sadece 10 olarak göster
        labelRowsPerPage={null} // "Satır başına" etiketini gizle
      />
    </TableContainer>
  );
};

export default Reports;
