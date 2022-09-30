function findLineBreak(str) {
  return str.indexOf('\r\n') ? '\r\n' : '\n';
}

function csvToArrayOfObjects(str, delimiter = ',') {
  const lineBreak = findLineBreak(str);

  let [headers, ...rows] = str.split(lineBreak);

  headers = headers.split(delimiter);

  if (rows[rows.length - 1] === '') rows.pop();

  const arr = rows.map(function (row) {
    const values = row.split(delimiter);
    const el = headers.reduce(function (object, header, index) {
      object[header] = values[index];
      return object;
    }, {});
    return el;
  });

  // return the array
  return arr;
}

function csvToArrayOfArrays(str, delimiter = ',') {
  const lineBreak = findLineBreak(str);

  let [headers, ...rows] = str.split(lineBreak);

  headers = headers.split(delimiter);

  if (rows[rows.length - 1] === '') rows.pop();

  rows = rows.map(function (row) {
    return row.split(delimiter);
  });

  return [headers, ...rows];
}

export function readCsvFile(file) {
  return new Promise((res, rej) => {
    const reader = new FileReader();

    reader.onload = function (e) {
      const text = csvToArrayOfArrays(e.target.result);
      res(text);
    };

    reader.readAsText(file);
  });
}
