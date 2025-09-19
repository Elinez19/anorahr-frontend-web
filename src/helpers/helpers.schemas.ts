import * as Yup from "yup";

// ========================================
// LOGIN VALIDATION SCHEMA
// ========================================
export const loginValidationSchema = Yup.object({
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
});

// ========================================
// ROLE VALIDATION SCHEMA
// ========================================
export const roleValidationSchema = Yup.object({
  name: Yup.string()
    .required("Role name is required")
    .min(2, "Name must be at least 2 characters"),
  description: Yup.string()
    .required("Description is required")
    .min(10, "Description must be at least 10 characters"),
  relatedRole: Yup.string().required("Related role is required"),
});

// ========================================
// REGISTER VALIDATION SCHEMA
// ========================================
export const registerValidationSchema = Yup.object({
  name: Yup.string().required("Company name is required").trim(),
  email: Yup.string()
    .email("Please enter a valid email address")
    .required("Email is required")
    .trim(),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters")
    .required("Password is required")
    .matches(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/,
      "Password must contain at least one uppercase letter, one lowercase letter, and one number"
    ),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password")], "Passwords must match")
    .required("Confirm your password"),
  phone: Yup.string().required("Phone is required").trim(),
  address: Yup.string().required("Address is required").trim(),
  logo: Yup.mixed()
    .test("file-or-url", "Logo must be a valid URL or image file", (value) => {
      if (!value) return false;
      if (typeof value === "string") {
        // Check if it's a valid URL
        try {
          new URL(value);
          return true;
        } catch {
          return false;
        }
      }
      // Allow File objects
      if (typeof value === "object" && value instanceof File) {
        return true;
      }
      return false;
    })
    .required("Logo is required"),
  website: Yup.string()
    .url("Website must be a valid URL")
    .required("Website is required")
    .trim(),
  primaryContact: Yup.object({
    name: Yup.string().required("Contact name is required").trim(),
    phone: Yup.string().required("Contact phone is required").trim(),
    email: Yup.string()
      .email("Please enter a valid contact email")
      .required("Contact email is required")
      .trim(),
  }),
});

// ========================================
// MISSION VALIDATION SCHEMA
// ========================================
export const missionValidationSchema = Yup.object({
  name: Yup.string()
    .min(3, "Mission name must be at least 3 characters")
    .max(100, "Mission name must be less than 100 characters")
    .required("Mission name is required"),
  purpose: Yup.string()
    .min(10, "Purpose must be at least 10 characters")
    .max(500, "Purpose must be less than 500 characters")
    .required("Purpose is required"),
  description: Yup.string()
    .min(20, "Description must be at least 20 characters")
    .max(1000, "Description must be less than 1000 characters")
    .required("Description is required"),
  missionType: Yup.string()
    .oneOf([
      "medical_clinic",
      "disaster_relief",
      "surgical_mission",
      "preventive_care",
      "vaccination_campaign",
      "training_mission",
      "other",
    ])
    .required("Mission type is required"),
  overallStartDate: Yup.date()
    .min(new Date(), "Start date must be in the future")
    .required("Start date is required"),
  overallEndDate: Yup.date()
    .min(Yup.ref("overallStartDate"), "End date must be after start date")
    .required("End date is required"),
  geographicScope: Yup.string()
    .oneOf([
      "single_location",
      "city_wide",
      "state_wide",
      "interstate",
      "international",
    ])
    .required("Geographic scope is required"),
  statesInvolved: Yup.array()
    .of(Yup.string())
    .min(1, "At least one state must be selected")
    .required("States involved is required"),
  availableRoles: Yup.array()
    .of(
      Yup.object({
        role: Yup.string().required("Role is required"),
        department: Yup.string().required("Department is required"),
      })
    )
    .min(1, "At least one role must be added"),
  registrationSettings: Yup.object({
    registrationDeadline: Yup.date().required(
      "Registration deadline is required"
    ),
    maxVolunteersPerRole: Yup.number()
      .min(1, "Must allow at least 1 volunteer per role")
      .max(1000, "Maximum volunteers per role cannot exceed 1000")
      .required("Max volunteers per role is required"),
  }),
  logistics: Yup.object({
    accommodationProvided: Yup.boolean(),
    mealsProvided: Yup.boolean(),
    costPerVolunteer: Yup.number()
      .min(0, "Cost cannot be negative")
      .required("Cost per volunteer is required"),
  }),
  metrics: Yup.object({
    estimatedPatientsToServe: Yup.number()
      .min(1, "Must serve at least 1 patient")
      .required("Estimated patients to serve is required"),
  }),
});

// ========================================
// TIMELINE VALIDATION SCHEMA
// ========================================
// Validation schema
export const timelineValidationSchema = Yup.object({
  locationId: Yup.string().required("Location is required"),
  startDate: Yup.date()
    .required("Start date is required")
    .min(new Date(), "Start date cannot be in the past"),
  endDate: Yup.date()
    .required("End date is required")
    .min(Yup.ref("startDate"), "End date must be after start date"),
  expectedPatients: Yup.number()
    .required("Expected patients is required")
    .min(1, "Must have at least 1 expected patient"),
  specialNotes: Yup.string(),
  dailySchedule: Yup.object({
    startTime: Yup.string().required("Start time is required"),
    endTime: Yup.string()
      .required("End time is required")
      .test(
        "is-after-start",
        "End time must be after start time",
        function (value) {
          const { startTime } = this.parent;
          if (!startTime || !value) return true;
          return value > startTime;
        }
      ),
    operatingDays: Yup.array()
      .of(Yup.string())
      .min(1, "At least one operating day is required")
      .required("Operating days are required"),
  }),
  roleSlots: Yup.array()
    .of(
      Yup.object({
        role: Yup.string(),
        department: Yup.string(),
        slotsAvailable: Yup.mixed(),
      })
    )
    .test(
      "at-least-one-valid-slot",
      "At least one role slot with positive slots is required",
      function (value) {
        if (!value || !Array.isArray(value)) return false;

        // Check if there's at least one slot with a positive number of slots
        const hasValidSlot = value.some((slot: { role?: string; department?: string; slotsAvailable?: number | string }) => {
          const quantity = typeof slot.slotsAvailable === "number" ? slot.slotsAvailable : Number(slot.slotsAvailable);
          return Boolean(slot && slot.role && slot.department && quantity > 0);
        });

        return hasValidSlot;
      }
    ),
});

// ========================================
// UPDATE REGISTRATION SETTINGS VALIDATION SCHEMA
// ========================================
// Validation schema
export const updateRegistrationSettingsValidationSchema = Yup.object({
  registrationSettings: Yup.object({
    registrationDeadline: Yup.date().required(
      "Registration deadline is required"
    ),
    isOpen: Yup.boolean().required(),
  }),
});

// ========================================
// VOLUNTEER REGISTRATION VALIDATION SCHEMA
// ========================================
export const volunteerRegistrationValidationSchema = Yup.object({
  volunteer: Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Name must be at least 2 characters")
      .max(100, "Name must be less than 100 characters")
      .matches(/^[a-zA-Z\s]+$/, "Name can only contain letters and spaces")
      .required("Full name is required"),
    email: Yup.string()
      .email("Please enter a valid email address")
      .max(255, "Email must be less than 255 characters")
      .required("Email is required"),
    phone: Yup.string()
      .min(10, "Phone number must be at least 10 digits")
      .max(15, "Phone number must be less than 15 digits")
      .required("Phone number is required"),
    dateOfBirth: Yup.date()
      .max(new Date(), "Date of birth cannot be in the future")
      .min(new Date(1900, 0, 1), "Date of birth must be after 1900")
      .required("Date of birth is required"),
    address: Yup.string()
      .trim()
      .min(10, "Address must be at least 10 characters")
      .max(500, "Address must be less than 500 characters")
      .required("Address is required"),
    profession: Yup.string()
      .trim()
      .min(2, "Profession must be at least 2 characters")
      .max(100, "Profession must be less than 100 characters")
      .optional(),
    experience: Yup.string()
      .trim()
      .max(1000, "Experience description must be less than 1000 characters")
      .optional(),
  }),
  missionTimeline: Yup.array()
    .of(Yup.string())
    .min(1, "Please select at least one timeline")
    .required("Please select at least one timeline"),
  role: Yup.string()
    .trim()
    .min(1, "Please select a role")
    .required("Please select a role"),
  emergencyContact: Yup.object({
    name: Yup.string()
      .trim()
      .min(2, "Emergency contact name must be at least 2 characters")
      .max(100, "Emergency contact name must be less than 100 characters")
      .matches(
        /^[a-zA-Z\s]+$/,
        "Emergency contact name can only contain letters and spaces"
      )
      .required("Emergency contact name is required"),
    phone: Yup.string()
      .min(10, "Emergency contact phone must be at least 10 digits")
      .max(15, "Emergency contact phone must be less than 15 digits")
      .required("Emergency contact phone is required"),
    relationship: Yup.string()
      .trim()
      .min(2, "Relationship must be at least 2 characters")
      .max(50, "Relationship must be less than 50 characters")
      .required("Relationship is required"),
  }),
  notes: Yup.string()
    .trim()
    .max(1000, "Notes must be less than 1000 characters")
    .optional(),
});

// ========================================
// VOLUNTEER EDIT VALIDATION SCHEMA
// ========================================
export const volunteerEditValidationSchema = Yup.object({
  volunteer: Yup.object({
    name: Yup.string().required("Full name is required"),
    email: Yup.string().email("Invalid email").required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    dateOfBirth: Yup.string().required("Date of birth is required"),
    address: Yup.string().required("Address is required"),
    profession: Yup.string(),
    experience: Yup.string(),
  }),
  emergencyContact: Yup.object({
    name: Yup.string().required("Emergency contact name is required"),
    phone: Yup.string().required("Emergency contact phone is required"),
    relationship: Yup.string().required("Relationship is required"),
  }),
  missionTimeline: Yup.array().min(1, "Please select at least one timeline"),
  role: Yup.string().required("Please select a role"),
  availableDays: Yup.array().min(1, "Please select at least one available day"),
});

// ========================================
// TIMELINE INVENTORY VALIDATION SCHEMA
// ========================================
export const timelineInventoryValidationSchema = Yup.object({
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub-category is required"),
  allocatedItems: Yup.array()
    .of(
      Yup.object({
        generalItemName: Yup.string()
          .min(2, "Item name must be at least 2 characters")
          .max(100, "Item name must be less than 100 characters")
          .required("Item name is required"),
        allocatedQuantity: Yup.number()
          .min(1, "Quantity must be at least 1")
          .required("Quantity is required"),
        notes: Yup.string()
          .max(500, "Notes must be less than 500 characters")
          .optional(),
      })
    )
    .min(1, "At least one item must be allocated")
    .required("Allocated items are required"),
  timelineId: Yup.string().required("Timeline ID is required"),
});

// ========================================
// BULK UPDATE MISSION INVENTORY VALIDATION SCHEMA
// ========================================
export const bulkUpdateMissionInventoryValidationSchema = Yup.object({
  missionId: Yup.string().required("Mission ID is required"),
  category: Yup.string().required("Category is required"),
  subCategory: Yup.string().required("Sub-category is required"),
  items: Yup.array()
    .of(
      Yup.object({
        generalItemName: Yup.string()
          .min(2, "Item name must be at least 2 characters")
          .max(100, "Item name must be less than 100 characters")
          .required("Item name is required"),
        updates: Yup.object({
          currentStock: Yup.number()
            .min(0, "Current stock cannot be negative")
            .optional(),
          minimumStock: Yup.number()
            .min(0, "Minimum stock cannot be negative")
            .optional(),
          maximumStock: Yup.number()
            .min(0, "Maximum stock cannot be negative")
            .optional(),
          costPerUnit: Yup.number()
            .min(0, "Cost per unit cannot be negative")
            .optional(),
          expiryDate: Yup.string().optional(),
          notes: Yup.string()
            .max(500, "Notes must be less than 500 characters")
            .optional(),
        }),
      })
    )
    .min(1, "At least one item must be added")
    .required("Items are required"),
});
