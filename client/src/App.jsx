import React, { useState, useEffect } from 'react';
import axios from 'axios';

const API_URL = "***********"
const GEMINI_API_URL = "**********"

function App() {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState('');
  const [question, setQuestion] = useState('');
  const [geminiAnswer, setGeminiAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => { fetchTodos(); }, []);

  const fetchTodos = async () => {
    const res = await axios.get(API_URL, { withCredentials: true });
    setTodos(res.data);
  };

  const addTodo = async () => {
    if (text.trim()) {
      await axios.post(API_URL, { text }, { withCredentials: true });
      setText('');
      fetchTodos();
    }
  };

  const toggleTodo = async (id, completed) => {
    await axios.put(`${API_URL}/${id}`, { completed: !completed }, { withCredentials: true });
    fetchTodos();
  };

  const deleteTodo = async id => {
    await axios.delete(`${API_URL}/${id}`, { withCredentials: true });
    fetchTodos();
  };

  const askGemini = async () => {
    if (!question.trim()) return;
    setLoading(true);
    setGeminiAnswer('');
    try {
      const res = await axios.post(GEMINI_API_URL, {
        contents: [{ parts: [{ text: question }] }]
      });
      setGeminiAnswer(res.data.candidates?.[0]?.content?.parts?.[0]?.text || 'No answer returned.');
    } catch (err) {
      setGeminiAnswer('Error fetching answer from Gemini.');
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '2rem', maxWidth: '600px' }}>
      <h1>ToDo App (MERN + Gemini AI)</h1>
      
      <div>
        <input
          value={text}
          onChange={e => setText(e.target.value)}
          placeholder="Add todo"
        />
        <button onClick={addTodo}>Add</button>
        <ul>
          {todos.map(todo => (
            <li key={todo._id} style={{ margin: '1rem 0' }}>
              <span
                style={{ textDecoration: todo.completed ? 'line-through' : '', cursor: 'pointer' }}
                onClick={() => toggleTodo(todo._id, todo.completed)}
              >
                {todo.text}
              </span>
              <button style={{ marginLeft: '10px' }} onClick={() => deleteTodo(todo._id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </div>

      
      <div style={{ marginTop: '2rem', padding: '1rem', border: '1px solid #eee' }}>
        <h2>Ask Gemini a Question</h2>
        <input
          value={question}
          onChange={e => setQuestion(e.target.value)}
          placeholder="Ask anything..."
          style={{ width: '70%' }}
        />
        <button onClick={askGemini} disabled={loading} style={{ marginLeft: '10px' }}>
          {loading ? 'Asking...' : 'Ask'}
        </button>
        {geminiAnswer && (
          <div style={{ marginTop: '1rem', background: '#f9f9f9', padding: '0.5rem' }}>
            <strong>Gemini says:</strong>
            <div>{geminiAnswer}</div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
