import { useForm } from "react-hook-form";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react";
import Api from "./Api";

const API =   Api;

export default function SendData() {
  const { register, handleSubmit, reset } = useForm();
  const { id } = useParams();
  const navigate = useNavigate();


  useEffect(() => {
    if (id) {
      axios
        .get(`${API}/${id}`)
        .then((res) => {
          reset(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, [id]);


  const onSubmit = async (data) => {
    console.log(data);
    
    try {
      if (id) {
        await axios.put(`${API}/${id}`, data);
        alert("Updated successfully");
      } else {
        await axios.post(API, data);
        alert("Created successfully");
      }
      navigate("/show");
    } catch (err) {
      console.log(err);
      alert("Error occurred");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>{id ? "Update Item" : "Create Item"}</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <input {...register("category")} placeholder="Enter Category" required /><br /><br />
        <input {...register("title")} placeholder="Enter Title" required /><br /><br />

        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
}
