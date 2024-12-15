import { Suspense, useEffect, useState } from 'react';
import { Recommendation } from '../types/recommendation';
import LoadingSpinner from './LoadingSpinner';
import ErrorBoundary from './ErrorBoundary';
import React from 'react';
import { recommendationService } from '../services/recommendation.service';

export const GenerateRecommendation = () => {
  const [recommendation, setRecommendation] = useState<String>('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  
  function handleClick(){
    setRecommendation('');
    setLoading(true);
    
    const GenerateRecommendation = async () => {
        try {
          const response = await recommendationService.generateRecommendation();
          setRecommendation(response);
        } catch (error) {
          setError('Error loading recommendations');
        } finally {
          setLoading(false);
        }
      };
      
    GenerateRecommendation();
  }

//   if (loading) return <LoadingSpinner />;
//   if (error) return <p>{error}</p>;

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">New Recommendation !</h2>
        <button onClick={handleClick}> Generate A new Recommendation</button>
        {loading && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}
      {recommendation && (
        <div>
          <h2>Data:</h2>
          <pre>{JSON.stringify(recommendation, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};



export default function App() {
    return (
      <div>
        <ErrorBoundary fallback={<p>Error loading recommendations. Please try again later.</p>}>
          <Suspense fallback={<LoadingSpinner />}>
            <GenerateRecommendation />
          </Suspense>
        </ErrorBoundary>
      </div>
    );
  }
