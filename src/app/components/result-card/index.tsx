import { CURRENCY } from "@/constants";
import { WHITE_THEME } from "@/constants/button-primary-themes";
import { useUserFavorites } from "@/contexts/userFavoritesContext";
import useAddUserLike from "@/hooks/useAddUserLike";
import useDeleteUserLike from "@/hooks/useDeleteUserLike";
import headings from "@/styles/typography.module.css";
import { ThemeProvider } from "@/theme/themeContext";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { FC, useState } from "react";
import { toast } from "react-toastify";
import ButtonPrimary from "../buttons/Primary";
import classes from "./result-card.module.css";

type ResultCardProps = {
  id: number;
  specialText?: string;
  carImg: string;
  miles: number;
  price: number;
  carTitle: string;
  vin: string;
};

export default function ResultCard({
  id,
  specialText,
  carImg,
  miles,
  price,
  carTitle,
  vin,
}: ResultCardProps) {
  return (
    <div className={classes.container}>
      <CarImage src={carImg} vin={vin} />
      <CarDetails
        id={id}
        specialText={specialText}
        carTitle={carTitle}
        miles={miles}
        price={price}
      />
    </div>
  );
}
type CarImageProps = {
  src: string;
  vin: string;
};
const CarImage = ({ src, vin }: CarImageProps) => {
  const { userLikes } = useUserFavorites();
  const [isLiked, setIsLiked] = useState(userLikes.includes(vin));
  const addLikeMutation = useAddUserLike();
  const deleteLikeMutation = useDeleteUserLike();
  const authData = localStorage.getItem("authData") ?? "";
  const userId = getUserIdFromLocalStorage() ?? -1;
  const handleLike = async () => {
    if (!authData) {
      toast.error("Please sign in to like a vehicle");
      return;
    }
    try {
      if (!isLiked) {
        await addLikeMutation.mutateAsync({ userId, vin });
      } else {
        await deleteLikeMutation.mutateAsync({ userId, vin });
      }
      setIsLiked(!isLiked);
    } catch {
      toast.error("Something went wrong. Please try again.");
    }
  };
  return (
    <div className={classes.carImg}>
      <Image
        src={src}
        alt="car-img"
        width={360}
        height={200}
        className={classes.car}
      />
      <div className={classes.imgContainer} onClick={handleLike}>
        {isLiked ? <FavoriteIcon /> : <FavoriteBorderIcon />}
      </div>
    </div>
  );
};

type CarDetailsProps = {
  id: number;
  specialText?: string;
  miles: number;
  price: number;
  carTitle: string;
};
const CarDetails = ({
  id,
  carTitle,
  specialText,
  miles,
  price,
}: CarDetailsProps) => (
  <div className={classes.carDetails}>
    <CardHeader {...{ id, specialText, carTitle, miles, price }} />

    <div className={classes.cardMiddle}>
      <PartnerInfo />
      <EstimatedMonthly />
    </div>

    <Rating />
    <Features />
    <Contact />
    <CardBottom />
  </div>
);

const CardHeader: FC<
  Pick<ResultCardProps, "id" | "specialText" | "carTitle" | "miles" | "price">
> = ({ id, specialText, carTitle, miles, price }) => {
  const router = useRouter();

  const handleTitleClick = () => {
    router.push(`/cars/${id}`);
  };

  return (
    <>
      <div className={classes.cardTop}>
        {specialText && <p className={headings.smallText}>{specialText}</p>}
        <h1
          className={`${headings.carTitle} ${classes.clickableTitle}`}
          onClick={handleTitleClick}>
          {carTitle}
        </h1>
      </div>
      <div className={classes.distancePrice}>
        <p className={headings.mileage}>{miles.toLocaleString()} mi</p>
        <p className={headings.resultCardPrice}>
          {CURRENCY}
          {price.toLocaleString()}
        </p>
      </div>
    </>
  );
};

const PartnerInfo = () => (
  <div className={classes.partner}>
    <Image src="/images/partner.png" alt="partner" width={16} height={16} />
    <p className={headings.carTitle}>CarGurus partner</p>
  </div>
);

const EstimatedMonthly = () => (
  <div className={`${classes.perMonth} ${headings.smallText}`}>
    <p>Est. $388/mo</p>
    <div className={classes.circle}>i</div>
  </div>
);

const Rating = () => (
  <div className={classes.rating}>
    <p className={headings.noRatings}>No rating</p>
  </div>
);

const Features = () => (
  <div className={`${classes.features} ${headings.smallText}`}>
    <p>Leather seats</p>
    <p>.</p>
    <p>Alloy wheels</p>
  </div>
);

const Contact = () => (
  <div className={classes.contact}>
    <p className={`${headings.contact} ${classes.blue}`}>01622 237423</p>
    <ThemeProvider value={WHITE_THEME}>
      <ButtonPrimary btnText="Request info" />
    </ThemeProvider>
  </div>
);

const CardBottom = () => (
  <div className={classes.cardBottom}>
    <p>Tonbridge</p>
    <Image src="/images/more.png" alt="more" width={4} height={14} />
  </div>
);
