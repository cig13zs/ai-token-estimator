const assert = require('assert');
const AITokenEstimator = require('./core');

const text = "Hello world! This is a simple test prompt for LLM tokenization.";
const res = AITokenEstimator.estimate(text);
assert.strictEqual(res.wordCount, 11);
assert.strictEqual(res.gpt4 > 10, true);
assert.strictEqual(res.gemini > 10, true);
console.log('ok, all AITokenEstimator assertions passed');
