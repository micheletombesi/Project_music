const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");

// Inizializzazione dell'app
const app = express();
app.use(bodyParser.json());
app.use(cors());

//Connettiti a MongoDB
mongoose.connect("mongodb+srv://mikitombesi:momomo07@cluster0.117e8.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0",
  { useNewUrlParser: true, useUnifiedTopology: true }
)
.then(() => console.log("Connesso a MongoDB Atlas"))
.catch((error) => console.error("Errore di connessione a MongoDB:", error));

// Definisci lo schema e il modello per le canzoni
const songSchema = new mongoose.Schema({
  id: Number,
  title: String,
});

const Song = mongoose.model("Song", songSchema);

// **Endpoint per ottenere la lista**
app.get("/list", async (req, res) => {
  try {
    const songs = await Song.find().sort("id");
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: "Errore nel recupero della lista" });
  }
});

app.post("/list", async (req, res) => {
  const { title } = req.body;
  try {
    const lastSong = await Song.findOne().sort("-id");
    const id = lastSong ? lastSong.id + 1 : 1;

    const newSong = new Song({ id, title });
    await newSong.save();
    res.json(newSong);
  } catch (error) {
    res.status(500).json({ error: "Errore nell'aggiunta della canzone" });
  }
});

// Rotta di prova
app.get("/", (req, res) => {
  res.send("Il server è in esecuzione!");
});

// Avvio del server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server in esecuzione su http://localhost:${PORT}`);
});
