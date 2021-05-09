require('dotenv').config()
const axios = require('axios')
const { createServer } = require('http')
const url = require('url')
const pug = require('pug')

const PORT = process.env.PORT || 1234

//Leave this outside so the server (thus pug flies) can access it
const data = {}

//Controller functions
//mandatory argument goes first, optional later
const showAll = (jobs, url) => {
  return {jobs: jobs}
}
const showJob = (jobs, url) => {
  // console.log(JSON.stringify(jobs))
  const jobDetail = jobs.find(job => job.uuid === url.query.id)
  // console.log(`showJob ${jobDetail.title}`)
  if (jobDetail) {
    return {job: jobDetail} 
  }
  else return { 
    job: {title: `Error - job ${url.query.id} not found`}
  }
}

const router = [
  { path: '/', template: 'views/index.pug', controller: showAll },
  { path: '/other.html', template: 'views/other.pug', controller: showJob }
]

//event listener - waiting for the page to be loaded the first time
//This is a Node.js event listener
//Using a method instead of if statement because if more routes are added, this will be cleaner
const server = createServer((request, response) => {
  const inboundURL = url.parse(request.url, {parseQueryString: true})

  //Find a matching route for the inbound URL
  const templateFile = router.find(route => inboundURL.pathname === route.path)
  if (templateFile) {
    //Get data from jobs API
    axios.get('http://api.dataatwork.org/v1/jobs').then(res => {
      data.jobs = res.data;
      return (response.end(pug.renderFile(templateFile.template, 
        templateFile.controller(data.jobs, inboundURL))))
    }).catch((error) => console.log('API error', error))
  } else {
    return response.end(pug.renderFile('views/404.pug', data));
  }
})

server.listen(PORT, () => {
  console.log(`The web server is running on port ${PORT}`)
})