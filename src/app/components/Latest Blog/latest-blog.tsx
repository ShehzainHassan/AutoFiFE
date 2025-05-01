import BlogCard from "../Blog Card/blog-card";
import CarCard from "../Car Card/car-card";
import SectionTitle from "../Section Title/section-title";
import Wrapper from "../Wrapper/wrapper";
import classes from "./latest.blog.module.css";
export default function LatestBlog() {
  return (
    <div className={classes.blog}>
      <SectionTitle title="Latest Blog Posts" buttonText="View All" />
      <Wrapper>
        <div className={classes.blogCards}>
          <BlogCard
            imgSrc="/images/BMW-Card.png"
            description="2024 BMW ALPINA XB7 with exclusive details, extraordinary"
          />
          <BlogCard
            imgSrc="/images/BMW-X6-Card.png"
            description="BMW X6 M50i is designed to exceed your sportiest"
            tag="Accessories"
          />
          <BlogCard
            imgSrc="/images/BMW-X5-Card.png"
            description="BMW X5 Gold 2024 Sport Review: Light on Sport"
            tag="Exterior"
          />
        </div>
      </Wrapper>
      <Wrapper>
        <div className={classes.cardContainer}>
          <CarCard
            title="Are You Looking For a Car"
            description="We are committed to providing our customers with exceptional service."
          />
          <CarCard
            title="Do You Want to Sell a Car"
            description="We are committed to providing our customers with exceptional service."
            backgroundColor="var(--color-pink100)"
            buttonColor="var(--color-black100)"
            imgSrc="/images/sell.png"
          />
        </div>
      </Wrapper>
    </div>
  );
}
