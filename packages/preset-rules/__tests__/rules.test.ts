/*
 * Copyright (c) 2020, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import * as axe from 'axe-core';
import { extended, base } from '../src';

/**
 * TODO:
 *  - Add benchmark test for individual rules using https://github.com/salesforce/best
 * */

describe('preset-rules', () => {
    // Rules that have been excluded from running due to being deprecated by axe
    // or due to their experimental nature
    const excludedRules = [
        /* cSpell:disable */
        'aria-dpub-role-fallback',
        'checkboxgroup',
        'frame-title-unique',
        'hidden-content',
        'layout-table',
        'radiogroup',
        'skip-link',
        'table-duplicate-name',
        'table-fake-caption',
        'video-description',
        /* cSpell:enable */
    ];
    const axeRules = axe.getRules().map((ruleObj) => ruleObj.ruleId);

    it('base ruleset should be a subset of extended', () => {
        expect(extended.runOnly.values).toEqual(expect.arrayContaining(base.runOnly.values));
        // TODO (debug): Why is this failing?
        // expect(extended).toEqual(expect.objectContaining(base));
    });

    it('should not contain excluded, deprecated rules', () => {
        expect(extended.runOnly.values).toEqual(expect.not.arrayContaining(excludedRules));
    });

    it('should match with the rules present in axe', () => {
        expect(axeRules).toEqual(expect.arrayContaining(extended.runOnly.values));
    });

    it('should not use only the excluded, deprecated rules from axe', () => {
        const unusedRules = axeRules.filter((rule) => !extended.runOnly.values.includes(rule));
        expect(unusedRules.sort()).toEqual(excludedRules.sort());
    });
});
