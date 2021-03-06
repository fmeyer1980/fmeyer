require('dotenv').config()
const sanityClient = require("@sanity/client");


/**
 * Set manually. Find configuration in
 * studio/sanity.json or on manage.sanity.io
 */

const projectId = process.env.SANITY_PROJECT_ID;

const sanity = {
  projectId,
  dataset: 'production',
  apiVersion: '2021-10-06',
  useCdn: false
}


module.exports = sanityClient({...sanity});
