import React from "react";
import Table from "react-bootstrap/Table";

function PrintTable({ results }) {
  return (
    <div>
      <Table striped="columns" responsive>
        <thead>
          <tr>
            <th>Date of Activity</th>
            <th>Duration</th>
            <th>Type of Activity</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.today_date.slice(0, 10)}</td>
              <td>{result.duration}</td>
              <td>{result.type}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default PrintTable;