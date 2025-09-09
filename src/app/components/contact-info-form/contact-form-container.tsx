"use client";
import useSubmitInfo from "@/hooks/useSubmitInfo";
import useTracking from "@/hooks/useTracking";
import useVehiclesById from "@/hooks/useVehicleById";
import { ContactFormData } from "@/interfaces/contact-info";
import { getAccessToken } from "@/store/tokenStore";
import { sanitizeFormData } from "@/utilities/utilities";
import { useParams } from "next/navigation";
import { toast } from "react-toastify";
import { useContactFormContext } from "../../../contexts/contact-form-context/contact-form-context";
import ContactFormView from "./contact-form-view";
import { ContactInfoFormProps } from "./contact-info-form.types";
export default function ContactFormContainer({
  carId,
  className,
}: ContactInfoFormProps) {
  const {
    values,
    errors,
    setEmailNotifications,
    emailNotifications,
    resetForm,
  } = useContactFormContext();

  const {
    fname,
    lname,
    email,
    postCode,
    phone,
    preferredContact,
    selected,
    commentText,
  } = values;

  const params = useParams();
  const idParam = params.id;
  const id = idParam ? Number(idParam) : carId;

  const { data: vehicle } = useVehiclesById(id as number);
  const make = vehicle?.make ?? "";
  const model = vehicle?.model ?? "";
  const year = vehicle?.year ?? "";
  const accessToken = getAccessToken();

  const { mutate: submitInfo, isPending } = useSubmitInfo();
  const addInteraction = useTracking();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmailNotifications(event.target.checked);
  };

  const canSendMessage = () => {
    return (
      fname.trim() !== "" &&
      email.trim() !== "" &&
      postCode.trim() !== "" &&
      phone.trim() !== "" &&
      preferredContact.trim() !== "" &&
      Object.values(errors).every((err) => err === "")
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!accessToken) {
      toast.error("Please sign in to send message");
      return;
    }

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
    const sanitizedFormData = sanitizeFormData(
      formData
    ) as unknown as ContactFormData;
    submitInfo(sanitizedFormData);
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
