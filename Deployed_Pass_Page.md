To make the password reset working with deep linking for ios and android, you need to deploy this 
github page using github pages. Here is the code you have to use and deploy
<!DOCTYPE html>
<html>
<head>
    <title>Redirecting...</title>
    <script type="text/javascript">
        function redirectToApp() {
            console.log("NEW VERSION!!! 124443342423");

            // Get the user-inputted Metro link from the input field
            const metroUrl = document.getElementById("metroLinkInput").value;
            console.log("User-entered Metro URL: " + metroUrl);

            // Get the URL parameters from the hash
            const hashParams = new URLSearchParams(window.location.hash.substring(1));
            const accessToken = hashParams.get('access_token');
            const refreshToken = hashParams.get('refresh_token');
            console.log("Access Token: " + accessToken);
            console.log("Refresh Token: " + refreshToken);

            // Redirect to the constructed URL
            const redirectUrl = metroUrl + "/--/reset-pass?access_token=" + accessToken + "&refresh_token=" + refreshToken;
            console.log("Redirecting to: " + redirectUrl);
            window.location.href = redirectUrl;
        }
    </script>
</head>
<body>
    <h1>Redirecting...</h1>
    <p>Please enter the Metro URL from your React Native app:</p>
    <input type="text" id="metroLinkInput" placeholder="Enter Metro URL here" style="width: 80%; padding: 8px;">
    <br><br>
    <button onclick="redirectToApp()" style="padding: 10px 20px;">Redirect</button>
</body>
</html>
