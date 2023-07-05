import axios from "axios";
import React from "react";
import { useState } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";

const Add = () => {
  const [note, setNote] = useState({
    // title: "",
    // content: "",
    // category: "",
    date: new Date().toLocaleDateString(),
  });
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  const handleChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/notes", note);
      if (!note.title || !note.content || !note.category) {
        setError(true);
        return;
      }
      navigate("/notes");
    } catch (err) {
      setError(true);
    }
  };

  return (
    <MainScreen title={`Add New Note`}>
      <Card>
        <Card.Header>Create a new Note</Card.Header>
        <Card.Body>
          <Form>
            <Form.Group controlId="title" className="mb-2">
              {error && (
                <Alert className="p-2" variant="danger">
                  Some fields are empty!
                </Alert>
              )}
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="title"
                value={note.title}
                placeholder="Enter the title"
                name="title"
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="content" className="mb-2">
              <Form.Label>Content</Form.Label>
              <Form.Control
                as="textarea"
                value={note.content}
                placeholder="Enter the content"
                rows={4}
                name="content"
                onChange={handleChange}
              />
            </Form.Group>
            {note.content && (
              <Card className="mb-2">
                <Card.Header>Note Preview</Card.Header>
                <Card.Body>
                  <ReactMarkdown>{note.content}</ReactMarkdown>
                </Card.Body>
              </Card>
            )}
            <Form.Group controlId="content" className="mb-3">
              <Form.Label>Category</Form.Label>
              <Form.Control
                type="content"
                value={note.category}
                placeholder="Enter the Category"
                name="category"
                onChange={handleChange}
              />
            </Form.Group>
            <button onClick={handleClick} className="action-btn">
              Create Note
            </button>
            <Link to="/notes">
              <button className="mx-2 action-btn">See all Notes</button>
            </Link>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {note.date}
        </Card.Footer>
      </Card>

      {console.log("error:", error)}
    </MainScreen>
  );
};

export default Add;
