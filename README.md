<h1>EventEase - Event Management App</h1>

<p>EventEase is an event management application designed to help users organize and manage events seamlessly. It has both frontend and backend components, separated into distinct folders for easy management.</p>

<h2>Table of Contents</h2>
<ul>
  <li><a href="#prerequisites">Prerequisites</a></li>
  <li><a href="#installation">Installation</a>
    <ul>
      <li><a href="#frontend-setup">Frontend Setup</a></li>
      <li><a href="#backend-setup">Backend Setup</a></li>
    </ul>
  </li>
  <li><a href="#running-the-application">Running the Application</a>
    <ul>
      <li><a href="#frontend">Frontend</a></li>
      <li><a href="#backend">Backend</a></li>
    </ul>
  </li>
  <li><a href="#directory-structure">Directory Structure</a></li>
  <li><a href="#contributing">Contributing</a></li>
  <li><a href="#license">License</a></li>
</ul>

<h2 id="prerequisites">Prerequisites</h2>
<p>Before setting up the project, ensure you have the following installed on your machine:</p>
<ul>
  <li><a href="https://nodejs.org/">Node.js</a> (v14 or later)</li>
  <li><a href="https://npmjs.com">npm</a> or <a href="https://yarnpkg.com/">Yarn</a> (for managing dependencies)</li>
  <li><a href="https://git-scm.com/">Git</a> (for version control)</li>
</ul>

<h2 id="installation">Installation</h2>
<p>Start by cloning the repository to your local machine:</p>
<pre><code>git clone https://github.com/your-username/eventease-event-management-app.git
cd eventease-event-management-app</code></pre>

<h3 id="frontend-setup">Frontend Setup</h3>
<ol>
  <li>Navigate to the <code>frontend</code> directory:</li>
  <pre><code>cd frontend</code></pre>

  <li>Install the required dependencies using npm or Yarn:</li>
  <pre><code># Using npm
npm install

# Or using Yarn
yarn install</code></pre>

  <li>(Optional) If you are using VS Code, the necessary extensions can be found in <code>.vscode/extensions.json</code> for a smoother development experience.</li>
</ol>

<h3 id="backend-setup">Backend Setup</h3>
<ol>
  <li>Navigate to the <code>backend</code> directory:</li>
  <pre><code>cd ../backend</code></pre>

  <li>Install the required dependencies using npm or Yarn:</li>
  <pre><code># Using npm
npm install

# Or using Yarn
yarn install</code></pre>
</ol>

<h2 id="running-the-application">Running the Application</h2>

<h3 id="frontend">Frontend</h3>
<p>To start the frontend development server:</p>
<pre><code>cd frontend
npm start
# Or if using Yarn
yarn start</code></pre>
<p>This will start the frontend server (usually on <code>http://localhost:3000</code>). You can visit this in your browser to see the app in action.</p>

<h3 id="backend">Backend</h3>
<p>To start the backend server:</p>
<pre><code>cd backend
npm start
# Or if using Yarn
yarn start</code></pre>
<p>This will start the backend server (usually on <code>http://localhost:5000</code>). The frontend will interact with the backend via API calls.</p>

<h2 id="directory-structure">Directory Structure</h2>
<pre><code>eventease-event-management-app/
├── backend/              # Backend server and API
│   ├── node_modules/     # Backend dependencies
│   ├── dist/             # Backend build output
│   └── server.js         # Backend main entry file
├── frontend/             # Frontend application (React)
│   ├── node_modules/     # Frontend dependencies
│   ├── public/           # Public assets (images, index.html)
│   └── src/              # React components and logic
├── .gitignore            # Files and directories to ignore
└── README.md             # This file
</code></pre>

<h2 id="contributing">Contributing</h2>
<p>If you'd like to contribute to the development of EventEase, feel free to fork the repository and create a pull request with your changes. Here are a few guidelines to follow:</p>
<ol>
  <li>Fork the repository</li>
  <li>Create a new branch for your changes</li>
  <li>Make the changes and commit them</li>
  <li>Push your branch to your fork</li>
  <li>Submit a pull request</li>
</ol>

<h2 id="license">License</h2>
<p>This project is licensed under the MIT License - see the <a href="LICENSE">LICENSE</a> file for details.</p>
