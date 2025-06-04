export type HorizontalCardProps = {
  id: number;
  imgSrc: string;
  carDetails: string;
  carDescription: string;
  miles: string;
  fuelType: string;
  gearType: string;
  price: number;
  tag?: string;
  tagColor?: string;
  btnText?: string;
  showPreviousPrice?: boolean;
};