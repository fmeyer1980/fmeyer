const imageUrl = require('./imageUrl')
const h = require('hyperscript')
// Learn more on https://www.sanity.io/guides/introduction-to-portable-text
module.exports = {
  types: {
    // authorReference: ({node}) => `[${node.name}](/authors/${node.slug.current})`,
    // code: ({node}) =>
    //   '```' + node.language + '\n' + node.code + '\n```',
    // mainImage: ({node}) => `![${node.alt}](${imageUrl(node).width(600).url()})`,
    // image: ({node}) => `![${node.alt}](${imageUrl(node).width(200).url()})`,

    // image: ({node}) => `<img class="bg-primary" src="https://cdn.sanity.io/images/k6yjh7c6/production/d16f55e183bd78bcf24ec861132d50f11ec21237-1100x550.webp?w=200" alt="hgfhfdsdsds">`


    image: ({node}) => h('img',{loading: "lazy"},{src: imageUrl(node).width(800).url()}),
    youtube: ({node}) => h('iframe',{loading: "lazy"},{class: "sdsd"},{width: "100%"},{height: "100%"},{src: 'https://www.youtube.com/embed/' + node.youtubeApi},{title: node.title},)



    // <iframe loading="lazy" width="100%" height="100%" :src="'https://www.youtube.com/embed/' + youtubeApi" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
  }
}
