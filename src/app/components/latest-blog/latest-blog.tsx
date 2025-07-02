import useTranslation from "@/i18n";
import { BlogCard } from "@/app/components";
import { BuySellCard } from "@/app/components";
import EmptyState from "../empty-state/empty-state";
import SectionTitle from "../section-title/section-title";
import classes from "./latest.blog.module.css";
export default function LatestBlog() {
  const { t } = useTranslation();
  const blogs = t("latest_blog.blog");
  const cards = t("latest_blog.car_cards");
  return (
    <div className={classes.blog}>
      <SectionTitle title="Latest Blog Posts" buttonText="View All" />
      <div className={classes.blogCards}>
        {Array.isArray(blogs) && blogs.length > 0 ? (
          blogs.map((blog) => (
            <BlogCard
              key={blog.id}
              imgSrc={blog.imgSrc}
              description={blog.description}
              tag={blog.tag}
            />
          ))
        ) : (
          <>
            <EmptyState message="No blogs found" />
          </>
        )}
      </div>
      <div className={classes.cardContainer}>
        {Array.isArray(cards) &&
          blogs.length > 0 &&
          cards.map((card) => (
            <BuySellCard
              key={card.id}
              imgSrc={card.imgSrc}
              title={card.title}
              type={card.type}
              description={card.description}
            />
          ))}
      </div>
      <div className={classes.round}></div>
    </div>
  );
}
