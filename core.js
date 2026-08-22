;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AITokenEstimator = factory();
})(typeof self !== 'undefined' ? self : this, function () {
  'use strict';
  function estimate(text) {
    text = String(text || '');
    if (!text) return { charCount: 0, wordCount: 0, estimatedTokens: 0, range: { low: 0, high: 0 } };
    const chars = Array.from(text);
    const wordCount = (text.match(/[\p{L}\p{N}_'-]+/gu) || []).length;
    let cjk = 0, emoji = 0, ascii = 0, punctuation = 0;
    chars.forEach(function (char) {
      if (/\p{Extended_Pictographic}/u.test(char)) emoji++;
      else if (/[\u3400-\u9fff\uf900-\ufaff\u3040-\u30ff\uac00-\ud7af]/u.test(char)) cjk++;
      else if (/[A-Za-z0-9]/.test(char)) ascii++;
      else if (!/\s/u.test(char)) punctuation++;
    });
    const estimated = Math.max(1, Math.ceil(ascii / 4 + cjk + emoji * 2 + punctuation / 2 + Math.max(0, wordCount - ascii / 5) * 0.25));
    return {
      charCount: text.length,
      codePointCount: chars.length,
      wordCount: wordCount,
      estimatedTokens: estimated,
      range: { low: Math.max(1, Math.floor(estimated * 0.75)), high: Math.max(1, Math.ceil(estimated * 1.35)) },
      note: 'Model-agnostic size estimate only. Exact counts require the tokenizer for the exact model and message format.'
    };
  }
  return { estimate: estimate };
});
