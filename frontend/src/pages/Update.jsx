import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Form, Alert } from "react-bootstrap";
import { Link, useLocation, useNavigate } from "react-router-dom";
import MainScreen from "../components/MainScreen";
import ReactMarkdown from "react-markdown";

const Update = () => {
  const [note, setNote] = useState({
    title: "",
    content: "",
    category: "",
  });
  const [error, setError] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const noteId = location.pathname.split("/")[2]; //will give from the url the id of the note

  const handleChange = (e) => {
    setNote((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`http://localhost:8800/notes/${noteId}`, note);
      if (!note.title || !note.content || !note.category) {
        setError(true);
        return;
      }
      navigate("/notes");
    } catch (err) {
      console.log(err);
      setError(true);
    }
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8800/notes/${noteId}`)
      .then((res) => {
        setNote({
          title: res.data[0].title,
          content: res.data[0].content,
          category: res.data[0].category,
        });
      })
      .catch((err) => console.log(err));
  }, [noteId]);

  return (
    <MainScreen title={`Edit The Note`}>
      <Card>
        <Card.Header>Update the Note</Card.Header>
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
              <Card>
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
              Update Note
            </button>
            {/* {error && "Something went wrong!"} */}
            <Link to="/notes">
              <button className="mx-2 action-btn" variant="danger">
                See all Notes
              </button>
            </Link>
          </Form>
        </Card.Body>
        <Card.Footer className="text-muted">
          Creating on - {new Date().toLocaleDateString()}
        </Card.Footer>
      </Card>
    </MainScreen>
  );
};

export default Update;
