require('dotenv').config();
const mysql = require('mysql2/promise');
const fs = require('fs');

async function syncTable(tableName, columns, remoteConfig, localConfig) {
  const lastSync = fs.readFileSync('last_sync.txt', 'utf8').trim();

  const remote = await mysql.createConnection(remoteConfig);
  const local = await mysql.createConnection(localConfig);

  try {
    const [rows] = await remote.execute(
      `SELECT * FROM ${tableName} WHERE updated_at > ?`,
      [lastSync]
    );

    for (const row of rows) {
      const placeholders = columns.map(() => '?').join(', ');
      const values = columns.map(col => row[col]);

      await local.execute(
        `REPLACE INTO ${tableName} (${columns.join(', ')}) VALUES (${placeholders})`,
        values
      );
    }

    console.log(`✅ Synced ${rows.length} rows from '${tableName}'`);
  } catch (err) {
    console.error(`❌ Sync failed for ${tableName}:`, err.message);
    throw err; // ensure failure halts next sync
  } finally {
    await remote.end();
    await local.end();
  }
}

// Wrap the sync logic in a function for reuse
async function syncEventsAndUsers() {
  const now = new Date().toISOString().slice(0, 19).replace('T', ' ');

  const remoteConfig = {
    host: process.env.RAILWAY_DB_HOST,
    port: process.env.RAILWAY_DB_PORT,
    user: process.env.RAILWAY_DB_USER,
    password: process.env.RAILWAY_DB_PASS,
    database: process.env.RAILWAY_DB_NAME,
  };

  const localConfig = {
    host: 'localhost',
    user: process.env.LOCAL_DB_USER,
    password: process.env.LOCAL_DB_PASS,
    database: process.env.LOCAL_DB_NAME,
  };

  try {
    await syncTable(
      'events',
      ['id', 'title', 'start', 'end', 'recurrence', 'completed', 'updated_at'],
      remoteConfig,
      localConfig
    );

    await syncTable(
      'users',
      ['id', 'name', 'email', 'password', 'updated_at'],
      remoteConfig,
      localConfig
    );

    // ✅ Only write sync time after both succeed
    fs.writeFileSync('last_sync.txt', now);
    console.log(`📌 Updated last sync time to ${now}`);
  } catch (err) {
    console.error('🛑 Sync aborted due to error.');
  }
}

// Only run directly if called via CLI
if (require.main === module) {
  syncEventsAndUsers();
}

module.exports = {
  syncEventsAndUsers
};
