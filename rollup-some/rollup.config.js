import  json from "rollup-plugin-json";


export default {
    input: 'src/main.js',
    output: {
        file: 'index.js',
        format: 'cjs',
        banner: '/* 11111 */',
        footer: '/* follow me on Twitter! @rich_harris */',
        intro: 'var ENVIRONMENT = "production";'
    },
    plugins:[
        json()
    ],
    
  };