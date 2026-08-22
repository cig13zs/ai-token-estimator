;(function (root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.AITokenEstimator = factory();
})(typeof self !== 'undefined' ? self : this, function () {

  function estimate(text) {
    if (!text || typeof text !== 'string') {
      return { gpt4: 0, claude: 0, gemini: 0, llama: 0, wordCount: 0, charCount: 0 };
    }

    const charCount = text.length;
    const words = text.match(/\b[a-zA-Z0-9_'-]+\b/g) || [];
    const wordCount = words.length;

    // Rule-based heuristic estimation calibrated against standard BPE tokenizers
    // English text: ~4 chars per token on average (~1.3 tokens per word)
    // Code or special chars: ~3 chars per token
    const specialChars = (text.match(/[^a-zA-Z0-9\s]/g) || []).length;
    const specialRatio = charCount > 0 ? specialChars / charCount : 0;

    let baseFactor = 4.0;
    if (specialRatio > 0.15) baseFactor = 3.2; // Code / JSON / Markup has higher token density

    const rawTokenEst = Math.ceil(charCount / baseFactor);

    return {
      charCount: charCount,
      wordCount: wordCount,
      gpt4: Math.round(rawTokenEst * 1.02),
      claude: Math.round(rawTokenEst * 0.98),
      gemini: Math.round(rawTokenEst * 1.00),
      llama: Math.round(rawTokenEst * 1.05),
      pricingEstimates: {
        gpt4o_input: '$' + ((rawTokenEst / 1000000) * 2.50).toFixed(5),
        claude35_input: '$' + ((rawTokenEst / 1000000) * 3.00).toFixed(5),
        gemini15flash_input: '$' + ((rawTokenEst / 1000000) * 0.075).toFixed(5)
      }
    };
  }

  return { estimate: estimate };
});
