import dotenv from "dotenv";
import admin from "firebase-admin";

dotenv.config();

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_PROJECT_ID,
    clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    privateKey: process.env.FIREBASE_PRIVATE_KEY.replace(/\\n/g, "\n"),
  }),
});

async function deleteAllUsers() {
  try {
    let nextPageToken;
    do {
      // Listar usuarios en lotes de hasta 1000 por página
      const listUsersResult = await admin.auth().listUsers(1000, nextPageToken);
      const userIds = listUsersResult.users.map((userRecord) => userRecord.uid);

      if (userIds.length > 0) {
        // Eliminar usuarios en lote
        await admin.auth().deleteUsers(userIds);
        console.log(`Eliminados ${userIds.length} usuarios`);
      }

      nextPageToken = listUsersResult.pageToken;
    } while (nextPageToken);

    console.log("Todos los usuarios han sido eliminados.");
  } catch (error) {
    console.error("Error al eliminar usuarios:", error);
  }
}

async function createUsers(users) {
  for (const user of users) {
    try {
      const userRecord = await admin.auth().createUser({
        email: user.email,
        password: user.password,
        displayName: user.displayName,
      });
      console.log(`Usuario creado: ${userRecord.uid}`);
    } catch (error) {
      console.error(`Error al crear usuario: ${error.message}`);
    }
  }
}

// Datos de ejemplo para crear usuarios
const usersToCreate = [
  { email: "pepe@gmail.com", password: "password", displayName: "Pepe" },
  { email: "pedro@gmail.com", password: "password", displayName: "Pedro" },
  { email: "javier@gmail.com", password: "password", displayName: "Javier" },
  { email: "silvia@gmail.com", password: "password", displayName: "Silvia" },
];

// Eliminar todos los usuarios
await deleteAllUsers();

await createUsers(usersToCreate);
