import React, { useState } from "react";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import {
  Container,
  Typography,
  useMediaQuery,
  TextField,
  Button,
} from "@mui/material";
import { v4 as uuidv4 } from "uuid";
import { useHistory } from "react-router-dom";

const Create = () => {
  const [img, setImg] = useState(null);
  const [type, setType] = useState(null);
  const [heading, setHeading] = useState(null);
  const [date, setDate] = useState(null);
  const [body, setBody] = useState(null);
  const theme = useTheme();
  const Xsmall = useMediaQuery(theme.breakpoints.down("sm"));
  const history = useHistory();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("hello");
    await fetch("http://localhost:8000/blogs", {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify({ id: uuidv4(), img, type, heading, date, body }),
    });
    history.push("/");
  };

  return (
    <>
      <Box
        sx={{
          flexGrow: 1,
          backgroundColor: "var(--white)",
          paddingTop: theme.spacing(2),
          paddingBottom: theme.spacing(2),
          paddingInline: theme.spacing(3),
        }}
      >
        <Container>
          <Typography variant='h5' fontWeight={500} color='var(--font-main)'>
            Create
          </Typography>
        </Container>
      </Box>
      <Container sx={{ mb: theme.spacing(10) }}>
        <Box
          sx={{
            backgroundColor: "var(--white)",
            maxWidth: 800,
            marginInline: "auto",
            mt: 10,
            borderRadius: 5,
            padding: theme.spacing(4),
          }}
        >
          <form onSubmit={handleSubmit}>
            <TextField
              id='heading'
              label='Heading'
              variant='filled'
              onChange={(e) => setHeading(e.target.value)}
              required
              sx={{
                width: "100%",
                mb: theme.spacing(3),
                color: "var(--font-main)",
              }}
            />
            <Box
              sx={{
                display: "flex",
                alignItems: { sm: "center", xs: "flex-start" },
                flexDirection: { sm: "row", xs: "column" },
                gap: theme.spacing(5),
                mb: theme.spacing(3),
              }}
            >
              <TextField
                id='type'
                label='Type'
                helperText={`${
                  Xsmall ? "Fun, Serious, etc" : "Fun, Serious, Travel, etc"
                }`}
                variant='standard'
                onChange={(e) => setType(e.target.value)}
                required
                sx={{ width: { sm: "30%", xs: "50%" } }}
              />

              <TextField
                id='date'
                label='Date'
                helperText='Ex. Jan 26 2020'
                variant='standard'
                onChange={(e) => setDate(e.target.value)}
                required
                sx={{
                  width: { sm: "30%", xs: "50%" },
                  mt: { sm: 0, xs: "-15px" },
                }}
              />
            </Box>
            <TextField
              id='img'
              label='Image URL'
              helperText='Ex. https://picsum.photos/536/354'
              variant='standard'
              onChange={(e) => setImg(e.target.value)}
              required
              sx={{ width: "100%", mb: theme.spacing(5) }}
            />

            <TextField
              required
              id='body'
              label='Body'
              variant='outlined'
              sx={{ width: "100%", mb: theme.spacing(4) }}
              multiline={true}
              rows={5}
              onChange={(e) => setBody(e.target.value)}
            />

            <Button
              variant='contained'
              sx={{
                backgroundColor: "var(--light-black)",
                ml: theme.spacing(2),
                "&:hover": { backgroundColor: "var(--font-main)" },
              }}
              type='submit'
            >
              Add Blog
            </Button>
          </form>
        </Box>
      </Container>
    </>
  );
};

export default Create;
