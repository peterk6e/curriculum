/* eslint-disable no-alert, no-console */
import * as fs from "fs"
import fetch from "node-fetch"
/*eslint-enable */

const createHTMLstr = arr => {
  let str = ""
  arr.forEach(e => {
    str += `<span>${e.name}</span>`
    str += `<img alt='pokimage' src=${e.imageUrl} />`
  })
  return `<!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="utf-8">
        <title>c0d3 challenge</title>
      </head>
      <body>
        ${str}
      </body>
    </html>`
}

const createFile = str => {
  fs.writeFile("./9.html", str, () => {
    console.log("file created")
  })
}

const pokemons = fetch("https://pokeapi.co/api/v2/pokemon/?offset=20&limit=20")
  .then(res => res.json())
  .then(data => data.results)

const getImages = pokemons => {
  const images = pokemons.map(e =>
    fetch(e.url)
      .then(res => res.json())
      .then(data => {
        return {
          name: data.name,
          imageUrl: data.sprites.back_default,
        }
      })
  )

  Promise.all(images).then(results => {
    const HTMLstr = createHTMLstr(results)
    createFile(HTMLstr)
  })
}

getImages(await pokemons)
