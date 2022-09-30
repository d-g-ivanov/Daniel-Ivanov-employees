export function getPairs(dataArray) {
  // let pairs = {};
  // let daysTogether = {};

  const result = [
    ['Employee ID #1', 'Employee ID #2', 'Project ID', 'Days worked']
  ];

  const dataLength = dataArray.length;
  for (let i = 0; i < dataLength; i++) {
    const [EmpID1, ProjectID1, DateFrom1, DateTo1] = dataArray[i];

    for (let j = i + 1; j < dataLength; j++) {
      const [EmpID2, ProjectID2, DateFrom2, DateTo2] = dataArray[j];

      // if emp IDs are the same, no calculatons needed
      if (EmpID1 === EmpID2) continue;
      // if project IDs are different, no calculatons needed
      if (ProjectID1 !== ProjectID2) continue;

      // convert the dates
      const startDate1 = new Date(DateFrom1);
      const endDate1 = DateTo1 === 'NULL' ? new Date() : new Date(DateTo1);
      const startDate2 = new Date(DateFrom2);
      const endDate2 = DateTo2 === 'NULL' ? new Date() : new Date(DateTo2);

      // confirm there is overlap in the dates, and if not overlap, no need to do anything
      const start = startDate1 < startDate2 ? startDate2 : startDate1;
      const end = endDate1 < endDate2 ? endDate1 : endDate2;

      if (end <= start) continue;

      // there is overlap, so calculate it
      const diffTime = Math.abs(end - start);
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

      result.push([EmpID1, EmpID2, ProjectID1, diffDays]);
    }
  }

  return result;
}
