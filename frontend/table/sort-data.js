'use strict';

const sortData = (tableData, sortFieldId, sortState) => {
  const sortedData = {};

  const arr = Array.from(tableData);
  const sortField = sortFieldId.split('-')[1];

  let currentSortState = sortState;

  const compare = (a, b) => {
    return (sortState === 'ascending') ? a[sortField][0].toLowerCase() < b[sortField][0].toLowerCase()
      : a[sortField][0].toLowerCase() > b[sortField][0].toLowerCase();
  };

  const compareNumbers = (a, b) => {
    return (sortState === 'ascending') ? +a[sortField] < +b[sortField] : +a[sortField] > +b[sortField];
  };

  (sortField === 'age') ? arr.sort(compareNumbers) : arr.sort(compare);

  sortedData.people = arr;

  if (currentSortState === 'ascending') {
    currentSortState = 'discending';
  } else {
    currentSortState = 'ascending';
  }

  sortedData.sortState = {
    sortFieldId,
    currentSortState
  };

  return sortedData;
};

export default function (tableData, sortFieldId, sortState) {
  return sortData(tableData, sortFieldId, sortState);
}
