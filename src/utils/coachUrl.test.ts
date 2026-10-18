import test from 'node:test';
import assert from 'node:assert/strict';
import { parseCoachAppParams, buildCoachShareUrl } from './coachUrl.ts';

test('parseCoachAppParams correctly detects coach app mode from query string', () => {
  const result1 = parseCoachAppParams('?app=coaches');
  assert.equal(result1.isCoachApp, true);

  const result2 = parseCoachAppParams('?portal=coaches&age=u10&week=4&tool=equal_time');
  assert.equal(result2.isCoachApp, true);
  assert.equal(result2.ageGroup, 'U10 Academy (5v5)');
  assert.equal(result2.week, 4);
  assert.equal(result2.tool, 'equal_time');

  const resultHome = parseCoachAppParams('');
  assert.equal(resultHome.isCoachApp, false);
});

test('buildCoachShareUrl constructs valid shareable coach app URL', () => {
  const url = buildCoachShareUrl('https://example.com/path', { age: 'U12 Boys & Girls (7v7)', week: 8, tool: 'curriculum' });
  assert.match(url, /app=coaches/);
  assert.match(url, /age=u12/);
  assert.match(url, /week=8/);
  assert.match(url, /tool=curriculum/);
});
