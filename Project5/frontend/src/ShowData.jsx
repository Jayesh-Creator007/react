import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Api from "./Api";

const API = Api;

export default function ShowData() {
  const [items, setItems] = useState([]);
  const navigate = useNavigate();


  const fetchData = () => {
    axios.get(`${API}/all`)
      .then((res) => {
        const records = Array.isArray(res.data.records)
          ? res.data.records
          : [];

        setItems(records);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);


  const deleteItem = async (id) => {
    await axios.delete(`${API}/${id}`);
    fetchData();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>All Items</h2>

      <button onClick={() => navigate("/send")}>+ Add New</button>
      <br /><br />

      {items.length === 0 && <p>No data found</p>}

      {items.map((item) => (
        <div
          key={item._id}
          style={{
            padding: 10,
            border: "1px solid #ccc",
            marginBottom: 10,
          }}
        >
          <h3>{item.title}</h3>
          <p>
            <b>Category:</b> {item.category}
          </p>

          <button onClick={() => navigate(`/send/${item._id}`)}>
            Update
          </button>
          &nbsp;
          <button onClick={() => deleteItem(item._id)}>Delete</button>
        </div>
      ))}

    </div>
  );
}
