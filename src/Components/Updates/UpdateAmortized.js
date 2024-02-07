import axios from "axios";
import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Swal from 'sweetalert2'
import './style.css'

function UpdateAmortized() {
    const { id } = useParams();
    const navigate = useNavigate();

    const checkToken = () => {
      const token = localStorage.getItem("token");
      fetch(`${process.env.REACT_APP_API_URL}/authen`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.status === "ok") { 
          } else {
            Swal.fire({
              icon: "error",
              title: "Authentication Failed",
              text: "Please login again",
              showCancelButton: false,
              confirmButtonText: "Back to Login",
              allowOutsideClick: false, 
              allowEscapeKey: false,
            }).then((result) => {
              if (result.isConfirmed) {
                localStorage.removeItem("token");
                window.location = "/";
              }
            });
          }
        })
        .catch((error) => {
          console.error("Error", error);
        });
    };
  
    useEffect(() => {
      checkToken();
      axios
        .get(`${process.env.REACT_APP_API_URL}/readhw-amortized/` + id)
        .then((res) => {
          console.log(res);
          setAmortzied({
            ...amortzied,
            assetnum: res.data[0].assetnum,
            brand: res.data[0].brand,
            model: res.data[0].model,
            user: res.data[0].user,
            location: res.data[0].location,
            spec: res.data[0].spec,
            sn: res.data[0].sn,
            software: res.data[0].software,
            price: res.data[0].price,
            receivedate: res.data[0].receivedate,
            invoicenum: res.data[0].invoicenum,
            ponum: res.data[0].ponum,
            amortizeddate: res.data[0].amortizeddate,
          });
        })
        .catch((err) => console.log(err));
    }, []);
  
    const [amortzied, setAmortzied] = useState({
      assetnum: "",
      brand: "",
      model: "",
      user: "",
      location: "",
      spec: "",
      sn: "",
      software: "",
      price: "",
      receivedate: "",
      invoicenum: "",
      ponum: "",
      amortizeddate:""
    });
  
    const handleUpdate = (event) => {
      event.preventDefault();
      const requiredFields = [
        `assetnum`, `brand`, `model`, `user`, `location`, `spec`, `sn`, `software`, `price`, `receivedate`, `invoicenum`, `ponum`, `amortizeddate`
      ];
      for (const field of requiredFields) {
        if (!amortzied[field] && amortzied[field] !== 0) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} is required.`,
          });
          return;
        }
      }
      for (const field in amortzied) {
        if (amortzied.hasOwnProperty(field) && amortzied[field] === null) {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: `${field} cannot be null.`,
          });
          return;
        }
      }
      Swal.fire({
        title: "Confirm Update Data?",
        showCancelButton: true,
        confirmButtonText: "Update",
        allowOutsideClick: false,
        allowEscapeKey: false,
      }).then((result) => {
        if (result.isConfirmed) {
          axios.put(`${process.env.REACT_APP_API_URL}/updatehw-amortized/` + id, amortzied)
            .then((res) => {
              Swal.fire("Updated!", "", "success")
                .then(() => {
                  console.log(res);
                  navigate("/dashboard/readamortized/" + id, amortzied);
                });
            })
            .catch((err) => {
              console.log(err);
              Swal.fire({
                icon: 'error',
                title: 'Server Error',
                text: 'Error updating data on the server.',
              });
            });
        }
      });
    };
  
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <div className="p-3 rounded w-50 border borderc bg-white">
          <h2 className="text-center">Update Asset</h2>
          <form className="row g-1" onSubmit={handleUpdate}>
          <div className="col-12">
              <label for="inputAmortizedDate" className="form-label fs-5">
                Amortized Date
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAmortizedDate"
                placeholder="Enter Amortized Date"
                value={amortzied.amortizeddate}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, amortizeddate: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Asset ID
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputAssetID"
                placeholder="Enter AssetID"
                value={amortzied.assetnum}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, assetnum: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Brand
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputBrand"
                placeholder="Enter Brand"
                value={amortzied.brand}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, brand: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Model
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputModel"
                placeholder="Enter Model"
                value={amortzied.model}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, model: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                User
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputUser"
                placeholder="Enter User"
                value={amortzied.user}
                onChange={(e) => setAmortzied({ ...amortzied, user: e.target.value })}
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Location
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputLocation"
                placeholder="Enter Location"
                value={amortzied.location}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, location: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Spec
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSpec"
                placeholder="Enter Spec"
                value={amortzied.spec}
                onChange={(e) => setAmortzied({ ...amortzied, spec: e.target.value })}
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Serial Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSerialnumber"
                placeholder="Enter Serialnumber"
                value={amortzied.sn}
                onChange={(e) => setAmortzied({ ...amortzied, sn: e.target.value })}
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Softwere Install
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputSoftwareinstall"
                placeholder="Enter Software install"
                value={amortzied.software}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, software: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Price
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputPrice"
                placeholder="Enter Price"
                value={amortzied.price}
                onChange={(e) => {
                  const inputValue = e.target.value;
                  const numericValue = parseFloat(inputValue.replace(/,/g, '')); 
                  setAmortzied({ ...amortzied, price: isNaN(numericValue) ? '' : numericValue });
              }}
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Recieve Date
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputReceiveDate"
                placeholder="Enter Receive Date"
                value={amortzied.receivedate}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, receivedate: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                Invoid Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputInvoiceNumber"
                placeholder="Enter Invoice Number"
                value={amortzied.invoicenum}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, invoicenum: e.target.value })
                }
              />
            </div>
            <div className="col-12">
            <label for="inputAmortizedDate" className="form-label fs-5">
                PO Number
              </label>
              <input
                type="text"
                className="form-control rounded-0 borderc"
                id="inputPONumber"
                placeholder="Enter PO Number"
                value={amortzied.ponum}
                onChange={(e) =>
                  setAmortzied({ ...amortzied, ponum: e.target.value })
                }
              />
            </div>
            <p></p>
            <button className="btn btn-success w-100 rounded-0 mb-2">
              Update Amortied Asset Data
            </button>
          </form>
        </div>
      </div>
    );
  }

export default UpdateAmortized