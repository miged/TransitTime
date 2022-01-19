import React from "react";
import { useState } from "react";
import "./BusDropdown.css"

export default function BusDropdown(props) {

  const [clicked, setClicked] = useState(false)
  const clickClass = clicked ? 'expanded-row-content' : 'expanded-row-content hide-row';

  const toggleable = () => {
    if (!clicked) {
      setClicked(true);
    } else {
      setClicked(false);
    }
  }

  return (
    <tbody>
      <tr onClick={() => toggleable()}>
        <td>{props.route_id}</td>
        <td>Bus Route here</td>
        <td>{props.time}</td>
        <td className={clickClass}>Lorem Ipsum is simply dummy text of the printing and typesetting industry.
        Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a
        galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also
        the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the
        release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software
        like Aldus PageMaker including versions of Lorem Ipsum.</td>
      </tr>
    </tbody>
  );
};