"use client";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import KeyboardArrowLeftOutlinedIcon from "@mui/icons-material/KeyboardArrowLeftOutlined";
import KeyboardArrowRightOutlinedIcon from "@mui/icons-material/KeyboardArrowRightOutlined";
import { Box, IconButton } from "@mui/material";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={`customPrev ${className}`} onClick={onClick}>
      <IconButton>
        <KeyboardArrowRightOutlinedIcon />
      </IconButton>
    </div>
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div className={`customPrev ${className}`} onClick={onClick}>
      <IconButton>
        <KeyboardArrowLeftOutlinedIcon />
      </IconButton>
    </div>
  );
}
const ImageSlider = ({ images }: { images?: string[] }) => {
  var settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <Box
      {...settings}
      component={Slider}
      sx={{
        px: 3,
        "& .customPrev:before": {
          display: "none",
        },
        "& .slick-next": {
          right: "10px",
        },
        "& .slick-slide img": {
          width: "100%",
          height: "auto",
          borderRadius: "10px",
        },
        "& .slick-prev": { left: "-13px" },
        "& .slick-slide": { padding: "5px" },
        "@media (max-width:600px)": {
          "& .slick-next": {
            top: "40%",
          },
          "& .slick-prev": { top: "40%" },
        },
      }}
    >
  
      {images &&
        images.map((link, index) => {
          const newUrl = process.env.NEXT_PUBLIC_BACKEND_IMAGE_URL + link;
          return (
            <div key={index}>
              <Image src={newUrl} width={200} height={200} alt="" />
            </div>
          );
        })}
    </Box>
  );
};
export default ImageSlider;
