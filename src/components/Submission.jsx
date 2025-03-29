import React, { useState, useEffect } from 'react';

const Submission = ({ userData, results, onSubmissionComplete }) => {
  const [submissionStatus, setSubmissionStatus] = useState(null);

  useEffect(() => {
    const submitData = async () => {
      try {
        const url = new URL(
          'https://script.google.com/macros/s/AKfycbzvJ6mv413pjsOxD71IKJ-TuJzkYyl5KlG6835RUDGZQD9_JkS6BARiYatEDvnMqZ3PuQ/exec'
        );
        url.searchParams.append('firstName', userData.firstName);
        url.searchParams.append('lastName', userData.lastName);
        url.searchParams.append('noMusicTime', results.noMusic.time?.toFixed(2));
        url.searchParams.append('noMusicScore', results.noMusic.score);
        url.searchParams.append('withMusicTime', results.withMusic.time?.toFixed(2));
        url.searchParams.append('withMusicScore', results.withMusic.score);

        const response = await fetch(url, {
          method: 'GET',
          mode: 'cors',
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        if (result.status === 'success') {
          setSubmissionStatus('Data submitted successfully!');
        } else {
          setSubmissionStatus('Error submitting data: ' + result.message);
        }
      } catch (error) {
        console.error('Submission error:', error);
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