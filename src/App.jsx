import React, { useState, useEffect } from 'react';

function GetRequest() {
  const [data, setData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const targetUrl = "https://graph.facebook.com/v20.0/me?fields=id%2Cname%2Cabout%2C&access_token=EAAQPpCDYd0YBO3Tr9EzMUgTCx5bLzazKvJjfZBA3ipr1MSeCJLTGZAb9X2ARrUWHFFhjgumeHDOOIVhJR8ydZCe8wTdlyRzvx1ZBuPNyNfVZC1C1I9soBT6RlalANvG0tuHWahoblkQbzJCUdbIBdS3gDhwrGnTpPhA4koQMBZAe0htjz9FZAKSZC9dutRdHQROMy0doEPFPDwtthKe1ZAZAIjZAJKvSwZDZD"; 

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
