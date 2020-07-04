/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import progress from 'rollup-plugin-progress';
import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import sizes from 'rollup-plugin-sizes';
import { terser } from 'rollup-plugin-terser';
// TODO (refactor): reuse entry-points from package json
// import pkg from './package.json';

// TODO (debug): Warning (!) `this` has been rewritten to `undefined` in axe.js
export default {
    // TODO (refactor): Move this rollup config file to package/assert ?
    input: 'packages/assert/src/assert.ts',
    output: {
        // TODO (refactor): add "browser" entry point in package.json and use "pkg.browser"
        file: 'sa11y.min.js',
        format: 'iife', // Should this be 'iife' for browser ?
        name: 'sa11y',
    },
    plugins: [
        progress({ clearLine: false }),
        resolve(),
        commonjs(), // TODO (debug): Why do we need CJS transformation even when tsconfig has "module": "es2015" ?
        // TODO (Fix): override to use different module in rollup config than tsconfig
        typescript({
            tsconfig: 'packages/assert/tsconfig.json',
            tsconfigOverride: { compilerOptions: { module: 'es2015' } },
            useTsconfigDeclarationDir: true,
        }),
        sizes({ details: true }),
        terser(),
    ],
};