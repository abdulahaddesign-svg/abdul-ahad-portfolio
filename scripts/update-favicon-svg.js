const fs = require('fs');
const path = require('path');

const pngPath = path.join(__dirname, '..', 'public', 'favicon.png');
const svgPath = path.join(__dirname, '..', 'public', 'favicon.svg');

const base64Data = fs.readFileSync(pngPath).toString('base64');
const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" width="512" height="512">
  <image width="512" height="512" href="data:image/png;base64,${base64Data}" />
</svg>
`;

fs.writeFileSync(svgPath, svgContent, 'utf8');
console.log('favicon.svg successfully written');
