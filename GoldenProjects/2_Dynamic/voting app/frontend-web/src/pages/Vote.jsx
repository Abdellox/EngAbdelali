import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import api from '../services/api';
import { encryptVote, signVote } from '../utils/crypto';

function Vote() {
  const { electionId } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const [election, setElection] = useState(null);
  const [candidates, setCandidates] = useState([]);
  const [selectedCandidate, setSelectedCandidate] = useState(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    loadElectionData();
  }, [electionId]);

  const loadElectionData = async () => {
    try {
      const [electionRes, candidatesRes] = await Promise.all([
        api.get(`/elections/${electionId}`),
        api.get(`/elections/${electionId}/candidates`)
      ]);
      
      setElection(electionRes.data.data);
      setCandidates(candidatesRes.data.data.candidates);
    } catch (error) {
      console.error('Failed to load election data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmitVote = async () => {
    if (!selectedCandidate) {
      alert(t('vote.selectCandidate'));
      return;
    }

    if (!confirm(t('vote.confirmSubmit'))) {
      return;
    }

    setSubmitting(true);

    try {
      // Encrypt vote
      const encryptedVote = await encryptVote(selectedCandidate);
      const signature = await signVote(encryptedVote);

      // Submit to blockchain
      const response = await api.post('/voting/submit', {
        electionId,
        encryptedVote,
        signature
      });

      const { receiptId, verificationCode } = response.data.data;

      // Show receipt
      alert(`${t('vote.success')}\n\n${t('vote.receiptId')}: ${receiptId}\n${t('vote.verificationCode')}: ${verificationCode}`);
      
      navigate('/dashboard');
    } catch (error) {
      console.error('Failed to submit vote:', error);
      alert(t('vote.error'));
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) return <div className="loading">{t('common.loading')}</div>;

  return (
    <div className="vote-page">
      <h1>{election?.title}</h1>
      <p>{election?.description}</p>

      <div className="candidates-list">
        {candidates.map(candidate => (
          <div 
            key={candidate.id}
            className={`candidate-card ${selectedCandidate === candidate.id ? 'selected' : ''}`}
            onClick={() => setSelectedCandidate(candidate.id)}
          >
            <h3>{candidate.name}</h3>
            <p className="party">{candidate.party}</p>
            <p className="bio">{candidate.bio}</p>
            <details>
              <summary>{t('vote.viewPlatform')}</summary>
              <p>{candidate.platform}</p>
            </details>
          </div>
        ))}
      </div>

      <button 
        onClick={handleSubmitVote}
        disabled={!selectedCandidate || submitting}
        className="submit-vote-btn"
      >
        {submitting ? t('vote.submitting') : t('vote.submit')}
      </button>
    </div>
  );
}

export default Vote;
