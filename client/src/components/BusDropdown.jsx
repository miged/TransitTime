import React from 'react';
import { useState } from 'react';
import './BusDropdown.css';

export default function BusDropdown(props) {
  const [clicked, setClicked] = useState(false);
  const clickClass = clicked
    ? 'expanded-row-content'
    : 'expanded-row-content hide-row';

  const toggleable = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  };

  return (
    <tbody>
      <tr onClick={() => toggleable()}>
        <td>{props.route_id}</td>
        <td>{props.route_name}</td>
        <td>{props.time}</td>
        <td className={clickClass}>...</td>
      </tr>
    </tbody>
  );
}
