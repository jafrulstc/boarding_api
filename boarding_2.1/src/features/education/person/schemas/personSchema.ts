// features/person/schemas/personSchemas.ts
import { z } from 'zod';
import { addressSchema } from '~/features/core/schemas/generalSchemas';
import { StatusEnum } from '~/shared/schemas/shareSchemas';




/**
 * "necessary" block (display-only fields)
 * - Lookup name + file name গুলো এখানে optional রাখা হয়েছে
 */
export const necessarySchema = z.object({
  genderName: z.string().optional(),
  bloodGroupName: z.string().optional(),
  religionName: z.string().optional(),
  nationalityName: z.string().optional(),

  nidFileName: z.string().optional(),
  brnFileName: z.string().optional(),
  fatherNidFileName: z.string().optional(),
  motherNidFileName: z.string().optional(),
  digitalSignatureFileName: z.string().optional(),
}).optional();

/**
 * Person (Create/Form) validation schema
 * -> Student schema-এর স্টাইলেই বানানো
 */
export const personSchema = z.object({
  // Personal Information
  firstName: z.string()
    .min(1, 'First name is required')
    .max(50, 'First name must be less than 50 characters')
    .trim(),
  lastName: z.string()
    .min(1, 'Last name is required')
    .max(50, 'Last name must be less than 50 characters')
    .trim(),
  fatherName: z.string()
    .min(1, 'Father name is required')
    .max(100, 'Father name must be less than 100 characters')
    .trim(),
  motherName: z.string()
    .min(1, 'Mother name is required')
    .max(100, 'Mother name must be less than 100 characters')
    .trim().optional(),
  dateOfBirth: z.string()
    .min(1, 'Date of birth is required')
    .refine((date) => !isNaN(Date.parse(date)), {
      message: 'Invalid date of birth format',
    }),
  email: z.string()
    .email('Invalid email format')
    .optional()
    .or(z.literal('')),
  healthCondition: z.string()
    .max(500, 'Health condition must be less than 500 characters')
    .optional(),
  nidNumber: z.string()
    .max(20, 'NID number must be less than 20 characters')
    .optional(),
  brnNumber: z.string()
    .max(20, 'BRN number must be less than 20 characters')
    .optional(),
  fatherNidNumber: z.string()
    .max(20, 'Father NID number must be less than 20 characters')
    .optional(),
  motherBrnNumber: z.string()
    .max(20, 'Mother BRN number must be less than 20 characters')
    .optional(),
  phone: z.coerce.number()
    .min(0, 'min number is 1')
    .max(999999999999999, "max number is 15"),

  emergencyCont: z.coerce.number()
    .min(0, 'min number is 1')
    .max(999999999999999, "max number is 15"),
  // Demographics
  
  genderId: z.string().min(1, 'Gender is required'),
  bloodGroupId: z.string().optional(),
  religionId: z.string().optional(),
  nationalityId: z.string().optional(),

  // Address Information
  presentAddress: addressSchema.optional(),
  permanentAddress: addressSchema.optional(),
  sameAsPresent: z.boolean().optional(),

  // File Uploads (Base64/URL)
  photo: z.string().optional(),
  nidFile: z.string().optional(),
  brnFile: z.string().optional(),
  fatherNidFile: z.string().optional(),
  motherNidFile: z.string().optional(),
  digitalSignatureFile: z.string().optional(),

  // Display-only (names) block
  necessary: necessarySchema,

  // Status (form levelে না চাইলে এটা বাদও দিতে পারো)

  personCategoryId: z.string().min(1, 'Person category is required'),   // NEW
  designationCategoryId: z.string().optional(),                         // NEW (staff only)
  designationId: z.string().optional(),                                  // NEW (staff only)

  status: StatusEnum,
});


/**
 * Update schema
 * -> সব ফিল্ড optional, কিন্তু `id` আবশ্যিক
 * -> status আপডেটে লাগতে পারে, তাই optional রাখা
 */
export const updatePersonSchema = personSchema
  .partial()
  .extend({
    id: z.string().min(1, 'ID is required'),
    status: StatusEnum.optional(),
  });

export type PersonFormData = z.infer<typeof personSchema>;
export type UpdatePersonFormData = z.infer<typeof updatePersonSchema>;

/**
 * PersonFilter schema
 * -> তোমার PersonFilter টাইপের সাথে মিলে
 */
export const personFilterSchema = z.object({
  // Personal
  firstName: z.string().optional(),
  lastName: z.string().optional(),
  fatherName: z.string().optional(),
  motherName: z.string().optional(),
  dateOfBirth: z.string().optional(), // চাইলে date refine যোগ করতে পারো
  email: z.string().optional(),
  nidNumber: z.string().optional(),
  brnNumber: z.string().optional(),
  phone: z.number().nullable(),
  emergencyCont: z.number().nullable(),
  // Demographic
  genderId: z.string().optional(),
  bloodGroupId: z.string().optional(),
  religionId: z.string().optional(),
  nationalityId: z.string().optional(),

  personCategoryId: z.string().optional(),        // NEW
  designationCategoryId: z.string().optional(),   // NEW
  designationId: z.string().optional(),           // NEW

  // Status
  status: StatusEnum.optional(),

  // Address Filters (partial)
  presentAddress: addressSchema.partial().optional(),
  permanentAddress: addressSchema.partial().optional(),

  // Pagination
  page: z.number().int().positive().optional(),
  limit: z.number().int().positive().optional(),

  // Sorting
  sortBy: z.string().optional(), // চাইলে keyof Person hard-enum করা যায়
  sortOrder: z.enum(['ASC', 'DESC']).optional(),
});

export type PersonFilterForm = z.infer<typeof personFilterSchema>;
