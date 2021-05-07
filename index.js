require('dotenv').config()
const { createServer } = require('http')
const pug = require('pug');

const PORT = process.env.PORT || 1234

const data = { jobs: ['accountant', 'electrician', 'mechanic', 'teacher'] }

const server = createServer((request,response) => {
	return response.end(pug.renderFile('views/index.pug', data))
})

server.listen(PORT, () => {
  console.log(`The web server is running on port ${PORT}`)
})