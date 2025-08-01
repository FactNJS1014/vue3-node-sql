// server.mjs
import express from 'express';
import cors from 'cors';
import sql from 'mssql';

// MSSQL config
const dbConfig = {
  user: 'sa',  
  server: '172.22.64.11',
  database: 'ESD',
  options: {
    encrypt: false,
    trustServerCertificate: true,
  },
};

const app = express();
app.use(cors());
app.use(express.json());

// ทดสอบ route ที่เชื่อม MSSQL
app.get('/api/data', async (req, res) => {
  try {
    const db = await sql.connect(dbConfig);
    const result = await db.request().query('EXEC PSCLEAN_LIST_OVERDAY @DAYS = 0'); // เปลี่ยนชื่อ table
    res.json(result.recordset);
  } catch (err) {
    console.error('DB Error:', err);
    res.status(500).send('Database error');
  }
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Server is running on http://localhost:${PORT}`);
});
