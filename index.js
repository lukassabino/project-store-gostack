const express = require('express');

const server = express();

server.use(express.json());

const projects = [];
const tasks = [];

server.use((req, res, next) => {
  console.count(`Contagem de requisicoes`);
  next();
})


function checkProjectExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  if (!project) {
    return res.status(400).json({ error: 'Project does not exists' });
  }

  return next();
}

server.get('/projects', (req, res) => {
  return res.json(projects);
});

server.post('/projects', (req, res) => {
  const { id } = req.body;
  const { title } = req.body;

  projects.push({id, title, tasks});

  return res.json(projects);
});

server.post('/projects/:id/tasks', checkProjectExists, (req, res) => {
  const { title } = req.body;
  const { id } = req.params;

  const project = projects.find(p => p.id == id);

  project.tasks.push(title);  

  return res.json(projects);
})

server.put('/projects/:id', checkProjectExists, (req, res) => {
  const { id } = req.params;
  const { title } = req.body;
  const project = projects.find(p => p.id == id);

  project.title = title;

  return res.json(projects);
})

server.delete('/projects/:id', checkProjectExists, (req,res) => {
  const { id } = req.params;
  const project = projects.find(p => p.id == id);

  projects.splice(project, 1);

  return res.json(projects);
});

server.listen(4000);