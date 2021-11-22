const groq = require('groq')
const client = require('../../utils/sanityClient.js')
module.exports =  async function() {
  return await client.fetch(groq`
  *[_type == "settings"]{
      name,
      position,
      profileImage,
      address,
      phone,
      email,
      socialmedia{
        ...
      },
      aboutSection{
        headline,
        text
      },
      followSection{
        ...
      }
    }[0]
  `)
}
