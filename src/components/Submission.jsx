import React, { useState, useEffect } from 'react';

const Submission = ({ userData, results, onSubmissionComplete }) => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const submitData = async () => {
      try {
        const response = await fetch('https://script.google.com/macros/s/AKfycby3pcHM-QG3P4i99ox52HkKXrpD0gL9fYtQkt1eA5C2c-ZQXp0c8gFcD1YTVTGSNvIH/exec', {
          method: 'POST',
          mode: 'cors', // Required for cross-origin requests
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            firstName: userData.firstName,
            lastName: userData.lastName,
            noMusicTime: results.noMusic.time?.toFixed(2),
            noMusicScore: results.noMusic.score,
            withMusicTime: results.withMusic.time?.toFixed(2),
            withMusicScore: results.withMusic.score,
          }),
        });

        const result = await response.json();
        if (result.status === 'success') {
          setSubmissionStatus('Data submitted successfully!');
        } else {
          setSubmissionStatus('Error submitting data: ' + result.message);
        }
      } catch (error) {
        setSubmissionStatus('Error submitting data: ' + error.message);
      } finally {
        onSubmissionComplete();
      }
    };

    submitData();
  }, [userData, results, onSubmissionComplete]);

  return (
    <div className="submission-status">
      {submissionStatus ? <h3>{submissionStatus}</h3> : <h3>Submitting data...</h3>}
      <p>Note: If there is an error, please send us a screenshot of your results. Thanks!</p>
    </div>
  );
};

export default Submission;