import { z } from "zod";

// ========================================
// REGISTRATION VALIDATION SCHEMAS
// ========================================

// Step 1: Account Details Schema
export const accountDetailsSchema = z
  .object({
    companyName: z
      .string()
      .min(2, "Company name must be at least 2 characters")
      .max(100, "Company name must be less than 100 characters")
      .trim(),
    email: z
      .string()
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters")
      .trim(),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

// Step 2: Company Information Schema
export const companyInfoSchema = z.object({
  phone: z
    .string()
    .min(10, "Please provide a valid phone number")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please provide a valid phone number")
    .trim(),
  address: z
    .string()
    .min(10, "Please provide a complete address")
    .max(500, "Address must be less than 500 characters")
    .trim(),
  logo: z
    .string()
    .url("Please provide a valid logo URL")
    .optional()
    .or(z.literal("")),
  website: z
    .string()
    .url("Please provide a valid website URL")
    .optional()
    .or(z.literal("")),
  primaryContactName: z
    .string()
    .min(2, "Primary contact name must be at least 2 characters")
    .max(100, "Primary contact name must be less than 100 characters")
    .regex(
      /^[a-zA-Z\s]+$/,
      "Primary contact name can only contain letters and spaces"
    )
    .trim(),
  primaryContactPhone: z
    .string()
    .min(10, "Please provide a valid primary contact phone")
    .max(15, "Primary contact phone must be less than 15 digits")
    .regex(
      /^[\+]?[1-9][\d]{0,15}$/,
      "Please provide a valid primary contact phone"
    )
    .trim(),
  primaryContactEmail: z
    .string()
    .email("Please enter a valid primary contact email")
    .max(255, "Primary contact email must be less than 255 characters")
    .trim(),
  acceptTerms: z
    .boolean()
    .refine((val) => val === true, "You must accept the terms and conditions"),
});

// Complete Registration Schema
export const completeRegistrationSchema =
  accountDetailsSchema.merge(companyInfoSchema);

// Type exports
export type AccountDetailsFormData = z.infer<typeof accountDetailsSchema>;
export type CompanyInfoFormData = z.infer<typeof companyInfoSchema>;
export type CompleteRegistrationFormData = z.infer<
  typeof completeRegistrationSchema
>;

// ========================================
// LOGIN VALIDATION SCHEMA
// ========================================
export const loginSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim(),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(128, "Password must be less than 128 characters"),
});

export type LoginFormData = z.infer<typeof loginSchema>;

// ========================================
// FORGOT PASSWORD VALIDATION SCHEMA
// ========================================
export const forgotPasswordSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim(),
});

export type ForgotPasswordFormData = z.infer<typeof forgotPasswordSchema>;

// ========================================
// RESET PASSWORD VALIDATION SCHEMA
// ========================================
export const resetPasswordSchema = z
  .object({
    token: z.string().min(1, "Reset token is required"),
    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(128, "Password must be less than 128 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
        "Password must contain at least one uppercase letter, one lowercase letter, and one number"
      ),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;

// ========================================
// VERIFY ORGANIZATION VALIDATION SCHEMA
// ========================================
export const verifyOrganizationSchema = z.object({
  companyName: z
    .string()
    .min(2, "Company name must be at least 2 characters")
    .max(100, "Company name must be less than 100 characters")
    .trim(),
  companyAddress: z
    .string()
    .min(10, "Please provide a complete company address")
    .max(500, "Company address must be less than 500 characters")
    .trim(),
  phoneNumber: z
    .string()
    .min(10, "Please provide a valid phone number")
    .max(15, "Phone number must be less than 15 digits")
    .regex(/^[\+]?[1-9][\d]{0,15}$/, "Please provide a valid phone number")
    .trim(),
  industry: z
    .string()
    .min(2, "Industry must be at least 2 characters")
    .max(100, "Industry must be less than 100 characters")
    .trim(),
  companySize: z.string().min(1, "Company size is required"),
  description: z
    .string()
    .max(1000, "Description must be less than 1000 characters")
    .optional()
    .or(z.literal("")),
});

export type VerifyOrganizationFormData = z.infer<
  typeof verifyOrganizationSchema
>;

// ========================================
// RESEND VERIFICATION VALIDATION SCHEMA
// ========================================
export const resendVerificationSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .max(255, "Email must be less than 255 characters")
    .trim(),
});

export type ResendVerificationFormData = z.infer<
  typeof resendVerificationSchema
>;
