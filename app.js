const express = require('express')
const app = express()
const port = 3000

const requestCounts = {};

app.use((req, res, next) => {
  const route = req.originalUrl;
  requestCounts[route] = (requestCounts[route] || 0) + 1;
  next();
});

app.use((req, res, next) => {
  const date = new Date();
  const heure = date.toLocaleTimeString();
  console.log(`[${heure}] - Route appelée : ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/welcome', (req, res) => {
  res.send('Bienvenue sur le TP 1 du cours d\'architecture logicielle')
})

app.get('/secret', (req, res) => {
  res.status(401).send('Vous ne possédez pas les droits pour accéder à ma page secrète')
})

app.get('/error', (req, res) => {
  res.status(500).send({
    "message": "Bonjour"
  })
})

app.get('/img', (req, res) => {
  res.download("gygbd.png");
})

app.get('/redirectME', (req, res) => {
  res.redirect("https://www.youtube.com/watch?v=dQw4w9WgXcQ")
})

app.get('/users/:name', (req, res) => {
  const name = req.params.name;
  res.send(`Bienvenue sur la page de ${name}`);
});

// http://localhost:3000/somme?a=1&b=4
app.get('/somme', (req, res) => {
  const a = parseInt(req.query.a);
  const b = parseInt(req.query.b);
  
  if (!isNaN(a) && !isNaN(b)) {
    const resultat = a + b;
    res.send(`${a} + ${b} = ${resultat}`);
  } else {
    res.status(400).send('Les paramètres "a" et "b" doivent être des nombres valides.');
  }
});

app.get('/metrics', (req, res) => {
  const uptimeInSeconds = process.uptime();
  const metrics = {
    status: "healthy",
    requestsCount: requestCounts,
    uptime: uptimeInSeconds
  };
  res.json(metrics);
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
app.use((req, res, next) => {
  res.status(404).send('Cette page n\'existe pas!');
});
