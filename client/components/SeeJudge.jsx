import { useState } from 'react';
import axios from 'axios';
import { Card, Button, Form, Spinner, Alert } from 'react-bootstrap';

const SeeJudge = () => {
  const [promptA, setPromptA] = useState('');
  const [promptB, setPromptB] = useState('');
  const [verdict, setVerdict] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleJudge = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setVerdict(null);

    try {
      const { data } = await axios.post('/conflict/judge', { promptA, promptB });
      setVerdict(data);
    } catch (err) {
      setError('The judge is currently unavailable. (API Error)');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <Card className="p-4 shadow">
        <h2 className="text-center mb-4">⚖️ Gemini Judge</h2>
        
        <Form onSubmit={handleJudge}>
          <div className="row">
            <div className="col-md-6 mb-3">
              <Form.Label className="fw-bold">Side A (Argument 1)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={6} 
                placeholder="Describe Side A's perspective here..." 
                value={promptA}
                onChange={(e) => setPromptA(e.target.value)}
                required
              />
            </div>
            <div className="col-md-6 mb-3">
              <Form.Label className="fw-bold">Side B (Argument 2)</Form.Label>
              <Form.Control 
                as="textarea" 
                rows={6} 
                placeholder="Describe Side B's perspective here..." 
                value={promptB}
                onChange={(e) => setPromptB(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="text-center mt-3">
            <Button 
              variant="dark" 
              type="submit" 
              size="lg" 
              disabled={loading}
              className="px-5 py-3 shadow-sm"
            >
              {loading ? (
                <>
                  <Spinner animation="border" size="sm" className="me-2" />
                  Deliberating...
                </>
              ) : (
                'Render Verdict 🔨'
              )}
            </Button>
          </div>
        </Form>

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
            <div className="text-end text-muted mt-4">
              <small className="text-uppercase">Judicial Confidence Index: {verdict.confidenceScore}/10</small>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};

export default SeeJudge;
