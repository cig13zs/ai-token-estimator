const sample = 'Paste prose, code, JSON, CJK text, or emoji here for a rough model-agnostic size range.';
const inputEl = document.getElementById('input'), outputEl = document.getElementById('output');
const statsEl = document.getElementById('output-stats') || document.getElementById('stats');
function process() { const result = AITokenEstimator.estimate(inputEl.value); outputEl.value = inputEl.value ? JSON.stringify(result, null, 2) : ''; if (statsEl) statsEl.textContent = inputEl.value ? 'Roughly ' + result.range.low + '-' + result.range.high + ' tokens; exact count needs the model tokenizer' : 'Empty input'; }
document.getElementById('btn-run').addEventListener('click', process); inputEl.addEventListener('input', process);
document.getElementById('btn-sample').addEventListener('click', function () { inputEl.value = sample; process(); });
document.getElementById('btn-copy').addEventListener('click', function () { navigator.clipboard.writeText(outputEl.value); });
if (document.getElementById('btn-clear')) document.getElementById('btn-clear').addEventListener('click', function () { inputEl.value = ''; outputEl.value = ''; });
