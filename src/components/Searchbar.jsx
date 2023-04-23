import { useState } from 'react';

export default function Searchbar({ items }) {
  const [filterText, setFilterText] = useState('');

  const filteredItems = items?.filter(item => {
    return item.toLowerCase().includes(filterText.toLowerCase());
  });

  return (
    <>
      <input type="text" placeholder="Filter" value={filterText} onChange={e => setFilterText(e.target.value)} />
      <ul>
        {filteredItems && filteredItems.map(item => (
          <li key={item}>{item}</li>
        ))}
      </ul>
    </>
  );
}