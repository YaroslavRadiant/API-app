import React, { useState, useEffect } from "react";
import { getGenderedUsersData, getUsersData } from "../../api/usersApi";
import {
  Box,
  CircularProgress,
  Container,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  Stack,
} from "@mui/material";
import PostsItem from "../../Components/PostsItem/PostsItem";

export default function UsersPage() {
  const [gender, setGender] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(0);
  const [pageQty, setPageQty] = useState(350);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    if (gender !== "all") {
      getGenderedUsersData(gender, page)
        .then((res) => {
          setPosts(res.data);
          setPageQty(res.meta.pagination.pages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    } else if (gender === "all") {
      getUsersData(page)
        .then((res) => {
          setPosts(res.data);
          setPageQty(res.meta.pagination.pages);
        })
        .finally(() => {
          setIsLoading(false);
        });
    }
  }, [page, gender]);

  const handleGenderChange = (event) => {
    setGender(event.target.value);
  };

  return (
    <div>
      <Container sx={{ mt: "25px" }}>
        <Stack spacing={2}>
          {!!pageQty && (
            <Pagination
              count={pageQty}
              page={page}
              onChange={(_, num) => setPage(num)}
            />
          )}
          <Box sx={{ minWidth: 120 }}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">gender</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={gender}
                label="gender"
                name="gender"
                onChange={handleGenderChange}
              >
                <MenuItem value={"male"}>Male</MenuItem>
                <MenuItem value={"female"}>Female</MenuItem>
                <MenuItem value={"all"}>All</MenuItem>
              </Select>
            </FormControl>
          </Box>
          {isLoading ? (
            <CircularProgress size={"10%"} />
          ) : (
            posts.map((post) => {
              return (
                <PostsItem
                  key={post.id}
                  name={post.name}
                  email={post.email}
                  gender={post.gender}
                  status={post.status}
                  id={post.id}
                ></PostsItem>
              );
            })
          )}
        </Stack>
      </Container>
    </div>
  );
}
