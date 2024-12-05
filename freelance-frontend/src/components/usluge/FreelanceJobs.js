import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './FreelanceJobs.css';

const FreelanceJobs = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const response = await axios.get('https://www.themuse.com/api/public/jobs', {
          params: {
            category: 'Software Engineering', // Validna kategorija
            location: 'Remote', // Validna lokacija
            page: 1, // Validan parametar za paginaciju
          },
        });
        setJobs(response.data.results);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch jobs. Please try again later.');
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="freelance-jobs">
      <h2>Freelance Jobs</h2>
      <ul>
        {jobs.map((job) => (
          <li key={job.id}>
            <h3>{job.name}</h3>
            <p>{job.company.name}</p>
            <p>{job.locations.map(location => location.name).join(', ')}</p>
            <a href={job.refs.landing_page} target="_blank" rel="noopener noreferrer">View Job</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FreelanceJobs;
