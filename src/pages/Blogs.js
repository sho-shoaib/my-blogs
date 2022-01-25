import { Container, Grid, Typography, useMediaQuery } from "@mui/material";
import { Box } from "@mui/system";
import { useTheme } from "@mui/material/styles";
import HourglassTopIcon from "@mui/icons-material/HourglassTop";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const dummydata = [
  {
    img: "https://images.unsplash.com/photo-1604537466158-719b1972feb8?ixlib=rb-1.2.1&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2069&q=80",
    type: "fun",
    heading: "I went to boating, it was fun",
    date: Date().toString().slice(4, 15),
    body: "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Vel explicabo corrupti fugit dolore. Molestiae non perferendis hic impedit veritatis molestias dolore harum vero velit! Corrupti sed vero est voluptatibus accusamus!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Qui, culpa. Totam libero suscipit, necessitatibus nobis excepturi id hic explicabo sint illo quibusdam officia molestias saepe iste temporibus autem cumque qui!\nLorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi minus pariatur adipisci praesentium quia vero non in dolore ab quos corrupti sint tempore reprehenderit tenetur minima, dignissimos magnam excepturi fugiat?",
  },
  {
    img: "https://images.unsplash.com/photo-1493836512294-502baa1986e2?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1190&q=80",
    type: "serious",
    heading: "What is mid-life crisis",
    date: Date().toString().slice(4, 15),
    body: "The Merriam-Webster dictionary defines a midlife crisis as, 'A period of emotional turmoil in middle age characterized especially by a strong desire for change.'\nPeople respond to a midlife crisis in different ways, but it typically involves a change in the way that they act and feel, and in their attitude to life. It can happen at any time and can last for several years.\nThe phrase that you choose to describe it is less important than your strategy for coping with it. But it's worth pausing to think about whether a transition needs to be a 'crisis,' or if it's simply part of coming to terms with a change in your life.\nPsychologists define midlife as the years between 30 and 70, with 40 to 60 at its core. And with almost 105 million people aged between 35 and 59 in the U.S. in 2018, huge numbers of both men and women will likely experience a midlife crisis.\nThe link between midlife and unhappiness is backed up by research published in January 2020 by the National Bureau of Economic Research. The NBER study suggests that 'middle age misery' peaks at age 47.2.",
  },
  {
    img: "https://images.unsplash.com/photo-1642841220705-b03194dd9de7?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80",
    type: "travel",
    heading: "Went to climb Mt everest",
    date: Date().toString().slice(4, 15),
    body: "Our climb to the summit of Mount Everest is for reasonably experienced climbers and provides experienced Sherpa support, supplemental oxygen, base camp and high camp equipment and logistics. Our aim is to provide a safe and enjoyable mountain experience for those people who are ready to climb Mount Everest.\nWe have run expeditions to both the north and south sides of the mountain, and we have a solid team of experienced climbing Sherpas and base camp staff. Our Nepalese operator is a family run business called Adventure Alternative Nepal registered with the NMA and with TAAN. We have spent years investing in mountaineering training for the Sherpa mountain staff, plus we provide medical insurance and helicopter cover as standard for them (as per the latest recommendations from the Nepal Mountaineering Association).\nThe ratio of Sherpa to climbing member is always 1:1, and the ratio of western guide (if there is one) to climbing member is 1:3. The acclimatisation plan is a tried and tested regime which has the flexibility to accommodate the expected bad weather periods and many variables that affect any summit attempt on an 8000 metre mountain. We can offer Island Peak as an optional obvious warm up, plus Lobuche as a slightly harder option for an additional fee.\nThe summit cycle is preceded by several trips to sleep at Camp 2 but bottled oxygen is used first when sleeping at Camp 3. Clearly the objective danger of the Icefall and avalanche risk at Camp 1 cannot be avoided, but it can be mitigated by operating safe rules of travelling at night and using fixed lines correctly.",
  },
];

const Blogs = () => {
  const theme = useTheme();
  const Xsmall = useMediaQuery(theme.breakpoints.down("sm"));
  const [blogs, setBlogs] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    const data = await fetch("http://localhost:8000/blogs");
    const res = await data.json();
    setBlogs(res.reverse());
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
    console.log(blogs);
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
          sx={{
            backgroundColor: "var(--white)",
            maxWidth: "100%",
            height: 350,
            marginInline: "auto",
            marginTop: theme.spacing(3),
            marginBottom: theme.spacing(4),
            borderRadius: 5,
            overflow: "hidden",
            display: "flex",
            flexDirection: { sm: "row", xs: "column" },
          }}
        >
          <Box
            sx={{
              width: { md: "65%", sm: "50%", xs: "100%" },
              height: { sm: "100%", xs: "60%" },
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
              variant={`${Xsmall ? "h5" : "h4"}`}
              gutterBottom
              sx={{
                fontWeight: "600",
                height: "90%",
                overflow: { sm: "auto", xs: "hidden" },
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
              const { img, type, heading, date } = data;
              return (
                <Grid key={uuidv4()} item xs={12} sm={8} md={6}>
                  <Box
                    sx={{
                      backgroundColor: "var(--white)",
                      height: 330,
                      borderRadius: 5,
                      overflow: "hidden",
                    }}
                  >
                    <Box
                      sx={{
                        width: "100%",
                        height: "60%",
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
                        variant='h5'
                        gutterBottom
                        sx={{
                          fontWeight: "600",
                          height: "90%",
                          overflow: "hidden",
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
