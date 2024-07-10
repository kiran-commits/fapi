import React, { useState, useEffect } from 'react';

function GetRequest() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const targetUrl = "https://graph.facebook.com/v20.0/me?fields=id%2Cname&access_token=EAAQPpCDYd0YBO0ObbCZCScOi4YrAv71vT3JT5ykCpZC2p5JJLVvvSSmqmUtVEfeWkPvuvaPbLK8HRlMWDaWLXPXuhDdcOIUu6DtOsK9CrilGHvs5y5iOfJeIjMYTLFix1ViBuoMwqM9Oy33GPGxGkbZCTDpOEshDKtdaNpJxqM291jdCs5HSa4dXIAIfb2MlOz7f0JKfBS0ZAhiZB46tIZBW8RdgZDZD"; // Replace with your desired URL

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(targetUrl);
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }
        const data = await response.text();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, []);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  if (data) {
    return (
      <div>
        <p>API Response:</p>
        <pre>{data}</pre>
      </div>
    );
  }

  return null;
}

export default GetRequest;
