import { useState } from "react";
import { useForm, useFieldArray, Controller } from "react-hook-form";
import { IsoCountryCode } from "@flowpay-io/shared/types";
import { type InputLaunchPayload } from "@flowpay-io/embed-core";
import {
  type EmbedFormData,
  type EmbedPayloadFormProps,
} from "../types/EmbedPayloadForm.types";
import { DEFAULT_PAYLOAD } from "../const";

export function EmbedPayloadForm({
  onSubmit,
  initialValues,
  onCopySavedFormUrl: onCopySavedUrl,
}: EmbedPayloadFormProps) {
  const {
    register,
    control,
    handleSubmit,
    getValues,
    setValue,
    formState: { errors },
  } = useForm<EmbedFormData>({
    defaultValues: {
      ...DEFAULT_PAYLOAD,
      ...initialValues,
    },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "tenants",
  });

  const getPayloadFromFormData = (
    formData: EmbedFormData
  ): InputLaunchPayload => {
    return {
      country: formData.country,
      email: formData.email,
      merchantId: formData.merchantId,
      partnerCode: formData.partnerCode,
      phone: formData.phone,
      regNum: formData.regNum,
      tenants: formData.tenants.filter((t) => t.id.trim() && t.name.trim()),
      userId: formData.userId,
    };
  };

  const handleCopySavedUrl = () => {
    const formData = getValues();
    onCopySavedUrl(getPayloadFromFormData(formData));
  };

  const onSubmitForm = (formData: EmbedFormData) => {
    const payload = getPayloadFromFormData(formData);
    onSubmit(payload);
  };

  const [tenantInput, setTenantInput] = useState({ id: "", name: "" });

  const handleAddTenant = () => {
    if (tenantInput.id.trim() && tenantInput.name.trim()) {
      append(tenantInput);
      setTenantInput({ id: "", name: "" });
    }
  };

  const generateRandomId = () => {
    const randomId = `sandbox-test-${Math.random()
      .toString(36)
      .substring(2, 8)}`;
    setValue("userId", randomId);
    setValue("merchantId", randomId);
  };

  return (
    <form
      className="form embed-payload-form"
      onSubmit={handleSubmit(onSubmitForm)}
    >
      <div className="section-title-container">
        <h1 className="section-title">Sandbox Financing Demo</h1>
      </div>

      {/* Partner Code */}
      <div className="form-group">
        <label htmlFor="partnerCode">
          Partner Code <span className="required">*</span>
        </label>
        <input
          type="text"
          id="partnerCode"
          {...register("partnerCode", {
            required: true,
            maxLength: 36,
          })}
        />
        {errors.partnerCode && (
          <span className="error">Partner Code is required</span>
        )}
      </div>

      <div className="form-section">
        <div className="form-grid">
          {/* Country */}
          <div className="form-group">
            <label htmlFor="country">
              Country <span className="required">*</span>
            </label>
            <select id="country" {...register("country", { required: true })}>
              {Object.values(IsoCountryCode).map((code) => (
                <option key={code} value={code}>
                  {code}
                </option>
              ))}
            </select>
            {errors.country && (
              <span className="error">Country is required</span>
            )}
          </div>

          {/* Registration Number */}
          <div className="form-group">
            <label htmlFor="regNum">
              Registration Number <span className="required">*</span>
            </label>
            <Controller
              name="regNum"
              control={control}
              rules={{ required: true, maxLength: 36 }}
              render={({ field }) => (
                <input
                  type="text"
                  id="regNum"
                  {...field}
                  onChange={(e) => {
                    const textWithoutSpaces = e.target.value.replace(/\s/g, "");
                    field.onChange(textWithoutSpaces);
                  }}
                />
              )}
            />
            {errors.regNum && (
              <span className="error">Registration Number is required</span>
            )}
          </div>

          {/* Email (optional) */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              {...register("email")}
              placeholder="user@example.com"
            />
          </div>

          {/* Phone (optional) */}
          <div className="form-group">
            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              id="phone"
              {...register("phone")}
              placeholder="+420123456789"
            />
          </div>

          {/* User ID */}
          <div className="form-group">
            <label htmlFor="userId">
              User ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="userId"
              {...register("userId", {
                required: true,
                maxLength: 36,
              })}
            />
            {errors.userId && (
              <span className="error">User ID is required</span>
            )}
          </div>

          {/* Merchant ID */}
          <div className="form-group">
            <label htmlFor="merchantId">
              Merchant ID <span className="required">*</span>
            </label>
            <input
              type="text"
              id="merchantId"
              {...register("merchantId", {
                required: true,
                maxLength: 36,
              })}
            />
            {errors.merchantId && (
              <span className="error">Merchant ID is required</span>
            )}
          </div>

          {/* Generate Random ID Button */}
          <div
            className="form-group"
            style={{ display: "flex", alignItems: "flex-start" }}
          >
            <button
              type="button"
              className="button generate-id-btn"
              onClick={generateRandomId}
              style={{
                padding: "0.35rem 0.7rem",
                fontSize: "0.75rem",
                whiteSpace: "nowrap",
                height: "fit-content",
              }}
              title="Generate random ID for both User ID and Merchant ID"
            >
              Random IDs
            </button>
          </div>
        </div>

        {/* Tenants Section */}
        <div className="form-section">
          <label>Tenants (optional)</label>
          <div className="tenants-list">
            {fields.map((field, index) => (
              <div key={field.id} className="tenant-item">
                <span className="tenant-info">
                  <strong>
                    <Controller
                      name={`tenants.${index}.name`}
                      control={control}
                      render={({ field }) => <span>{field.value}</span>}
                    />
                  </strong>{" "}
                  (
                  <Controller
                    name={`tenants.${index}.id`}
                    control={control}
                    render={({ field }) => <span>{field.value}</span>}
                  />
                  )
                </span>
                <button
                  type="button"
                  className="remove-btn"
                  onClick={() => remove(index)}
                >
                  ×
                </button>
              </div>
            ))}
          </div>

          <div className="tenant-inputs">
            <input
              type="text"
              placeholder="Tenant ID"
              value={tenantInput.id}
              onChange={(e) =>
                setTenantInput((prev) => ({ ...prev, id: e.target.value }))
              }
            />
            <input
              type="text"
              placeholder="Tenant Name"
              value={tenantInput.name}
              onChange={(e) =>
                setTenantInput((prev) => ({ ...prev, name: e.target.value }))
              }
            />
            <button
              type="button"
              className="add-tenant-btn"
              onClick={handleAddTenant}
            >
              Add
            </button>
          </div>
        </div>
      </div>

      <div className="form-actions">
        <button type="submit" className="button submit-btn">
          <span>Open Sandbox Financing</span>
        </button>
        <div className="button-group">
          <button type="button" className="button" onClick={handleCopySavedUrl}>
            <span>💾 Copy link to this form</span>
          </button>
        </div>
      </div>
    </form>
  );
}
