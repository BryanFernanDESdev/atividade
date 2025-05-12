import { spawn } from 'child_process';
import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import terser from '@rollup/plugin-terser';
import resolve from '@rollup/plugin-node-resolve';
import livereload from 'rollup-plugin-livereload';
import postcss from 'rollup-plugin-postcss';

const production = !process.env.ROLLUP_WATCH;

function serve() {
    let server;

    function toExit() {
        if (server) server.kill(0);
    }

    return {
        writeBundle() {
            if (server) return;
            server = spawn('npm', ['run', 'start', '--', '--dev'], {
                stdio: ['ignore', 'inherit', 'inherit'],
                shell: true
            });

            process.on('SIGTERM', toExit);
            process.on('exit', toExit);
        }
    };
}

export default {
    input: 'src/main.js',
    output: {
        sourcemap: true,
        format: 'iife',
        name: 'app',
        file: 'public/build/bundle.js'
    },
    plugins: [
        svelte({
            compilerOptions: {
                // Enable run-time checks when not in production
                dev: !production
            }
        }),
        // Extract component CSS into a separate file for better performance
        postcss({
            extract: true,
            minimize: production,
            sourceMap: !production
        }),
        // Resolve external dependencies
        resolve({
            browser: true,
            dedupe: ['svelte'],
            exportConditions: ['svelte']
        }),
        commonjs(),
        // In dev mode, call `npm run start` once the bundle has been generated
        !production && serve(),
        // Watch the `public` directory and refresh the browser on changes in dev mode
        !production && livereload('public'),
        // Minify the code for production builds
        production && terser()
    ],
    watch: {
        clearScreen: false
    }
};