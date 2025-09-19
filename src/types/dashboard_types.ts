// Define the Mission interface based on your JSON structure

// ============================
// INVENTORY ENUMS
// ============================

export enum InventoryCategory {
  MEDICAL = "medical",
  EQUIPMENT = "equipment",
  OFFICE = "office",
  FOOD = "food",
  CLOTHING = "clothing",
  TECHNOLOGY = "technology",
  FURNITURE = "furniture",
  TRANSPORTATION = "transportation",
  OTHER = "other"
}

export enum InventorySubCategory {
  // Medical sub-categories
  PAINKILLERS = "painkillers",
  ANTIBIOTICS = "antibiotics",
  VITAMINS = "vitamins",
  FIRST_AID = "first_aid",
  BANDAGES = "bandages",
  SYRINGES = "syringes",
  GLOVES = "gloves",
  MASKS = "masks",
  SANITIZERS = "sanitizers",
  MEDICAL_DEVICES = "medical_devices",

  // Equipment sub-categories
  DIAGNOSTIC = "diagnostic",
  SURGICAL = "surgical",
  MONITORING = "monitoring",
  THERAPEUTIC = "therapeutic",
  LABORATORY = "laboratory",

  // Office sub-categories
  STATIONERY = "stationery",
  ELECTRONICS = "electronics",
  FURNITURE = "furniture",
  SUPPLIES = "supplies",

  // Food sub-categories
  PERISHABLE = "perishable",
  NON_PERISHABLE = "non_perishable",
  BEVERAGES = "beverages",
  SNACKS = "snacks",

  // Clothing sub-categories
  UNIFORMS = "uniforms",
  PROTECTIVE_GEAR = "protective_gear",
  SHOES = "shoes",
  ACCESSORIES = "accessories",

  // Technology sub-categories
  COMPUTERS = "computers",
  MOBILE_DEVICES = "mobile_devices",
  NETWORKING = "networking",
  SOFTWARE = "software",

  // Furniture sub-categories
  OFFICE_FURNITURE = "office_furniture",
  MEDICAL_FURNITURE = "medical_furniture",
  STORAGE = "storage",

  // Transportation sub-categories
  VEHICLES = "vehicles",
  PARTS = "parts",
  FUEL = "fuel",

  // Other sub-categories
  MISCELLANEOUS = "miscellaneous",
  DONATIONS = "donations",
  EMERGENCY = "emergency"
}

export enum InventoryUnit {
  // Medical Units
  TABLETS = "tablets",
  CAPSULES = "capsules",
  PILLS = "pills",
  BOTTLES = "bottles",
  VIALS = "vials",
  AMPOULES = "ampoules",
  SYRINGES = "syringes",
  TUBES = "tubes",

  // General Units
  PIECES = "pieces",
  UNITS = "units",
  BOXES = "boxes",
  PACKS = "packs",
  SETS = "sets",
  KITS = "kits",
  BAGS = "bags",
  CONTAINERS = "containers",

  // Measurement Units
  LITERS = "liters",
  MILLILITERS = "milliliters",
  GRAMS = "grams",
  KILOGRAMS = "kilograms",
  POUNDS = "pounds",
  OUNCES = "ounces",
  METERS = "meters",
  CENTIMETERS = "centimeters",
  INCHES = "inches",
  FEET = "feet",
  YARDS = "yards",

  // Packaging Units
  PAIRS = "pairs",
  SHEETS = "sheets",
  ROLLS = "rolls",
  BUNDLES = "bundles",
  STRIPS = "strips",
  PADS = "pads",
  WIPES = "wipes",
  CANS = "cans",
  JARS = "jars",
  PACKETS = "packets",
  SACHETS = "sachets",
  POUCHES = "pouches",
  WRAPPERS = "wrappers",

  // Generic Units
  EACH = "each",
  UNIT = "unit",
  ITEM = "item",
  PIECE = "piece",
  COUNT = "count",
  NUMBER = "number"
}

// ============================
// EXISTING INTERFACES
// ============================

export interface Mission {
  _id: string;
  name: string;
  organization: {
    _id: string;
    name: string;
    email: string;
  };
  purpose: string;
  description: string;
  missionType: string;
  overallStartDate: string;
  overallEndDate: string;
  geographicScope: string;
  statesInvolved: string[];
  availableRoles: Array<{
    role: {
      _id: string;
      name: string;
    };
    department: {
      _id: string;
      name: string;
    };
    description: string;
    isRequired: boolean;
    _id: string;
  }>;
  registrationSettings: {
    registrationDeadline: string;
    registrationLink: string;
    maxVolunteersPerRole: number;
    isOpen: boolean;
    requiresApproval: boolean;
    allowWaitlist: boolean;
  };
  requirements: {
    minimumAge: number;
    requiredDocuments: string[];
    languageRequirements: string[];
  };
  logistics: {
    accommodationProvided: boolean;
    mealsProvided: boolean;
    costPerVolunteer: number;
    equipmentProvided: string[];
  };
  metrics: {
    estimatedPatientsToServe: number;
    totalVolunteersNeeded: number;
    totalVolunteersRegistered: number;
    registrationRate: number;
    timelineCount: number;
    activeRegistrations: number;
  };
  status: string;
  createdBy: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Profile {
  name: string;
  email: string;
  phone: string;
  address: string;
  logo: string;
  website: string;
  isVerified: boolean;
  status: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  primaryContact: {
    name: string;
    phone: string;
    email: string;
  };
  _id: string;
}

export interface Role {
  _id: string;
  name: string;
  description?: string;
  relatedRole: string;
  createdBy: string;
  createdAt?: string;
  updatedAt?: string;
  isActive?: boolean;
}

export interface Department {
  _id: string;
  name: string;
  description?: string;
  status?: string; // e.g., 'active', 'disabled'
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  commonRoles?: string[];
  isActive?: boolean;
  // Add more fields as needed
}

export interface Location {
  _id: string;
  name: string;
  city: string;
  state: string; // State ID from states endpoint
  lga: string; // LGA name
  country: string;
  facilityType: string;
  capacity: number;
  contactInfo: { contactPerson: string; phone: string; email?: string };
  missionScope: string;
  status?: string;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
  // Legacy support for existing address structure
  address?: { city: string; state: string; country: string };
}

// New types for States and LGAs
export interface LGA {
  _id: string;
  name: string;
}

export interface State {
  _id: string;
  name: string;
  lgas: LGA[];
  createdAt: string;
  updatedAt: string;
}

// Inventory interfaces
export interface InventoryItem {
  _id: string;
  name: string;
  description?: string;
  category: InventoryCategory;
  subCategory?: InventorySubCategory;
  quantity: number;
  unit: InventoryUnit;
  totalValue?: number;
  supplier?: string;
  expiryDate?: string;
  location?: string;
  status: 'available' | 'low_stock' | 'out_of_stock' | 'expired';
  minimumThreshold?: number;
  isActive?: boolean;
  createdAt?: string;
  updatedAt?: string;
  createdBy?: string;
}

export interface BulkInventoryItem {
  name: string;
  description?: string;
  unit: InventoryUnit;
  supplier?: string;
  expiryDate?: string;
  location?: string;
  minimumThreshold?: number;
}

export interface BulkInventoryRequest {
  category: InventoryCategory;
  subCategory: InventorySubCategory;
  items: BulkInventoryItem[];
}

export interface AllocatedItem {
  _id: string;
  generalItemName: string;
  allocatedQuantity: number;
  availableQuantity: number;
  usedQuantity: number;
  notes?: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface TimelineInventoryItem {
  _id: string;
  missionId: string;
  timelineId: string;
  missionInventoryId: string;
  category: string;
  subCategory: string;
  allocatedItems: AllocatedItem[];
  allocatedBy: string;
  isActive: boolean;
  allocatedAt: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface TimelineInventoryResponse {
  success: boolean;
  message: string;
  data: {
    timelineInventory: TimelineInventoryItem[];
    totalCategories: number;
    totalItems: number;
  };
}

// Timeline Inventory Operation Types
export interface TimelineInventoryAllocateRequest {
  timelineId: string;
  category: string;
  subCategory: string;
  allocatedItems: {
    generalItemName: string;
    allocatedQuantity: number;
    notes?: string;
  }[];
}

export interface TimelineInventoryAllocateResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

export interface TimelineInventoryUpdateRequest {
  generalItemName: string;
  allocatedQuantity?: number;
  usedQuantity?: number;
  notes?: string;
}

export interface TimelineInventoryUpdateResponse {
  success: boolean;
  message: string;
  data: {
    item: {
      generalItemName: string;
      currentStock: number;
      minimumStock: number;
      costPerUnit: number;
      notes?: string;
      isActive: boolean;
      updatedAt: string;
      _id: string;
      createdAt: string;
    };
  };
}

export interface TimelineInventoryBulkUpdateItem {
  generalItemName: string;
  updates: {
    allocatedQuantity?: number;
    usedQuantity?: number;
    notes?: string;
    isActive?: boolean;
  };
}

export interface TimelineInventoryBulkUpdateRequest {
  timelineId: string;
  category: string;
  subCategory: string;
  items: TimelineInventoryBulkUpdateItem[];
}

export interface TimelineInventoryBulkUpdateResponse {
  success: boolean;
  message: string;
  data?: Record<string, unknown>;
}

// ============================
// MISSION INVENTORY TYPES
// ============================

export interface MissionInventoryItem {
  _id?: string;
  missionInventoryId?: string; // Add this field for the parent mission inventory ID
  missionId?: string;
  generalItemName: string;
  currentStock: number;
  minimumStock: number;
  maximumStock: number;
  costPerUnit: number;
  expiryDate: string;
  notes?: string;
  isActive?: boolean;
  category?: string;
  subCategory?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface MissionInventoryBulkCreateRequest {
  missionId: string;
  category: string;
  subCategory: string;
  items: MissionInventoryItem[];
}

export interface MissionInventoryUpdateRequest {
  generalItemName: string;
  currentStock?: number;
  minimumStock?: number;
  maximumStock?: number;
  costPerUnit?: number;
  expiryDate?: string;
  notes?: string;
}

export interface MissionInventoryBulkUpdateItem {
  generalItemName: string;
  updates: Partial<MissionInventoryUpdateRequest>;
}

export interface MissionInventoryBulkUpdateRequest {
  missionId: string;
  category: string;
  subCategory: string;
  items: MissionInventoryBulkUpdateItem[];
}

export interface MissionInventoryResponse {
  success: boolean;
  message: string;
  data?: MissionInventoryItem | MissionInventoryItem[] | Record<string, unknown>;
}