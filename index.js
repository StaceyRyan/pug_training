require('dotenv').config()
const axios = require('axios')
const { createServer } = require('http')
const pug = require('pug')

const PORT = process.env.PORT || 1234

const data = {}

axios.get('http://api.dataatwork.org/v1/jobs').then(res => {
  data.jobs = res.data;
}).catch((error) => console.log('API error', error))

//event listener - waiting for the page to be loaded the first time
const server = createServer((request,  response) => {
  console.log(request.url);
  if (request.url === '/other.html') {
    return (response.end(pug.renderFile('views/other.pug', data)))
  } else {
	return response.end(pug.renderFile('views/index.pug', data));
  }
})

server.listen(PORT, () => {
  console.log(`The web server is running on port ${PORT}`)
})