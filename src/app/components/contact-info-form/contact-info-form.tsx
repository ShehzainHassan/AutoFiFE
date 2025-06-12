"use client";
import useSubmitInfo from "@/hooks/useSubmitInfo";
import useVehiclesById from "@/hooks/useVehicleById";
import { contactDropdownStyle } from "@/styles/custom-select";
import { Checkbox, FormControl, FormControlLabel } from "@mui/material";
import { useParams } from "next/navigation";
import { useState } from "react";
import Input from "../input-field/input-field";
import classes from "./contact-info-form.module.css";
import { VEHICLE_OPTIONS } from "@/constants";
import {
  getNameFromLocalStorage,
  getUserEmailFromLocalStorage,
  validateEmail,
  validateName,
  validatePhoneNumber,
  validatePostCode,
} from "@/utilities/utilities";
import {
  CommentProps,
  EmailProps,
  FirstNameProps,
  LastNameProps,
  PhoneProps,
  PostCodeProps,
} from "./contact-info-form.types";
import ButtonPrimary from "../buttons/button-primary/button-primary";
import { Dropdown } from "../dropdown";
import LoadingSpinner from "../loading-spinner/loading-spinner";

export default function Form() {
  const params = useParams();
  const idParam = params.id;
  const id = idParam ? Number(idParam) : undefined;
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
  const [preferredContact, setPreferredContact] = useState("");
  const [commentText, setCommentText] = useState("");
  const [showComment, setShowComment] = useState(false);

  const [emailNotifications, setEmailNotifications] = useState(false);

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(event.target.checked);
  };
  let err = "";
  const InputFirstName = ({
    fname,
    setFname,
    errors,
    setErrors,
  }: FirstNameProps) => {
    const [localFname, setLocalFname] = useState(fname);

    const validate = (value: string) => {
      err = validateName(value, "First name");
      setErrors((prev) => ({ ...prev, fname: err }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setFname(value);
      validate(value);
    };

    return (
      <Input width="160px">
        <Input.Field
          placeholder="First name"
          value={localFname}
          onChange={(e) => setLocalFname(e.target.value)}
          onBlur={handleBlur}
          className={errors.fname ? classes.error : undefined}
        />
      </Input>
    );
  };

  const InputLastName = ({
    lname,
    setLname,
    errors,
    setErrors,
  }: LastNameProps) => {
    const [localLname, setLocalLname] = useState(lname);
    const validate = (value: string) => {
      err = validateName(value, "Last name", false);
      setErrors((prev) => ({ ...prev, lname: err }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setLname(value);
      validate(value);
    };

    return (
      <div>
        <Input width="160px">
          <Input.Field
            placeholder="Last name"
            value={localLname}
            onChange={(e) => setLocalLname(e.target.value)}
            onBlur={handleBlur}
            className={errors.lname ? classes.error : undefined}
          />
        </Input>
      </div>
    );
  };

  const InputPostCode = ({
    postCode,
    setPostCode,
    errors,
    setErrors,
  }: PostCodeProps) => {
    const [localPostCode, setLocalPostCode] = useState(postCode);
    const validate = (value: string) => {
      err = validatePostCode(value);
      setErrors((prev) => ({ ...prev, postcode: err }));
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPostCode(value);
      validate(value);
    };
    return (
      <Input width="110px">
        <Input.Field
          placeholder="54000"
          value={localPostCode}
          onChange={(e) => setLocalPostCode(e.target.value)}
          onBlur={handleBlur}
          className={errors.postcode ? classes.error : undefined}
        />
      </Input>
    );
  };
  const InputEmail = ({ email, setEmail, errors, setErrors }: EmailProps) => {
    const [localEmail, setLocalEmail] = useState(email);
    const validate = (value: string) => {
      err = validateEmail(value);
      setErrors((prev) => ({ ...prev, email: err }));
    };
    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setEmail(value);
      validate(value);
    };
    return (
      <Input width="310px">
        <Input.Field
          type="email"
          placeholder="Email address"
          value={localEmail}
          onChange={(e) => setLocalEmail(e.target.value)}
          onBlur={handleBlur}
          className={errors.email ? classes.error : undefined}
        />
      </Input>
    );
  };
  const InputPhone = ({ phone, setPhone, errors, setErrors }: PhoneProps) => {
    const [localPhone, setLocalPhone] = useState(phone);
    const validate = (value: string) => {
      err = validatePhoneNumber(value);
      setErrors((prev) => ({ ...prev, phone: err }));
    };

    const handleBlur = (e: React.FocusEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setPhone(value);
      validate(value);
    };
    return (
      <Input width="200px">
        <Input.Field
          placeholder="0770 000 000"
          value={localPhone}
          onChange={(e) => setLocalPhone(e.target.value)}
          onBlur={handleBlur}
          className={errors.phone ? classes.error : undefined}
        />
      </Input>
    );
  };
  const AddComment = ({ commentText, setCommentText }: CommentProps) => {
    const [localCommentText, setLocalCommentText] = useState(commentText);
    const handleCancelComment = () => {
      setShowComment(false);
      setLocalCommentText("");
      setCommentText("");
    };
    return (
      <div>
        {!showComment ? (
          <ButtonPrimary
            imgSrc="/images/add.png"
            btnText="Add comments"
            className={classes.addComment}
            onClick={() => setShowComment(true)}
          />
        ) : (
          <div className={classes.commentBoxContainer}>
            <textarea
              className={classes.commentBox}
              placeholder="Enter comment"
              rows={10}
              cols={5}
              value={localCommentText}
              onChange={(e) => setLocalCommentText(e.target.value)}
            />
            <ButtonPrimary
              className={classes.cancelCommentBtn}
              btnText="Cancel"
              onClick={handleCancelComment}
            />
          </div>
        )}
      </div>
    );
  };

  const PreferredChoice = () => {
    const handleCheckboxChange = (option: string) => {
      setPreferredContact((prev) => (prev === option ? "" : option));
    };

    return (
      <FormControl component="fieldset" className={classes.options}>
        <p>I prefer:</p>
        <FormControlLabel
          control={
            <Checkbox
              checked={preferredContact === "Call"}
              onChange={() => handleCheckboxChange("Call")}
            />
          }
          label="Call"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferredContact === "Text"}
              onChange={() => handleCheckboxChange("Text")}
            />
          }
          label="Text"
        />
        <FormControlLabel
          control={
            <Checkbox
              checked={preferredContact === "Email"}
              onChange={() => handleCheckboxChange("Email")}
            />
          }
          label="Email"
        />
      </FormControl>
    );
  };
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
    resetFields();
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.infoHeader}>
        <h1 className={classes.header}>Request information</h1>
        <p className={classes.contact}>020 3984 7581</p>
      </div>
      <div>
        <div className={classes.line}>
          <p>Hello, my name is</p>
          <InputFirstName
            fname={fname}
            setFname={setFname}
            errors={errors}
            setErrors={setErrors}
          />
        </div>
        <div className={classes.line}>
          <InputLastName
            lname={lname}
            setLname={setLname}
            errors={errors}
            setErrors={setErrors}
          />
          <p>and</p>
          <DropdownOptions />
          <p className={classes.bold}>{vehicle?.year}</p>
        </div>
        <div className={classes.line}>
          <span className={classes.bold}>
            {vehicle?.make} {vehicle?.model}
          </span>
          <p>I&#39;m in the </p>
          <InputPostCode
            postCode={postCode}
            setPostCode={setPostCode}
            errors={errors}
            setErrors={setErrors}
          />
          <div>area. You can</div>
        </div>
        <div>reach me by email at</div>
        <div className={classes.line}>
          <InputEmail
            email={email}
            setEmail={setEmail}
            errors={errors}
            setErrors={setErrors}
          />
          <p>or by phone at </p>
        </div>
        <div className={classes.line}>
          <InputPhone
            phone={phone}
            setPhone={setPhone}
            errors={errors}
            setErrors={setErrors}
          />
          <p>. Thank you!</p>
        </div>
      </div>
      <PreferredChoice />
      <AddComment commentText={commentText} setCommentText={setCommentText} />
      <div>
        <FormControlLabel
          control={
            <Checkbox checked={emailNotifications} onChange={handleChange} />
          }
          label="Email me new results for my search"
        />
      </div>
      <div className={classes.errorList}>
        {errors.fname && <p>{errors.fname}</p>}
        {errors.lname && <p>{errors.lname}</p>}
        {errors.postcode && <p>{errors.postcode}</p>}
        {errors.email && <p>{errors.email}</p>}
        {errors.phone && <p>{errors.phone}</p>}
      </div>

      {isPending ? (
        <LoadingSpinner
          className={classes.loading}
          color="var(--color-black500)"
        />
      ) : (
        <button
          disabled={!canSendMessage()}
          className={`${classes.marginTop} ${classes.submitBtn}`}
          type="submit">
          Send Message
        </button>
      )}

      <div className={classes.text}>
        By submitting my contact information on CarGurus, I agree to receive
        communications from CarGurus, from the vehicle&#39;s seller and from the
        seller&#39;s agent&#40;s&#41;. If I include my phone number, I agree to
        receive calls and text messages &#40;including via automation&#41;. I
        can opt out at any time. I also agree to the Terms of Use and Privacy
        Statement, which explain how my data is used to better understand my
        vehicle shopping interests.
      </div>
    </form>
  );
}
