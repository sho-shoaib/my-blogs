import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

const Blogs = () => {
  const theme = useTheme();
  const Xsmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);
  const history = useHistory();

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:8000/blogs");
    const res = await data.json();
    setBlogs(res.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

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
            Blogs
          </Typography>
        </Container>
      </Box>
      <Container
        sx={{
          paddingTop: theme.spacing(5),
          paddingBottom: theme.spacing(5),
          paddingInline: {
            lg: theme.spacing(15),
            md: theme.spacing(12),
            xs: theme.spacing(5),
          },
        }}
      >
        <Typography
          variant={`${Xsmall ? "h5" : "h4"}`}
          sx={{ fontWeight: 600 }}
        >
          Latest blog
        </Typography>

        <Box
          className='container'
          onClick={() => history.push(`/${blogs[0].id}`)}
          sx={{
            backgroundColor: "var(--white)",
            maxWidth: "100%",
            height: 330,
            marginInline: "auto",
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(4),
            borderRadius: 5,
            overflow: "hidden",
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
            cursor: "pointer",
          }}
        >
          <Box
            sx={{
              width: { md: "65%", sm: "50%", xs: "100%" },
              height: { sm: "100%", xs: "60%" },
              backgroundColor: "black",
            }}
          >
            <img src={!loading ? blogs[0].img : null} alt='BlogImage' />
          </Box>
          <Box
            sx={{
              width: { md: "35%", sm: "50%", xs: "100%" },
              height: { sm: "100%", xs: "40%" },
              p: { sm: theme.spacing(4), xs: theme.spacing(2) },
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                color: "var(--grey)",
                fontWeight: "700",
                fontSize: { sm: 12.5, xs: 11.5 },
                wordBreak: "break-word",
              }}
            >
              {!loading && blogs[0].type}
            </Typography>
            <Typography
              variant={`${Xsmall ? "h6" : "h4"}`}
              gutterBottom
              sx={{
                fontWeight: "600",
                height: "90%",
                overflow: { sm: "auto", xs: "hidden" },
                lineHeight: { sm: 1.4, xs: 1.2 },
              }}
            >
              {!loading && blogs[0].heading}
            </Typography>
            <Typography
              variant='caption'
              sx={{
                textTransform: "uppercase",
                color: "var(--grey)",
                fontWeight: "700",
                fontSize: { sm: 15, xs: 13 },
              }}
            >
              {!loading && blogs[0].date}
            </Typography>
          </Box>
        </Box>

        <Grid
          container
          width='100%'
          justifyContent='center'
          spacing={2}
          sx={{ transform: "translateX(9px)" }}
        >
          {!loading &&
            blogs.slice(1).map((data) => {
              const { img, type, heading, date, id } = data;
              return (
                <Grid key={id} item xs={12} sm={8} md={6}>
                  <Box
                    className='container'
                    onClick={() => history.push(`/${id}`)}
                    sx={{
                      backgroundColor: "var(--white)",
                      height: 330,
                      borderRadius: 5,
                      overflow: "hidden",
                      cursor: "pointer",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "60%",
                        backgroundColor: "black",
                      }}
                    >
                      <img src={img} alt='BlogImage' />
                    </Box>
                    <Box
                      sx={{
                        width: "100%",
                        height: "40%",
                        p: theme.spacing(2),
                        display: "flex",
                        flexDirection: "column",
                      }}
                    >
                      <Typography
                        variant='caption'
                        sx={{
                          textTransform: "uppercase",
                          color: "var(--grey)",
                          fontWeight: "700",
                          fontSize: 11.5,
                          wordBreak: "break-word",
                        }}
                      >
                        {type}
                      </Typography>
                      <Typography
                        variant={`${Xsmall ? "h6" : "h5"}`}
                        gutterBottom
                        sx={{
                          fontWeight: "600",
                          height: "90%",
                          overflow: "hidden",
                          lineHeight: 1.3,
                        }}
                      >
                        {heading}
                      </Typography>
                      <Typography
                        variant='caption'
                        sx={{
                          textTransform: "uppercase",
                          color: "var(--grey)",
                          fontWeight: "700",
                          fontSize: 13,
                        }}
                      >
                        {date}
                      </Typography>
                    </Box>
                  </Box>
                </Grid>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};

export default Blogs;
