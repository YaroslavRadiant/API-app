import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { getUserData, putUserData } from "../../api/usersApi";
import {
  Button,
  Container,
  InputLabel,
  LinearProgress,
  MenuItem,
  Stack,
  Select,
  TextField,
} from "@mui/material";
import "react-toastify/dist/ReactToastify.css";

export default function EditUserPage() {
  const params = useParams();
  const [isLoading, setIsLoading] = useState(false);
  const [userData, setUserData] = useState({
    name: "",
    email: "",
    gender: "",
    status: "",
    id: params.id,
  });

  useEffect(() => {
    setIsLoading(true);
    getUserData(params.id)
      .then((res) => {
        setUserData(res.data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [params.id]);

  const navigate = useNavigate();
  const { name, email, gender, status } = userData;

  const handleChange = (event) => {
    const { name, value } = event.target;
    setUserData({ ...userData, [name]: value });
  };

  const goToMain = () => {
    navigate("/users");
  };

  function putAndGetData(param, userData) {
    putUserData(param, userData).then((response) => {
      if (response.status === 200) {
        toast("✅  Data was changed!", {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        setTimeout(() => {
          goToMain();
        }, 4000);
      } else if (response.status !== 200) {
        toast.error(`🆘 Try again! ${response.status}`, {
          position: "top-center",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
      }
    });
  }

  return isLoading ? (
    <LinearProgress />
  ) : (
    <Container sx={{ mt: "25px" }}>
      <Stack spacing={2}>
        <InputLabel id="name-outlined-basic">Name</InputLabel>
        <TextField
          variant="outlined"
          name="name"
          value={name}
          onChange={handleChange}
        />
        <InputLabel id="email-outlined-basic">Email</InputLabel>
        <TextField
          variant="outlined"
          name="email"
          value={email}
          onChange={handleChange}
        />
        <InputLabel id="gender-demo-simple-select-label">Gender</InputLabel>

        <Select name="gender" value={gender} onChange={handleChange}>
          <MenuItem value={"male"}>Male</MenuItem>
          <MenuItem value={"female"}>Female</MenuItem>
        </Select>
        <InputLabel id="status-demo-simple-select-label">Status</InputLabel>
        <Select name="status" value={status} onChange={handleChange}>
          <MenuItem value={"active"}>Active</MenuItem>
          <MenuItem value={"inactive"}>Inactive</MenuItem>
        </Select>
      </Stack>
      <Button
        sx={{ mt: "25px" }}
        variant="contained"
        type="submit"
        onClick={() => putAndGetData(params.id, userData)}
      >
        submit
      </Button>
      <Button
        sx={{ mt: "25px",ml:"25px"}}
        variant="contained"
        onClick={() => {
          goToMain();
        }}
      >
        Go back
      </Button>
      <ToastContainer
        position="top-center"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </Container>
  );
}
