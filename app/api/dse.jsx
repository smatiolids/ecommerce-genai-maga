import Cassandra from "cassandra-driver";

let session;

export const getSession = async () => {
  if (session) {
    return session;
  } else {
    console.log("Connecting to DSE...");
    session = new Cassandra.Client({
      credentials: {
        username: process.env.DSE_USER,
        password: process.env.DSE_PASSWORD,
      },
      localDataCenter: process.env.DSE_DC,
      contactPoints: process.env.DSE_SEED.split(","),
      keyspace: process.env.DSE_KEYSPACE,
    });
    await session.connect();
    console.log("Connected to DSE!");
    return session;
  }
};
