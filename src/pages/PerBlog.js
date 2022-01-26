import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Container, Typography, Button } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useHistory } from "react-router-dom";

const PerBlog = () => {
  const theme = useTheme();
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:8000/blogs");
    const res = await data.json();
    const oneBlog = await res.filter((item) => item.id === id);
    setBlog(oneBlog[0]);
    setLoading(false);
  };

  const handleClick = async () => {
    if (window.confirm("This blog will be deleted") == true) {
      await fetch("http://localhost:8000/blogs/" + blog.id, {
        method: "DELETE",
      });
      history.push("/");
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading)
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
              Loading...
            </Typography>
          </Container>
        </Box>
      </>
    );

  return (
    <>
      {!loading && (
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
              Blog
            </Typography>
          </Container>
        </Box>
      )}
      <Container
        sx={{
          backgroundColor: "var(--white)",
          pt: theme.spacing(5),
          pb: theme.spacing(5),
          mt: theme.spacing(5),
          mb: theme.spacing(10),
          borderRadius: 5,
        }}
      >
        <Box
          sx={{
            maxWidth: 500,
            marginInline: "auto",
            mb: theme.spacing(5),
          }}
        >
          <Typography
            variant='caption'
            sx={{
              textTransform: "uppercase",
              color: "var(--grey)",
              fontWeight: "700",
              fontSize: { sm: 12, xs: 11.5 },
              wordBreak: "break-word",
              display: "block",
            }}
          >
            {blog.type}
          </Typography>
          <Typography
            variant='caption'
            sx={{
              textTransform: "uppercase",
              color: "var(--grey)",
              fontWeight: "700",
              fontSize: { sm: 12.5, xs: 11.5 },
              display: "block",
              mb: theme.spacing(1),
            }}
          >
            {blog.date}
          </Typography>
          <Typography
            variant='h3'
            sx={{
              fontWeight: 600,
            }}
          >
            {blog.heading}
          </Typography>
        </Box>

        <Box
          sx={{
            width: "80%",
            maxHeight: "600px",
            marginInline: "auto",
            borderRadius: 3,
            overflow: "hidden",
            mb: theme.spacing(5),
          }}
        >
          <img src={blog.img} alt='blogImg' />
        </Box>

        <Box
          sx={{
            maxWidth: "600px",
            marginInline: "auto",
            overflow: "hidden",
          }}
        >
          <Typography variant='body1' sx={{ mb: theme.spacing(5) }}>
            {blog.body}
          </Typography>
          <Button onClick={handleClick} color='error'>
            Delete Blog
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PerBlog;
