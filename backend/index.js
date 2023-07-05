import express from "express";
import mysql from "mysql";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json()); //allows to send json file using client

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Aa123456!",
  database: "test",
});

app.get("/", (req, res) => {
  res.json("hello");
});

app.get("/notes", (req, res) => {
  //get the notes from mysql
  const q = "SELECT * FROM notes";
  db.query(q, (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.post("/notes", (req, res) => {
  const q =
    "INSERT INTO notes(`title`, `content` ,`category`, `date`) VALUES (?)";

  const values = [
    req.body.title,
    req.body.content,
    req.body.category,
    req.body.date,
  ];

  db.query(q, [values], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.delete("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const q = " DELETE FROM notes WHERE id = ? ";

  db.query(q, [noteId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.put("/notes/:id", (req, res) => {
  const noteId = req.params.id;
  const q =
    "UPDATE notes SET `title`= ?, `content`= ?, `category`= ? WHERE id = ?";

  const values = [req.body.title, req.body.content, req.body.category];

  db.query(q, [...values, noteId], (err, data) => {
    if (err) return res.send(err);
    return res.json(data);
  });
});

app.get("/notes/:id", (req, res) => {
  const q = "SELECT * FROM notes Where ID = ?";
  const noteId = req.params.id;
  db.query(q, [noteId], (err, data) => {
    if (err) {
      console.log(err);
      return res.json(err);
    }
    return res.json(data);
  });
});

app.listen(8800, () => {
  console.log("Connected to backend.");
});
