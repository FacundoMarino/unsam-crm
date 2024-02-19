import React, { useEffect, useRef, useState } from 'react';
import Sortable from 'sortablejs';

export const FaqGestion = () => {
  const [items, setItems] = useState([
    'Elemento 1',
    'Elemento 2',
    'Elemento 3',
    'Elemento 4',
  ]);
  const listRef = useRef(null);

  useEffect(() => {
    const sortableList = Sortable.create(listRef.current, {
      animation: 150,
      onEnd: (event) => {
        const newItems = [...items];
        const [movedItem] = newItems.splice(event.oldIndex, 1);
        newItems.splice(event.newIndex, 0, movedItem);
        setItems(newItems);
      },
    });

    return () => {
      sortableList.destroy();
    };
  }, [items]);

  console.log(items);

  return (
    <ul ref={listRef}>
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};
