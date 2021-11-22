const groq = require('groq')
const client = require('../../utils/sanityClient.js')
module.exports =  async function() {
  return await client.fetch(groq`
  *[_type == "home"]{
        ...,
        "featuredCategories": *[_type == "categories" && featured == true]{
            ...,
        },
        "categories": *[_type == "categories" && featured == false]{
            ...,
        },
        "references": *[_type == "references"] | order(order asc) {
            ...,
            Image{
                ...,
                asset->{
                    ...,
                }
            },
            categories[]->{
                name
            }
        }
    }[0]
  `)
}
