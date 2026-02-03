const fs = require('fs');
const input = '/Users/sachin/Documents/Personal/Aztec/ExportCSV.csv';
const output = '/Users/sachin/Documents/Personal/Aztec/ExportCSV.cleaned.csv';

function splitLine(line) {
  // split into at most 4 columns: email, first_name, country, phone_number_id
  const parts = line.split(',', 4);
  const email = parts[0] ? parts[0].trim() : '';
  const first_name = parts[1] ? parts[1].trim() : '';
  const country = parts[2] ? parts[2].trim() : '';
  const phone = parts[3] ? parts[3].trim() : '';
  return { email, first_name, country, phone };
}

try {
  const raw = fs.readFileSync(input, 'utf8');
  const lines = raw.split(/\r?\n/);
  if (lines.length === 0) {
    console.error('Empty input file');
    process.exit(1);
  }
  const header = lines.shift();
  const out = [header];

  for (const line of lines) {
    if (!line || line.trim() === '') continue;
    const { email, first_name, country, phone } = splitLine(line);
    if (!email) continue;
    // split emails on semicolon
    const emails = email.split(';').map(e => e.trim()).filter(Boolean);
    if (emails.length <= 1) {
      out.push([email, first_name, country, phone].join(','));
    } else {
      for (const e of emails) {
        out.push([e, first_name, country, phone].join(','));
      }
    }
  }

  fs.writeFileSync(output, out.join('\n'), 'utf8');
  console.log('Wrote', output, 'with', out.length - 1, 'data rows');
} catch (err) {
  console.error(err);
  process.exit(2);
}
