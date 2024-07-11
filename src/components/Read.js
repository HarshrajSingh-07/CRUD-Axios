import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function Read() {
  const [apiData, setApiData] = useState([]);
  function getData() {
    axios.get("http://localhost:8000/users").then((res) => {
      setApiData(res.data);
    }).catch((err)=>{
        console.log(err)
    });
  }
  function Delete(id) {
    axios.delete(`http://localhost:8000/users/${id}`).then(() => {
      getData();
    }).catch((err)=>{
        console.log(err)
    });
  }
  function setDataToStorage(id,name,email,number){
    localStorage.setItem('id',id);
    localStorage.setItem('name',name);
    localStorage.setItem('email',email);
    localStorage.setItem('number',number);
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <div>
            <Link to="/create">
              <button className="btn btn-success my-3">Create New Data</button>
            </Link>
          </div>
          <table className="table table-bordered table-striped table-hover dark">
            <thead>
              <tr>
                <th>Id</th>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile</th>
                <th>Edit</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody>
              {apiData.map((item, i) => {
                return (
                  <>
                    <tr>
                      <td>{i + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.email}</td>
                      <td>{item.number}</td>
                      <td>
                        <Link to='/edit'><button className="btn btn-primary" onClick={()=>setDataToStorage(item.id,item.name,item.email,item.number)}>Edit</button></Link>
                      </td>
                      <td>
                        <button
                          onClick={() => {
                            if (
                              window.confirm("Are You Sure To Delete Data ??")
                            ) {
                              Delete(item.id);
                            }
                          }}
                          className="btn btn-danger"
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  </>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Read;
