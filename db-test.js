const sql = require('mssql');

const dbConfig = {
    server: "localhost\\MSSQLSERVER01",
    database: "cryptoBotDB",
    options: {
        encrypt: false,
        trustServerCertificate: true,
        trustedConnection: true,
        enableArithAbort: true
    }
};

async function testDatabase() {
    console.log('🔍 Testing database connection...');
    
    try {
        // Test 1: Connect to server
        console.log('1. Connecting to server...');
        const pool = await sql.connect(dbConfig);
        console.log('✅ Connected to SQL Server!');
        
        // Test 2: Check if database exists
        console.log('2. Checking database...');
        const dbCheck = await pool.request().query(`
            SELECT name FROM sys.databases WHERE name = 'cryptoBotDB'
        `);
        
        if (dbCheck.recordset.length === 0) {
            console.log('❌ Database cryptoBotDB not found');
            return;
        }
        console.log('✅ Database cryptoBotDB exists');
        
        // Test 3: Check if table exists
        console.log('3. Checking table...');
        const tableCheck = await pool.request().query(`
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_NAME = 'trade_history'
        `);
        
        if (tableCheck.recordset.length === 0) {
            console.log('❌ Table trade_history not found');
            return;
        }
        console.log('✅ Table trade_history exists');
        
        // Test 4: Get some data
        console.log('4. Getting data...');
        const result = await pool.request().query('SELECT TOP 3 * FROM trade_history');
        console.log('✅ Data retrieved successfully!');
        console.log('Sample data:', result.recordset);
        
        await pool.close();
        
    } catch (err) {
        console.log('❌ Error:', err.message);
        console.log('Full error:', err);
    }
}

testDatabase();