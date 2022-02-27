'use strict';

{
  function setWord() {
    word = words.splice(Math.floor(Math.random() * words.length), 1)[0];
    kana.textContent = word.kana;
    underbar1.textContent = '';
    target.textContent = word.alphabet;
    loc = 0;
  }

  const words = [
    {alphabet:'tyokinn',kana:'ちょきん'},
    {alphabet:'naisyo',kana:'ないしょ'},
    {alphabet:'otamajyakusi',kana:'おたまじゃくし'},
    {alphabet:'syukudai',kana:'しゅくだい'},
    {alphabet:'konnnyaku',kana:'こんにゃく'},
    {alphabet:'jidousya',kana:'じどうしゃ'},
    {alphabet:'omotya',kana:'おもちゃ'},
    {alphabet:'kakijunn',kana:'かきじゅん'},
    {alphabet:'ninngyo',kana:'にんぎょ'},
    {alphabet:'akusyu',kana:'あくしゅ'},
    {alphabet:'tyairo',kana:'ちゃいろ'},
    {alphabet:'tosyositu',kana:'としょしつ'},
    {alphabet:'syokuji',kana:'しょくじ'},
    {alphabet:'jitennsya',kana:'じてんしゃ'},
    {alphabet:'jyunnbann',kana:'じゅんばん'},
    {alphabet:'kaisya',kana:'かいしゃ'},
    {alphabet:'jyagaimo',kana:'じゃがいも'},
    {alphabet:'ryokou',kana:'りょこう'},
    {alphabet:'kabotya',kana:'かぼちゃ'},
    {alphabet:'syasinn',kana:'しゃしん'},
    {alphabet:'hyakuenn',kana:'ひゃくえん'},
    {alphabet:'tyawann',kana:'ちゃわん'},
  ];
  let word;
  let loc = 0;
  let startTime;
  let isPlaying = false;
  const underbar1 = document.getElementById('underbar1');
  const underbar2 = document.getElementById('underbar2');
  const kana = document.getElementById('kana');
  const target = document.getElementById('target');
  let inputWord = '';
  let oneWordAlphabet = '';

  document.addEventListener('click', () => {
    if (isPlaying === true) {
      return;
    }

    isPlaying = true;
    startTime = Date.now();
    setWord();
  });

  document.addEventListener('keydown', e => {
    if (e.key !== word.alphabet[loc]) {
      return;
    }

    inputWord += word.alphabet[loc];
    const kanaLength = r2h(inputWord).replace(/[a-z]/g, '').length;
    underbar1.textContent = '＿'.repeat(kanaLength);
    underbar2.textContent = '＿'.repeat(word.kana.length - kanaLength);

    oneWordAlphabet += word.alphabet[loc];
    const oneWordAlphabetLength = r2h(oneWordAlphabet).replace(/[a-z]/g, '').length;
    if (oneWordAlphabetLength >= 1) {
      const oneWordKana = r2h(oneWordAlphabet).replace(/[a-z]/g, '');
      speechSynthesis.speak(new SpeechSynthesisUtterance(oneWordKana));
      oneWordAlphabet = '';
    }
    loc++;

    // 1: _ed
    // 2: __d
    // 3: ___
    target.textContent = '_'.repeat(loc) + word.alphabet.substring(loc);

    if (loc === word.alphabet.length) {
      if (words.length === 0) {
        const elapsedTime = ((Date.now() - startTime) / 1000).toFixed(2);
        const result = document.getElementById('result');
        result.textContent = `Finished! ${elapsedTime} 秒!`;
        return;
      }

      setTimeout(() => {
        inputWord = '';
        setWord();
      }, 400);
    }
  });
}

// License: Public Domain
var roman2hiragana = {
  'a':'あ', 'i':'い', 'u':'う', 'e':'え', 'o':'お',
  'ka':'か', 'ki':'き', 'ku':'く', 'ke':'け', 'ko':'こ',
  'sa':'さ', 'si':'し', 'su':'す', 'se':'せ', 'so':'そ',
  'ta':'た', 'ti':'ち', 'tu':'つ', 'te':'て', 'to':'と', 'chi':'ち', 'tsu':'つ',
  'na':'な', 'ni':'に', 'nu':'ぬ', 'ne':'ね', 'no':'の',
  'ha':'は', 'hi':'ひ', 'hu':'ふ', 'he':'へ', 'ho':'ほ', 'fu':'ふ',
  'ma':'ま', 'mi':'み', 'mu':'む', 'me':'め', 'mo':'も',
  'ya':'や', 'yi':'い', 'yu':'ゆ', 'ye':'いぇ', 'yo':'よ',
  'ra':'ら', 'ri':'り', 'ru':'る', 're':'れ', 'ro':'ろ',
  'wa':'わ', 'wyi':'ゐ', 'wu':'う', 'wye':'ゑ', 'wo':'を',
  'nn':'ん',
  'ga':'が', 'gi':'ぎ', 'gu':'ぐ', 'ge':'げ', 'go':'ご',
  'za':'ざ', 'zi':'じ', 'zu':'ず', 'ze':'ぜ', 'zo':'ぞ', 'ji':'じ',
  'da':'だ', 'di':'ぢ', 'du':'づ', 'de':'で', 'do':'ど',
  'ba':'ば', 'bi':'び', 'bu':'ぶ', 'be':'べ', 'bo':'ぼ',
  'pa':'ぱ', 'pi':'ぴ', 'pu':'ぷ', 'pe':'ぺ', 'po':'ぽ',
  'kya':'きゃ', 'kyu':'きゅ', 'kyo':'きょ',
  'sya':'しゃ', 'syu':'しゅ', 'syo':'しょ',
  'tya':'ちゃ', 'tyi':'ちぃ', 'tyu':'ちゅ', 'tye':'ちぇ', 'tyo':'ちょ', 'cha':'ちゃ', 'chu':'ちゅ', 'che':'ちぇ', 'cho':'ちょ',
  'nya':'にゃ', 'nyi':'にぃ', 'nyu':'にゅ', 'nye':'にぇ', 'nyo':'にょ',
  'hya':'ひゃ', 'hyi':'ひぃ', 'hyu':'ひゅ', 'hye':'ひぇ', 'hyo':'ひょ',
  'mya':'みゃ', 'myi':'みぃ', 'myu':'みゅ', 'mye':'みぇ', 'myo':'みょ',
  'rya':'りゃ', 'ryi':'りぃ', 'ryu':'りゅ', 'rye':'りぇ', 'ryo':'りょ',
  'gya':'ぎゃ', 'gyi':'ぎぃ', 'gyu':'ぎゅ', 'gye':'ぎぇ', 'gyo':'ぎょ',
  'zya':'じゃ', 'zyi':'じぃ', 'zyu':'じゅ', 'zye':'じぇ', 'zyo':'じょ',
  'ja':'じゃ', 'ju':'じゅ', 'je':'じぇ', 'jo':'じょ', 'jya':'じゃ', 'jyi':'じぃ', 'jyu':'じゅ', 'jye':'じぇ', 'jyo':'じょ',
  'dya':'ぢゃ', 'dyi':'ぢぃ', 'dyu':'ぢゅ', 'dye':'ぢぇ', 'dyo':'ぢょ',
  'bya':'びゃ', 'byi':'びぃ', 'byu':'びゅ', 'bye':'びぇ', 'byo':'びょ',
  'pya':'ぴゃ', 'pyi':'ぴぃ', 'pyu':'ぴゅ', 'pye':'ぴぇ', 'pyo':'ぴょ',
  'fa':'ふぁ', 'fi':'ふぃ', 'fe':'ふぇ', 'fo':'ふぉ',
  'fya':'ふゃ', 'fyu':'ふゅ', 'fyo':'ふょ',
  'xa':'ぁ', 'xi':'ぃ', 'xu':'ぅ', 'xe':'ぇ', 'xo':'ぉ', 'la':'ぁ', 'li':'ぃ', 'lu':'ぅ', 'le':'ぇ', 'lo':'ぉ',
  'xya':'ゃ', 'xyu':'ゅ', 'xyo':'ょ',
  'xtu':'っ', 'xtsu':'っ',
  'wi':'うぃ', 'we':'うぇ',
  'va':'ヴぁ', 'vi':'ヴぃ', 'vu':'ヴ', 've':'ヴぇ', 'vo':'ヴぉ'
};

/*
 * roman -> hiragana
 *
 * @param (String) roman:
 * @return (String): hiragana
 */
function r2h(roman) {
  var i, iz, match, regex,
      hiragana = '', table = roman2hiragana;

  regex = new RegExp((function(table){
    var key,
        s = '^(?:';

    for (key in table) if (table.hasOwnProperty(key)) {
      s += key + '|';
    }
    return s + '(?:n(?![aiueo]|y[aiueo]|$))|' + '([^aiueon])\\1)';
  })(table));
  for (i = 0, iz = roman.length; i < iz; ++i) {
    if (match = roman.slice(i).match(regex)) {
      if (match[0] === 'n') {
        hiragana += 'ん';
      } else if (/^([^n])\1$/.test(match[0])) {
        hiragana += 'っ';
        --i;
      } else {
        hiragana += table[match[0]];
      }
      i += match[0].length - 1;
    } else {
      hiragana += roman[i];
    }
  }
  return hiragana;
}

