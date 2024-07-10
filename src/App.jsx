import React, { useState, useEffect } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userData, setUserData] = useState(null);

  const facebookAppId = '114309750695303';  

  useEffect(() => {
    window.fbAsyncInit = function() {
      FB.init({
        appId      : facebookAppId,
        cookie     : true,  
        xfbml      : true,  
        version    : 'v2.13' 
      });

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


  return (
    <div className="App">
      {}
      {isLoggedIn && (
        <div>
          <h1>Welcome {userData?.name}</h1>
          {}
        </div>
      )}
    </div>
  );
}

export default App;
