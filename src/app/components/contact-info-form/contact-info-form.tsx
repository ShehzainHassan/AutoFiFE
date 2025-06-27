"use client";
import { VEHICLE_OPTIONS } from "@/constants";
import useSubmitInfo from "@/hooks/useSubmitInfo";
import useTracking from "@/hooks/useTracking";
import useVehiclesById from "@/hooks/useVehicleById";
import { contactDropdownStyle } from "@/styles/custom-select";
import {
  getNameFromLocalStorage,
  getUserEmailFromLocalStorage,
} from "@/utilities/utilities";
import { Checkbox, CircularProgress, FormControlLabel } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import { Dropdown } from "../dropdown";
import ErrorSummary from "../error-summary/error-summary";
import AddComment from "./add-comment/add-comment";
import classes from "./contact-info-form.module.css";
import { ContactInfoFormProps } from "./contact-info-form.types";
import InputEmail from "./input-email/input-email";
import InputFirstName from "./input-firstname/firstname";
import InputLastName from "./input-lastname/input-lastname";
import InputPhone from "./input-phone/input-phone";
import InputPostCode from "./input-postcode/input-postcode";
import PreferredChoice from "./preferred-choice/preferred-choice";
import PrivacyAgreementText from "./privacy-agreement-text/privacy-agreement-text";

export default function Form({ carId, className }: ContactInfoFormProps) {
  const params = useParams();
  const idParam = params.id;
  const id = idParam ? Number(idParam) : carId;
  const { data: vehicle } = useVehiclesById(id as number);
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const year = vehicle?.year ?? "";
  const { mutate: submitInfo, isPending } = useSubmitInfo();
  const { firstName, lastName } = getNameFromLocalStorage();
  const [fname, setFname] = useState(firstName);
  const [lname, setLname] = useState(lastName);
  const [selected, setSelected] = useState("interested");
  const [postCode, setPostCode] = useState("");
  const [email, setEmail] = useState(getUserEmailFromLocalStorage());
  const [phone, setPhone] = useState("");
  const [commentText, setCommentText] = useState("");
  const [preferredContact, setPreferredContact] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(event.target.checked);
  };
  const err = "";

  const DropdownOptions = () => {
    return (
      <Dropdown
        className={classes.dropdown}
        value={selected}
        onChange={(value) => {
          setSelected(value);
        }}>
        <Dropdown.Select
          options={VEHICLE_OPTIONS}
          styles={contactDropdownStyle}
        />
      </Dropdown>
    );
  };

  const canSendMessage = () => {
    return (
      fname !== "" &&
      lname !== "" &&
      email !== "" &&
      postCode !== "" &&
      phone !== "" &&
      preferredContact !== "" &&
      Object.values(errors).every((err) => err === "")
    );
  };

  const resetFields = () => {
    setFname("");
    setLname("");
    setSelected("interested");
    setPostCode("");
    setEmail("");
    setPhone("");
    setPreferredContact("");
    setCommentText("");
    setEmailNotifications(false);
  };
  const addInteraction = useTracking();
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = {
      fname,
      lname,
      selected,
      postcode: postCode,
      email,
      phone,
      vehicleName: `${year} ${make} ${model}`,
      preferredContact,
      commentText,
      emailNotifs: emailNotifications,
    };

    submitInfo(formData);
    addInteraction.mutate({
      vehicleId: (id ?? carId) as number,
      interactionType: "contacted-seller",
    });

    resetFields();
  };
  return (
    <form className={`${classes.form} ${className}`} onSubmit={handleSubmit}>
      {!carId && (
        <div className={classes.infoHeader}>
          <h1 className={classes.header}>Request information</h1>
          <p className={classes.contact}>020 3984 7581</p>
        </div>
      )}
      <div className={classes.formContent}>
        <p>Hello, my name is</p>
        <InputFirstName
          fname={fname}
          setFname={setFname}
          errors={errors}
          setErrors={setErrors}
          err={err}
        />
        <InputLastName
          lname={lname}
          setLname={setLname}
          errors={errors}
          setErrors={setErrors}
          err={err}
        />
        <p>and</p>
        <DropdownOptions />
        <p className={classes.bold}>{vehicle?.year}</p>
        <span className={classes.bold}>
          {vehicle?.make} {vehicle?.model}
        </span>
        <p>I&#39;m in the </p>
        <InputPostCode
          postCode={postCode}
          setPostCode={setPostCode}
          errors={errors}
          setErrors={setErrors}
          err={err}
        />
        <div>area. You can reach me by email at</div>
        <InputEmail
          email={email}
          setEmail={setEmail}
          errors={errors}
          setErrors={setErrors}
          err={err}
        />
        <p>or by phone at </p>
        <InputPhone
          phone={phone}
          setPhone={setPhone}
          errors={errors}
          setErrors={setErrors}
          err={err}
        />
        <p>. Thank you!</p>
      </div>
      <PreferredChoice
        preferredContact={preferredContact}
        setPreferredContact={setPreferredContact}
      />
      <AddComment commentText={commentText} setCommentText={setCommentText} />
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={emailNotifications} onChange={handleChange} />
          }
          label="Email me new results for my search"
        />
      </div>
      <ErrorSummary errors={errors} />

      {isPending ? (
        <div>
          <CircularProgress className={classes.loading} />
        </div>
      ) : (
        <button
          disabled={!canSendMessage()}
          className={`${classes.marginTop} ${classes.submitBtn}`}
          type="submit">
          Send Message
        </button>
      )}
      <PrivacyAgreementText />
    </form>
  );
}
