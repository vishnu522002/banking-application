import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

export default function UserPage() {
  const url = "http://localhost:3000/users";

  let navigate = useNavigate();

  const { index } = useParams();

  const inputRef = useRef(null);

  const [user, setUser] = useState({
    userId: "",
    accountNumber: "",
    accountHolder: "",
    accountType: "",
    contact: "",
    email: "",
    password: "",
  });

  const [readOnly, setReadOnly] = useState(true);

  const handleChange = (e) => {
    setUser({
      ...user,
      [e.target.name]: e.target.value,
    });
  };

  const loadData = async () => {
    const users = await axios.get(url).then((res) => {
      const mainUser = res.data[index];

      setUser({
        ...user,
        accountNumber: mainUser.customerAccountNo,
        accountHolder: mainUser.customerName,
        accountType: mainUser.customerAccountType,
        contact: mainUser.customerContact,
        email: mainUser.customerEmail,
        password: mainUser.customerPin,
        userId: mainUser.customerId,
      });
    });
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleClick = (e) => {
    setReadOnly(false);
    inputRef.current.focus();
  };

  const handleDelete = async () => {
    alert(
      "Are you sure you want to delete with account no " + user.accountNumber
    );
    navigate("/");
  };

  return (
    <div className="container m-auto row mt-5 d-flex align-items-center col-lg-5">
      <div className="col-8">
        <h1 className="text-start">My Account</h1>
      </div>
      <div className="col-3">
        <button
          className="btn btn-outline-primary float-end"
          onClick={handleClick}
        >
          Edit
        </button>
      </div>

      <div id="about-areas" className="row col-auto">
        <form className="row g-3">
          <div className="col-12 mt-lg-3">
            <label htmlFor="inputAddress3" className="form-label">
              User ID
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAddress3"
              name="accountNumber"
              value={user.userId}
              onChange={handleChange}
              readOnly={true}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="col-12 mt-lg-3">
            <label htmlFor="inputAddress" className="form-label">
              Account No
            </label>
            <input
              type="number"
              className="form-control"
              id="inputAddress"
              name="accountNumber"
              value={user.accountNumber}
              onChange={handleChange}
              readOnly={true}
              onWheel={(e) => e.target.blur()}
            />
          </div>
          <div className="col-12 mt-lg-4">
            <label htmlFor="inputAddress2" className="form-label">
              Name
            </label>
            <input
              type="text"
              className="form-control"
              id="inputAddress2"
              name="accountHolder"
              value={user.accountHolder}
              onChange={handleChange}
              readOnly={readOnly}
              ref={inputRef}
            />
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputEmail4" className="form-label">
              Email
            </label>
            <input
              type="email"
              className="form-control"
              id="inputEmail4"
              name="email"
              value={user.email}
              onChange={handleChange}
              readOnly={readOnly}
            />
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputPassword4" className="form-label">
              Password
            </label>
            <input
              type="password"
              className="form-control"
              id="inputPassword4"
              name="password"
              value={user.password}
              onChange={handleChange}
              autoComplete="true"
              readOnly={readOnly}
            />
          </div>

          <div className="col-md-6 mt-lg-4">
            <div className="row ">
              <label htmlFor="contact" className="form-label">
                Contact
              </label>
              <div className="input-group">
                <span className="input-group-text" id="basic-addon1">
                  +91
                </span>
                <input
                  type="number"
                  className="form-control"
                  aria-label="Username"
                  aria-describedby="basic-addon1"
                  id="contact"
                  name="contact"
                  value={user.contact}
                  readOnly={readOnly}
                  onChange={handleChange}
                  onWheel={(e) => e.target.blur()}
                />
              </div>
            </div>
          </div>
          <div className="col-md-6 mt-lg-4">
            <label htmlFor="inputState" className="form-label">
              Account Type
            </label>
            <select
              id="inputState"
              className="form-select"
              name="accountType"
              onChange={handleChange}
              value={user.accountType}
            >
              <option value="current" disabled={readOnly}>
                Current
              </option>
              <option value="savings" disabled={readOnly}>
                Savings
              </option>
            </select>
          </div>

          <div className="col-12 my-4 mt-lg-5 d-flex justify-content-between">
            <Link
              type="button"
              className="btn btn-outline-info"
              to={`/transactions/${index}`}
            >
              View Transactions
            </Link>
            <button
              type="button"
              className="btn btn-outline-danger"
              onClick={handleDelete}
            >
              Delete account
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
