# GabellaMusic
An application for people to view and share their music listening trends.

# Technologies Used
The server is built with Node and Express.js, and connects to a hosted MongoDB database using Mongoose. 
PUG templates are used to generate emails sent from the server, which are fowarded via to users via SendGrid.

The client is built with React and uses Redux for state management.

The server connects users to the Spotify Web API using OAuth 2.0 user authentication, and fetches data that
gets rendered in React components on the client.
