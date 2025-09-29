"use client";

import dynamic from "next/dynamic";
import { Suspense, useState } from "react";
import CarImage from "../result-card/car-image/car-image";
import classes from "./vehicle-image-gallery.module.css";
import { CarImageGalleryProps } from "./vehicle-image-gallery.types";
import { ButtonNavigate } from "@/app/components";

const CarImages = dynamic(() => import("../car-images/car-images"));
const HandleShare = dynamic(() => import("../handle-share/handle-share"));
const HandleLikeContainer = dynamic(() => import("../handle-like/handle-like"));

export default function CarImageGallery({ vehicle }: CarImageGalleryProps) {
  const images = [
    "/images/glc_2023.png",
    "/images/atlis_2023.png",
    "/images/audi_a6_3.5.png",
    "/images/BMW-X6-Card.png",
    "/images/BMW-X5-Card.png",
    "/images/BMW-Card.png",
    "/images/ford_explorer_2023.png",
  ];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  return (
    <div className={classes.imgContainer}>
      <CarImage src={images[currentIndex]}>
        <Suspense
          fallback={<div className={classes.spinner}>Loading gallery...</div>}>
          <HandleShare />
          <HandleLikeContainer vehicle={vehicle} />
        </Suspense>
      </CarImage>

      <Suspense
        fallback={<div className={classes.spinner}>Loading gallery...</div>}>
        <div className={classes.allImagesContainer}>
          <ButtonNavigate
            type="prev"
            className={classes.navigate}
            onClick={handlePrev}
          />

          <div className={classes.carImages}>
            {images.map((image, index) => (
              <CarImages
                key={index}
                imgSrc={image}
                selected={index === currentIndex}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>

          <ButtonNavigate
            type="next"
            className={classes.navigate}
            onClick={handleNext}
          />
          <div className={classes.imageCount}>
            {currentIndex + 1} / {images.length}
          </div>
        </div>
      </Suspense>
    </div>
  );
}
