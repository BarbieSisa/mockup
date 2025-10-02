const express = require('express');
const sql = require('mssql');
const cors = require('cors');
const path = require('path');  // ← ADD THIS LINE

const app = express();
app.use(cors());
app.use(express.json());

// SQL Authentication конфигурация
const dbConfig = {
    user: "cryptoUser",                 // <-- твоя SQL login
    password: "StrongPass123!",         // <-- паролата му
    server: "localhost\\MSSQLSERVER01", // или "localhost" ако работи без инстанция
    database: "cryptoBotDB",
    options: {
        encrypt: false,
        trustServerCertificate: true,
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

console.log('Using connection from SQL Server installation...');
console.log('Server:', dbConfig.server);
console.log('Database:', dbConfig.database);

// ✅ Serve static files from current directory (serves your HTML, CSS, JS)
app.use(express.static(__dirname));

// ✅ Serve your HTML file when someone visits the root URL
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'exampleHTMLMockUp.html'));
});

app.get('/api/trades', async (req, res) => {
    let pool;
    
    try {
        console.log('📡 Connecting to database...');
        pool = await sql.connect(dbConfig);
        console.log('✅ SUCCESS: Connected to SQL Server!');
        
        const result = await pool.request().query(
            'SELECT * FROM trade_history ORDER BY date_of_transaction DESC'
        );
        console.log(`📊 Found ${result.recordset.length} trades`);
        
        res.json(result.recordset);
        
    } catch (err) {
        console.error('❌ Database error:', err.message);
        console.error('Full error:', err);
        
        res.status(500).json({ 
            error: 'Database connection failed',
            message: err.message,
            connection: dbConfig.server
        });
    } finally {
        if (pool) {
            await pool.close();
        }
    }
});

app.get('/test', (req, res) => {
    res.json({ 
        status: 'Server is running',
        connection: dbConfig.server,
        database: dbConfig.database,
        port: 4400
    });
});

app.listen(4400, () => {
    console.log('🚀 Server running on port 4400');
    console.log('✅ Using:', dbConfig.server);
    console.log('🌐 UI: http://localhost:4400');
    console.log('📊 Trades API: http://localhost:4400/api/trades');
    console.log('🩺 Health check: http://localhost:4400/test');
});

// Move this line up (I removed the duplicate at the bottom)