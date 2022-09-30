import { useState } from 'react';
import FilePicker from '../FilePicker';
import DataGrid from '../DataGrid';
import Collapsible from '../Collapsible';

import { readCsvFile } from './utils/csv';
import { getPairs } from './utils/calculations';

export default function TimeSheetCalculator() {
  const [data, setData] = useState([]);
  const [originalData, setOriginalData] = useState([]);

  const handleFile = async (file) => {
    const dataArray = await readCsvFile(file);
    const result = getPairs(dataArray);
    setData(result);
    setOriginalData(dataArray);
  };

  const showOriginal = originalData.length !== 0;
  return (
    <>
      <FilePicker processFile={handleFile} acceptTypes={['text/csv']} />
      {showOriginal && (
        <Collapsible label="See uploaded data" initialState={false}>
          <DataGrid data={originalData} />
        </Collapsible>
      )}
      <DataGrid data={data} />
    </>
  );
}
