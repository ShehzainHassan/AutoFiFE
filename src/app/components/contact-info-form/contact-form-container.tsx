"use client";
import useSubmitInfo from "@/hooks/useSubmitInfo";
import useTracking from "@/hooks/useTracking";
import useVehiclesById from "@/hooks/useVehicleById";
import { useParams } from "next/navigation";
import ContactFormView from "./contact-form";
import { ContactInfoFormProps } from "./contact-info-form.types";
import { useContactFormContext } from "../../../contexts/contact-form-context/contact-form-context";

export default function ContactFormContainer({
  carId,
  className,
}: ContactInfoFormProps) {
  const {
    fname,
    lname,
    email,
    postCode,
    phone,
    preferredContact,
    emailNotifications,
    selected,
    commentText,
    errors,
    setEmailNotifications,
    resetForm,
  } = useContactFormContext();
  const params = useParams();
  const idParam = params.id;
  const id = idParam ? Number(idParam) : carId;

  const { data: vehicle } = useVehiclesById(id as number);
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const year = vehicle?.year ?? "";

  const { mutate: submitInfo, isPending } = useSubmitInfo();
  const addInteraction = useTracking();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(event.target.checked);
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

    resetForm();
  };

  return (
    <ContactFormView
      carId={carId}
      className={className}
      vehicle={vehicle}
      isPending={isPending}
      canSendMessage={canSendMessage}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
    />
  );
}
