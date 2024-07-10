import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const facebookAppId = '114309750695303';  // Replace with your App ID

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : facebookAppId,
        cookie     : true,  // Enable cookies for session management
        xfbml      : true,  // Parse social plugins on this page
        version    : 'v2.13' // Use Facebook SDK v2
      });

      // Check login status on page load
      FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
      });
    };

    (function(d, s, id){
       var js, fjs = d.getElementsByTagName(s)[0];
       if (d.getElementById(id)) { return; }
       js = d.createElement(s); js.id = id;
       js.src = "https://connect.facebook.net/en_US/sdk.js";
       fjs.parentNode.insertBefore(js, fjs);
     }(document, 'script', 'facebook-jssdk'));
  }, []);

  const statusChangeCallback = (response) => {
    console.log('statusChangeCallback', response);
    const isLoggedIn = response.status === 'connected';
    setIsLoggedIn(isLoggedIn);

    if (isLoggedIn) {
      // Assuming user is already logged in
      const accessToken = response.authResponse.accessToken;
      fetchUserData(accessToken);
    }
  };

  const fetchUserData = (accessToken) => {
    FB.api('/me?fields=name,email&access_token=' + accessToken, (response) => {
      if (!response.error) {
        setUserData(response);
      } else {
        console.error('Error fetching user data:', response.error);
      }
    });
  };

  // ... rest of your code

  return (
    <div className="App">
      {/* Your login button implementation (if needed) */}
      {isLoggedIn && (
        <div>
          <h1>Welcome {userData?.name}</h1>
          {/* Your code to display user data */}
        </div>
      )}
    </div>
  );
}

export default App;
