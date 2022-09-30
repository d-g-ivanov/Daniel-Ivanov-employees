import './styles.css';

export default function DataGrid({ data }) {
  const [head, ...body] = data;

  if (head === undefined) return '';
  return (
    <div className="grid-container">
      <table>
        <thead>
          <tr>
            {head.map((item, key) => (
              <th key={key}>{item}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {body.map((row, rowKey) => (
            <tr key={rowKey}>
              {row.map((cell, cellKey) => (
                <td key={cellKey}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
