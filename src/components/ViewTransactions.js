import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

export default function ViewTransactions() {
  const url = "http://localhost:3000/users";

  let navigate = useNavigate();

  let { index } = useParams();

  const [filterType, setFilterType] = useState("none");

  const [transaction, setTransaction] = useState([]);

  const handleChange = (e) => {
    setFilterType(e.target.value);
  };

  const transactions = async () => {
    const datas = await axios.get(url);
    const userTransactions = datas.data[index].customerTransactions;
    setTransaction(userTransactions);
  };

  useEffect(() => {
    transactions();
  }, []);

  return (
    <div className="d-flex flex-column justify-content-center align-items-center">
      <div className="col-3 col-lg-1 m-5">
        <select name="" id="" className="form-select" onChange={handleChange}>
          <option hidden={true}>filter by</option>
          <option value="credit">credit</option>
          <option value="debit">debit</option>
          <option value="none">none</option>
        </select>
      </div>
      <table className="table text-center w-75 m-auto mt-3 shadow border ">
        <thead className="bg-light">
          <tr>
            <th scope="col">Transaction ID</th>
            <th scope="col">Date</th>

            <th scope="col">Type</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          {transaction.map((data, index) => (
            <TableDatas data={data} key={index} filter={filterType} />
          ))}
        </tbody>
      </table>
      <div>
        <button className="btn btn-success ">New Transaction</button>
        <button
          className="btn btn-secondary m-5"
          onClick={() => navigate(`/account/${index}`)}
        >
          Back to Home
        </button>
      </div>
    </div>
  );
}

const TableDatas = ({ data, filter }) => {
  return filter == data.transactionType ? (
    <tr>
      <th scope="row">{data.transactionId}</th>
      <td>{data.transactionDate}</td>
      <td>{data.transactionType}</td>
      <td
        style={
          data.transactionType == "credit"
            ? { backgroundColor: "#ccffcc" }
            : { backgroundColor: "#ffaaaa" }
        }
      >
        {data.transactionAmount}
      </td>
    </tr>
  ) : filter == "none" ? (
    <tr>
      <th scope="row">{data.transactionId}</th>
      <td>{data.transactionDate}</td>
      <td>{data.transactionType}</td>
      <td
        style={
          data.transactionType == "credit"
            ? { backgroundColor: "#ccffcc" }
            : { backgroundColor: "#ffaaaa" }
        }
      >
        {data.transactionAmount}
      </td>
    </tr>
  ) : (
    ""
  );
};
