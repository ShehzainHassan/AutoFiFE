"use client";
import apiClient from "@/api/apiClient";
import { AuctionDetailsHeader, ButtonPrimary, Loading } from "@/app/components";
import { IOSSwitch } from "@/app/components/buttons/toggle-button/toggle-button";
import { Input } from "@/app/components/input-field";
import CarImage from "@/app/components/result-card/car-image/car-image";
import { CURRENCY } from "@/constants";
import { usePanel } from "@/contexts/panel-context/panel-context";
import { useFormValidation } from "@/hooks/useFormValidation";
import { PAY_BUTTON } from "@/styles/text-container";
import { ThemeProvider } from "@/theme/themeContext";
import { trackError } from "@/utilities/error-tracking";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import AuctionNotificationSettings from "../notifications/notification";
import SavedVehicles from "../saved-vehicles/saved-vehicles";
import StatItem from "../stat-item/stat-item";
import TextContainer from "../text-container/text-container";
import { initialFormValues, validationRules } from "./checkout-validation";
import classes from "./checkout.module.css";
import useAuctionById from "@/hooks/useAuctionById";
import { BLUE_THEME } from "@/constants/button-primary-themes";
import { getUserIdFromLocalStorage } from "@/utilities/utilities";
import useTrackPayment from "@/hooks/useTrackPayment";

export default function AuctionCheckout() {
  const { panel } = usePanel();
  const [savePayment, setSavePayment] = useState(false);
  const [loading, setLoading] = useState(true);
  const [authorized, setAuthorized] = useState(false);

  const { values, errors, handleChange } = useFormValidation(
    initialFormValues,
    validationRules
  );
  const params = useParams();
  const id = params.id ? Number(params.id) : undefined;
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const router = useRouter();
  const hasErrors = Object.values(errors).some((error) => error !== "");
  const { data: auction } = useAuctionById(id ?? -1);
  const trackPayment = useTrackPayment();
  const handleSubmit = () => {
    if (hasErrors || !auction) return;

    const userId = getUserIdFromLocalStorage() ?? -1;
    trackPayment.mutate({
      auctionId: auction.auctionId,
      userId,
      amount: auction.currentPrice + 250,
    });
  };
  useEffect(() => {
    if (!id) return;
    const verifyAccess = async () => {
      try {
        const res = await apiClient.get(
          `${API_BASE_URL}/auction/${id}/checkout`
        );
        if (res.status === 200) {
          setAuthorized(true);
        }
      } catch (err) {
        trackError(err as Error, { source: "accessing checkout page" });
        router.replace("/unauthorized");
      } finally {
        setLoading(false);
      }
    };
    verifyAccess();
  }, [id]);
  if (loading) return <Loading />;
  if (!authorized || !auction) return null;
  return (
    <div className={classes.mainContainer}>
      <AuctionDetailsHeader />
      <div className={classes.container}>
        {panel === "watchlist" && <SavedVehicles />}
        {panel === "notification" && <AuctionNotificationSettings />}

        {panel === "none" && (
          <div className={classes.grid}>
            <div className={classes.bid}>
              <h1 className={classes.title}>Secure Payment Processing</h1>
              <div className={classes.inputs}>
                <div className={classes.inputContainer}>
                  <h3>Payment Method</h3>

                  <Input width="220px">
                    <Input.Label>Credit Card Number</Input.Label>
                    <Input.Field
                      type="text"
                      value={values.cardNumber}
                      placeholder="1234 5678 9012 3456"
                      onChange={handleChange("cardNumber")}
                    />
                    {errors.cardNumber && (
                      <span className={classes.errorText}>
                        {errors.cardNumber}
                      </span>
                    )}
                  </Input>
                </div>

                <div className={classes.gap}>
                  <Input width="100px">
                    <Input.Label>Expiry</Input.Label>
                    <Input.Field
                      type="text"
                      value={values.expiryDate}
                      placeholder="MM/YY"
                      onChange={handleChange("expiryDate")}
                    />
                    {errors.expiryDate && (
                      <span className={classes.errorText}>
                        {errors.expiryDate}
                      </span>
                    )}
                  </Input>

                  <Input width="100px">
                    <Input.Label>CVV</Input.Label>
                    <Input.Field
                      type="text"
                      value={values.cvv}
                      placeholder="123"
                      onChange={handleChange("cvv")}
                    />
                    {errors.cvv && (
                      <span className={classes.errorText}>{errors.cvv}</span>
                    )}
                  </Input>
                </div>

                <div className={classes.pay}>
                  <ThemeProvider value={PAY_BUTTON}>
                    <TextContainer value="PayPal" />
                    <TextContainer value="Google Pay" />
                    <TextContainer value="Apple Pay" />
                  </ThemeProvider>
                </div>

                <div className={classes.inputContainer}>
                  <h3>Billing Address</h3>
                  <Input width="220px">
                    <Input.Label>Address</Input.Label>
                    <Input.Field
                      type="text"
                      value={values.address}
                      placeholder="123 Main St"
                      onChange={handleChange("address")}
                    />
                    {errors.address && (
                      <span className={classes.errorText}>
                        {errors.address}
                      </span>
                    )}
                  </Input>

                  <Input width="400px">
                    <Input.Label>Optional Line</Input.Label>
                    <Input.Field
                      type="text"
                      value={values.addressOptional}
                      placeholder="Apt / Suite"
                      onChange={handleChange("addressOptional")}
                    />
                  </Input>

                  <div className={classes.gap}>
                    <Input width="220px">
                      <Input.Label>City</Input.Label>
                      <Input.Field
                        type="text"
                        value={values.city}
                        onChange={handleChange("city")}
                      />
                      {errors.city && (
                        <span className={classes.errorText}>{errors.city}</span>
                      )}
                    </Input>
                    <Input width="220px">
                      <Input.Label>State</Input.Label>
                      <Input.Field
                        type="text"
                        value={values.state}
                        onChange={handleChange("state")}
                      />
                      {errors.state && (
                        <span className={classes.errorText}>
                          {errors.state}
                        </span>
                      )}
                    </Input>
                  </div>

                  <Input width="220px">
                    <Input.Label>Zip Code</Input.Label>
                    <Input.Field
                      type="text"
                      value={values.zipCode}
                      placeholder="00000"
                      onChange={handleChange("zipCode")}
                    />
                    {errors.zipCode && (
                      <span className={classes.errorText}>
                        {errors.zipCode}
                      </span>
                    )}
                  </Input>

                  <div className={classes.paymentToggle}>
                    <p>Save payment information for future purchases</p>
                    <IOSSwitch
                      checked={savePayment}
                      onChange={(e) => setSavePayment(e.target.checked)}
                    />
                  </div>

                  <div className={classes.security}>
                    <h3>Security</h3>
                    <p>
                      Your payment is processed securely using SSL encryption
                      and industry-standard security measures.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className={classes.bid}>
              <div className={classes.bidInfoContainer}>
                <div className={classes.bidInfo}>
                  <p className={classes.text}>Winning Bid</p>
                  <p className={`${classes.text} ${classes.price}`}>
                    {CURRENCY}
                    {auction.currentPrice.toLocaleString()}
                  </p>
                  <p className={classes.text}>
                    {auction.vehicle.year} {auction.vehicle.make}{" "}
                    {auction.vehicle.model}
                  </p>
                </div>
                <div className={classes.imgWrapper}>
                  <CarImage src="/images/glc_2023.png" />
                </div>
              </div>

              <div className={classes.fees}>
                <StatItem label="Auction Price" value={auction.currentPrice} />
                <StatItem label="Fees" value={250} />
              </div>
              <StatItem label="Taxes" value={250} />

              <div className={classes.total}>
                <p>Total</p>
                <p>
                  {CURRENCY}
                  {(auction.currentPrice + 250).toLocaleString()}
                </p>
              </div>

              <div className={classes.paymentInfo}>
                <p>
                  Payment must be completed within 48 hours of winning the
                  auction. Funds will be held in escrow until the vehicle is
                  delivered and inspected.
                </p>
              </div>
              <ThemeProvider value={BLUE_THEME}>
                <ButtonPrimary
                  onClick={handleSubmit}
                  isDisabled={hasErrors || trackPayment.isPending}
                  btnText="Submit"
                />
              </ThemeProvider>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
