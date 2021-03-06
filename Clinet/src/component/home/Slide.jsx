import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import {
  makeStyles,
  Box,
  Typography,
  Button,
  Divider,
} from "@material-ui/core";
import Countdown from "react-countdown";
import {Link} from "react-router-dom"

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const useStyle = makeStyles({
  component: {
    marginTop: 12,
    backgroundColor: "#ffffff",
  },
  deal: {
    padding: "15px 20px",
    display: "flex",
  },
  dealText: {
    fontSize: 22,
    fontWeight: 600,
    lineHeight: "32px",
    marginRight: 25,
  },
  timer: {
    Color: "#7f7f7f",
    marginLeft: 10,
    display: "flex",
    alignItems: "center",
  },
  text: {
    fontSize: 14,
    marginTop: 5,
  },
  button: {
    marginLeft: "auto",
    backgroundColor: "#2874f0",
    borderRadius: 2,
    fontSize: 13,
  },
  image: {
    height: 150,
  },
  wrapper: {
    padding: "35px 15px",
  },
});

const Slide = ({ timer, title, products }) => {
  const classes = useStyle();
  const renderer = ({ hours, minutes, seconds }) => {
    return (
      <span className={classes.timer}>
        {hours}:{minutes}:{seconds} Left{" "}
      </span>
    );
  };
  const timerURL =
    "https://static-assets-web.flixcart.com/www/linchpin/fk-cp-zion/img/timer_a73398.svg";

  return (
    
    <Box className={classes.component}>
      
      <Box className={classes.deal}>
        <Typography className={classes.dealText}> {title} </Typography>
        {timer && (
          <>
            <img src={timerURL} alt="" style={{ width: 24 }} />
            <Countdown date={Date.now() + 5.04e7} renderer={renderer} />
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
            >
              View All
            </Button>
          </>
        )}
      </Box>
      
      <Divider />
      
      <Carousel
        responsive={responsive}
        infinite={true}
        draggable={false}
        swipeable={false}
        centerMode={true}
        autoplay={true}
        autoPlaySpeed={10000}
        keyBoardControl={true}
        showDots={false}
        removeArrowOnDeviceType={["mobile", "tablet"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        containerClass="carousel-container"
      >
        {products.map((product) => (
        <Link to  = {`product/${product.id}`}> 
        <Box textAlign="center" className={classes.wrapper}>
             <img src={product.url} className={classes.image} alt="" />
            <Typography
              className={classes.text}
              style={{ fontWeight: 600, color: "#212121" }}
            >
              {product.title.shortTitle}
              
            </Typography>
            <Typography className={classes.text} style={{ color: "green" }}>
              {product.discount}{" "}
            </Typography>
            <Typography
              className={classes.text}
              style={{ color: "#212121", opacity: ".6" }}
            >
              {product.tagline}{" "}
            </Typography>
          </Box>
        </Link>
        ))}
      </Carousel>
    </Box>
  );
};

export default Slide;
