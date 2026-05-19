const { Client } = require('pg');

async function test() {
  const connectionString = "postgresql://postgres.uwgqjuhwaaucyyjnrrvc:centralacademyantah@aws-1-ap-southeast-1.pooler.supabase.com:6543/postgres";
  const client = new Client({
    connectionString: connectionString,
    ssl: { rejectUnauthorized: false }
  });

  try {
    console.log("Connecting with pg...");
    await client.connect();
    console.log("Connected successfully!");
    const res = await client.query('SELECT COUNT(*) FROM "User"');
    console.log("User count:", res.rows[0].count);
  } catch (err) {
    console.error("Connection failed:", err.message);
  } finally {
    await client.end();
  }
}

test();
