require('dotenv').config()
const axios = require('axios')
const { createServer } = require('http')
const pug = require('pug')

const PORT = process.env.PORT || 1234

const data = {}

const router = [
  {path: '/', template: 'views/index.pug'},
  {path: '/other.html', template: 'views/other.pug'}
]

axios.get('http://api.dataatwork.org/v1/jobs').then(res => {
  data.jobs = res.data;
}).catch((error) => console.log('API error', error))

//event listener - waiting for the page to be loaded the first time
//This is a Node.js event listener
//Using a method instead of if statement because if more routes are added, this will be cleaner
const server = createServer((request,  response) => {
  console.log(request.url);
  const templateFile = router.find(route => request.url === route.path)
  if (templateFile) {
    return (response.end(pug.renderFile(templateFile.template, data)))
  } else {
	return response.end(pug.renderFile('views/404.pug', data));
  }
})

server.listen(PORT, () => {
  console.log(`The web server is running on port ${PORT}`)
})