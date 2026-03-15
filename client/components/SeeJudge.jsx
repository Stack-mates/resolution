import { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Button, Form, Spinner, Alert, InputGroup } from 'react-bootstrap';
import io from 'socket.io-client';

const socket = io();
const JUDGE_ROOM = 'GLOBAL_JUDGE_ROOM';

const SeeJudge = () => {
  const [joined, setJoined] = useState(false);
  const [full, setFull] = useState(false);
  const [side, setSide] = useState(null); // 'A' or 'B'
  const [ready, setReady] = useState(false);

  const [myArgument, setMyArgument] = useState('');
  const [otherArgument, setOtherArgument] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [personality, setPersonality] = useState('analytical');


  useEffect(() => {
    socket.on('assigned_side', (assignedSide) => {
      setSide(assignedSide);
    });

    socket.on('ready', () => {
      setReady(true);
      socket.emit('other_ready', { room: JUDGE_ROOM });
    });

    socket.on('other_ready', () => {
      setReady(true);
    });

    socket.on('full', () => {
      setFull(true);
    });

    socket.on('receive_argument', (data) => {
      setOtherArgument(data.argument);
    });

    socket.on('receive_verdict', (newVerdict) => {
      setVerdict(newVerdict);
      setLoading(false);
    });


    socket.emit('join_room', JUDGE_ROOM);
    setJoined(true);

    return () => {
      socket.off('assigned_side');
      socket.off('ready');
      socket.off('other_ready');
      socket.off('full');
      socket.off('receive_argument');
      socket.off('receive_verdict');
      socket.emit('leave_room', JUDGE_ROOM);
    };
  }, []);

  const handleSubmitArgument = (e) => {
    e.preventDefault();
    setSubmitted(true);
    socket.emit('submit_argument', { 
      side, 
      argument: myArgument, 
      room: JUDGE_ROOM 
    });
  };

  const handleJudge = async () => {
    setLoading(true);
    setError(null);
    setVerdict(null);

    const promptA = side === 'A' ? myArgument : otherArgument;
    const promptB = side === 'B' ? myArgument : otherArgument;

    try {
      const { data } = await axios.post('/conflict/judge', { promptA, promptB, personality });
      setVerdict(data);

      socket.emit('broadcast_verdict', { verdict: data, room: JUDGE_ROOM });
    } catch (err) {
      setError('The judge is currently unavailable. (API Error)');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const resetGame = () => {
    setMyArgument('');
    setOtherArgument('');
    setSubmitted(false);
    setVerdict(null);
  };

  if (full) {
    return (
      <div className="container mt-5">
        <Card className="p-4 shadow text-center">
          <h2 className="mb-4" style={{ fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(13, 110, 253, 0.4)' }}>⚖️ The Cyber-Gavel</h2>
          <Alert variant="warning">
            The Judge's Chambers are currently full. Please wait for the current session to end or try again later.
          </Alert>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-2" style={{ fontFamily: 'monospace', textShadow: '2px 2px 4px rgba(13, 110, 253, 0.4)' }}>⚖️ The Cyber-Gavel</h2>
        <p className="text-center text-muted mb-4">
          Status: {ready ? 
            <span>Connected as <strong>Side {side}</strong></span> : 
            <span>Waiting for opponent... {side && `(You are Side ${side})`}</span>
          }
        </p>

        {!ready ? (
          <div className="text-center p-5">
            <Spinner animation="grow" variant="dark" />
            <h4 className="mt-3">Waiting for an opponent to join...</h4>
          </div>
        ) : (
          <>
            <div className="row">
              <div className="col-md-6 mb-3">
                <Form.Label className="fw-bold">Your Argument (Side {side})</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Describe your perspective here..."
                  value={myArgument}
                  onChange={(e) => setMyArgument(e.target.value)}
                  disabled={submitted}
                />
                {!submitted ? (
                  <Button 
                    variant="primary" 
                    className="mt-2 w-100" 
                    onClick={handleSubmitArgument}
                    disabled={!myArgument}
                  >
                    Submit Argument
                  </Button>
                ) : (
                  <Alert variant="success" className="mt-2 text-center">Argument Submitted!</Alert>
                )}
              </div>
              <div className="col-md-6 mb-3">
                <Form.Label className="fw-bold">Opponent's Argument (Side {side === 'A' ? 'B' : 'A'})</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={6}
                  placeholder="Waiting for opponent..."
                  value={otherArgument}
                  disabled
                />
                {otherArgument ? (
                  <Alert variant="info" className="mt-2 text-center">Opponent has submitted!</Alert>
                ) : (
                  <div className="mt-2 text-center text-muted small italic">Waiting for opponent to submit...</div>
                )}
              </div>
            </div>

            <Form.Group className="mb-3">
              <Form.Label className="fw-bold">Judge's Personality</Form.Label>
              <Form.Select 
                value={personality} 
                onChange={(e) => setPersonality(e.target.value)}
                disabled={loading}
              >
                <option value="analytical">⚖️ Analytical</option>
                <option value="strict">📏 Strict</option>
                <option value="empathetic">❤️ Empathetic</option>
                <option value="sarcastic">😏 Sarcastic</option>
              </Form.Select>
            </Form.Group>

            <div className="text-center mt-3">
              <Button
                variant="dark"
                size="lg"
                disabled={loading || !myArgument || !otherArgument}
                className="px-5 py-3 shadow-sm"
                onClick={handleJudge}
              >
                {loading ? (
                  <>
                    <span className="gavel-animated me-2">🔨</span>
                    Deliberating...
                  </>
                ) : (
                  'Render Verdict 🔨'
                )}
              </Button>
            </div>
          </>
        )}

        {error && <Alert variant="danger" className="mt-4">{error}</Alert>}

        {verdict && (
          <div className="mt-5 p-4 border-start border-4 border-dark bg-light shadow-sm animate-fade-in">
            <h3 className="text-center text-uppercase ls-wide mb-4">Official Judicial Verdict</h3>
            <div className="mb-4">
              <h5 className="text-primary text-decoration-underline">The Winner</h5>
              <p className="fs-4 fw-bold">{verdict.winner}</p>
            </div>
            <div className="mb-4">
              <h5 className="text-primary text-decoration-underline">Reasoning</h5>
              <p className="lh-lg">{verdict.reasoning}</p>
            </div>
            <div className="text-end text-muted mt-4 d-flex justify-content-between align-items-center">
              <Button variant="outline-dark" size="sm" onClick={resetGame}>New Case</Button>
              <small className="text-uppercase">Judicial Confidence Index: {verdict.confidenceScore}/10</small>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SeeJudge;
