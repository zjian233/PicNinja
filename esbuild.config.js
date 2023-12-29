// import * as esbuild from 'esbuild'

const esbuild = require('esbuild');
const tailwindCss = require('tailwindcss');
const autoPrefixer = require('autoprefixer')
const postCss = require('postcss');
const fs = require("fs");
const path = require('path');

const tailwindCssPlugin = {
    name: 'tailwindCss',
    setup(build) {
        build.onResolve(
            { filter: /.\.(css)$/, namespace: "file" },
            async (args) => {
                const filePath = path.join(args.resolveDir, args.path);
                // console.log('args:', path.resolve(__dirname, filePath));
                fs.readFile(filePath,(err, css) => {
                    postCss([autoPrefixer, tailwindCss]).process(css, {from: filePath, to: path.join(__dirname, 'dist/renderer/', args.path)}).then(res => {
                        fs.writeFile(path.join(__dirname, 'dist/renderer/', args.path), res.css, (err, res) => {
                        })
                    })
                })
            }
        );
    },
};


(async () => {
        const ctx = await esbuild.context({
            entryPoints: ['./src/renderer/index.jsx'],
            bundle: true,
            outfile: './dist/renderer/index.js',
            plugins: [tailwindCssPlugin]
        })
        await ctx.watch();
})()

