import React from 'react';

export default function GlobalFilter({ filter, setFilter }) {
  return (
    <span>
      <label htmlFor="global">Pesquisar</label>
      <input
        type="text"
        name="global"
        id="global"
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
      />
    </span>
  );
}
