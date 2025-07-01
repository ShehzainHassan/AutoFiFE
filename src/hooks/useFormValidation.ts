import { useCallback, useState } from "react";

export type ValidationRules<T> = {
  [K in keyof T]?: (value: T[K]) => string;
};

export function useFormValidation<T>(
  initialValues: T,
  validationRules: ValidationRules<T>
) {
  const [values, setValues] = useState<T>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof T, string>>>({});

  const validate = useCallback(
    (field: keyof T) => {
      const rule = validationRules[field];
      if (rule) {
        const error = rule(values[field]);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [values, validationRules]
  );

  const handleChange = useCallback(
    (field: keyof T) => (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setValues((prev) => ({ ...prev, [field]: value as T[typeof field] }));
      const rule = validationRules[field];
      if (rule) {
        const error = rule(value as T[typeof field]);
        setErrors((prev) => ({ ...prev, [field]: error }));
      }
    },
    [setValues, setErrors, validationRules]
  );

  return {
    values,
    errors,
    setValues,
    setErrors,
    validate,
    handleChange,
  };
}
