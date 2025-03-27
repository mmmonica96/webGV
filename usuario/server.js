const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const bcrypt = require("bcryptjs");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// 🔹 URI con la base de datos especificada
const uri =
  "mongodb+srv://mwebmonica:monica123@cluster0.ryu3y.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// 🔹 Conexión a MongoDB
const client = new MongoClient(uri);

let db;

// 🔹 Conectar a la base de datos
client
  .connect()
  .then(() => {
    db = client.db("webGV");
    console.log("✅ Conexión exitosa a MongoDB");
    // Verifica que la colección exista
    return db.listCollections({ name: "usuario" }).toArray();
  })
  .then((collections) => {
    if (collections.length === 0) {
      console.warn("⚠️ La colección 'usuario' no existe");
    } else {
      console.log("✅ Colección 'usuario' encontrada");
    }
  })
  .catch((err) => {
    console.error("❌ Error de conexión:", err);
    process.exit(1);
  });

/********************************/

// 🔹 REGISTRO DE USUARIO
app.post("/registro", async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existingUser = await db.collection("usuario").findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "❌ El usuario ya existe" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = { username, email, password: hashedPassword };

    await db.collection("usuario").insertOne(newUser);
    res.json({ message: "✅ Usuario registrado con éxito" });
  } catch (error) {
    res.status(500).json({ message: "❌ Error en el servidor", error });
  }
});

// 🔹 INICIO DE SESIÓN
app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await db.collection("usuario").findOne({ email });

    if (!user)
      return res.status(400).json({ message: "❌ Usuario no encontrado" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "❌ Contraseña incorrecta" });

    res.json({
      message: "✅ Inicio de sesión exitoso",
      user: { username: user.username, email: user.email },
    });
  } catch (error) {
    res.status(500).json({ message: "❌ Error en el servidor", error });
  }
});

// 🔹 INICIAR SERVIDOR
const PORT = process.env.PORT || 5000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`)
);
