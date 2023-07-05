import React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Accordion, Badge } from "react-bootstrap";
import ReactMarkdown from "react-markdown";
import axios from "axios";
import MainScreen from "../components/MainScreen";
import "bootstrap/dist/css/bootstrap.min.css";
import { BiEdit } from "react-icons/bi";
import { RiDeleteBin6Line } from "react-icons/ri";

import "./Notes.css";

const Notes = ({ search }) => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    const fetchAllNotes = async () => {
      try {
        const res = await axios.get("http://localhost:8800/notes");
        setNotes(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllNotes();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/notes/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <MainScreen title={`Note Creator App`}>
      <Link to="/add">
        <button
          style={{ marginLeft: 10, marginBottom: 20 }}
          className="action-btn"
        >
          Create new Note
        </button>
      </Link>
      <div className="notes">
        {notes &&
          notes
            .filter((filteredNote) =>
              filteredNote.title.toLowerCase().includes(search.toLowerCase())
            )
            .map((note) => (
              <Accordion defaultActiveKey="0" key={note.id}>
                <Accordion.Item eventKey="1">
                  <Accordion.Header style={{ display: "flex" }}>
                    <span
                      // onClick={() => ModelShow(note)}
                      style={{
                        color: "black",
                        textDecoration: "none",
                        flex: 1,
                        cursor: "pointer",
                        alignSelf: "center",
                        fontSize: 18,
                      }}
                    >
                      {note.title}
                    </span>

                    <div>
                      <Link to={`/update/${note.id}`}>
                        <button className="btns btnEdit">
                          <BiEdit />
                        </button>
                      </Link>
                      <button
                        className="mx-2 btns btnDelete"
                        onClick={() => handleDelete(note.id)}
                      >
                        <RiDeleteBin6Line />
                      </button>
                    </div>
                  </Accordion.Header>
                  <Accordion.Body>
                    <Badge
                      bg=""
                      className="mb-2"
                      style={{
                        color: "white",
                        backgroundColor: "#6f9894",
                      }}
                    >
                      Category - {note.category}
                    </Badge>
                    <blockquote className="blockquote mb-0">
                      <ReactMarkdown className="pb-2">
                        {note.content}
                      </ReactMarkdown>
                      <footer className="blockquote-footer">
                        Created on {note.date}
                      </footer>
                    </blockquote>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>
            ))}
      </div>
    </MainScreen>
  );
};

export default Notes;
