"use client";
import { Input } from "@/app/components/input-field";
import CarImage from "@/app/components/result-card/car-image/car-image";
import { CURRENCY } from "@/constants";
import { usePanel } from "@/contexts/panel-context/panel-context";
import { useState } from "react";
import AuctionDetailsHeader from "../auction-details-header/auction-details-header";
import SavedVehicles from "../saved-vehicles/saved-vehicles";
import StatItem from "../stat-item/stat-item";
import classes from "./checkout.module.css";
import AuctionNotificationSettings from "../notifications/notification";
import TextContainer from "../text-container/text-container";
import { ThemeProvider } from "@/theme/themeContext";
import { PAY_BUTTON } from "@/styles/text-container";
import { FormControlLabel, Switch } from "@mui/material";
export default function AuctionCheckout() {
  const [creditCardNumber, setCreditCardNumber] = useState("");
  const { panel } = usePanel();
  const [checked, setChecked] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
  };
  return (
    <div className={classes.container}>
      <AuctionDetailsHeader />
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
                    placeholder="Enter your credit card number"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                  />
                </Input>
              </div>
              <div>
                <Input width="220px">
                  <Input.Label>Credit Card Number</Input.Label>
                  <div className={classes.gap}>
                    <Input.Field
                      type="text"
                      placeholder="Enter your credit card number"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                    />
                    <Input.Field
                      type="text"
                      placeholder="Enter your credit card number"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                    />
                  </div>
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
                    placeholder="Enter your credit card number"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                  />
                </Input>
                <Input width="400px">
                  <Input.Label>
                    Apt, suite, unit, building, floor, etc. (optional)
                  </Input.Label>
                  <Input.Field
                    type="text"
                    placeholder="Enter your credit card number"
                    value={creditCardNumber}
                    onChange={(e) => setCreditCardNumber(e.target.value)}
                  />
                </Input>
                <div className={classes.gap}>
                  <Input width="220px">
                    <Input.Label>City</Input.Label>
                    <Input.Field
                      type="text"
                      placeholder="Enter your credit card number"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                    />
                  </Input>
                  <Input width="220px">
                    <Input.Label>State</Input.Label>
                    <Input.Field
                      type="text"
                      placeholder="Enter your credit card number"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                    />
                  </Input>
                </div>
                <div>
                  <Input width="220px">
                    <Input.Label>Zip Code</Input.Label>
                    <Input.Field
                      type="text"
                      placeholder="Enter your credit card number"
                      value={creditCardNumber}
                      onChange={(e) => setCreditCardNumber(e.target.value)}
                    />
                  </Input>
                </div>
                <div className={classes.paymentToggle}>
                  <p>Save payment information for future purchases</p>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={checked}
                        onChange={handleChange}
                        sx={{
                          "& .MuiSwitch-switchBase.Mui-checked": {
                            color: "var(--color-green600)",
                          },
                          "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track":
                            {
                              backgroundColor: "var(--color-green600)",
                            },
                          "& .MuiSwitch-thumb": {
                            boxShadow: "0 0 2px rgba(0,0,0,0.2)",
                          },
                        }}
                      />
                    }
                    label=""
                  />
                </div>
                <div className={classes.security}>
                  <h3>Security</h3>
                  <p>
                    Your payment is processed securely using SSL encryption and
                    industry-standard security measures.
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
                  {CURRENCY}24,500
                </p>
                <p className={classes.text}>2021 Ford F-150</p>
              </div>
              <div className={classes.imgWrapper}>
                <CarImage src="/images/glc_2023.png" />
              </div>
            </div>
            <div className={classes.fees}>
              <StatItem label="Auction Price" value={24000} />
              <StatItem label="Fees" value={250} />
            </div>
            <StatItem label="Taxes" value={250} />
            <div className={classes.total}>
              <p>Total</p>
              <p>{CURRENCY}24,500</p>
            </div>
            <div className={classes.paymentInfo}>
              <p>
                Payment must be completed within 48 hours of winning the
                auction. Funds will be held in escrow until the vehicle is
                delivered and inspected.
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
