// person.types.ts

import type { BaseEntity } from '~/shared/types/common';
import type { Address } from '~/features/core/types/geography';
import type { Status } from '~/shared/types/common';
import { Person } from '@mui/icons-material';




export interface Person extends BaseEntity {
  // Personal Information
  firstName: string;
  lastName: string;
  fatherName: string;
  motherName?: string;
  dateOfBirth: string;
  email?: string;
  healthCondition?: string;
  nidNumber?: string;
  brnNumber?: string; // Birth Registration Number
  fatherNidNumber?: string;
  motherBrnNumber?: string; // Birth Registration Number
  phone: number | null;
  emergencyCont: number | null;

  // Demographics
  genderId: string;
  bloodGroupId?: string;
  religionId?: string;
  nationalityId?: string;

  // Address Information
  presentAddress?: Address;
  permanentAddress?: Address;
  sameAsPresent?: boolean;

  // File Uploads
  photo?: string;
  nidFile?: string;
  brnFile?: string;
  fatherNidFile?: string;
  motherNidFile?: string;
  digitalSignatureFile?: string;

  // File names & lookup names (for display only)
  necessary?: {
    genderName?: string;
    bloodGroupName?: string;
    religionName?: string;
    nationalityName?: string;

    nidFileName?: string;
    brnFileName?: string;
    fatherNidFileName?: string;
    motherNidFileName?: string;
    digitalSignatureFileName?: string;
  };

  personCategoryId: string;              // NEW: person category (student/staff/guardian/mentor)
  designationCategoryId?: string;        // NEW: only if category = staff
  designationId?: string;
  status: Status;
}




export interface PersonDetails extends Person {}

export interface CreatePersonDTO extends Omit<Person, keyof BaseEntity | 'necessary'> {}



export interface UpdatePersonDTO extends Partial<CreatePersonDTO> { }

export interface PersonFilter extends Omit<Partial<Person>, keyof BaseEntity | "necessary"> {
  // Address Filters (deep-partial for nested fields)
  presentAddress?: Partial<Address>;
  permanentAddress?: Partial<Address>;

  // Pagination
  page?: number;
  limit?: number;

  // Search & Sorting
  search?: string;
  sortBy?: keyof Person;       
  sortOrder?: 'ASC' | 'DESC';
}


// export interface PersonDetails extends BaseEntity {
//   // Personal Information
//   firstName: string;
//   lastName: string;
//   fatherName: string;
//   motherName: string;
//   dateOfBirth: string;
//   email?: string;
//   healthCondition?: string;
//   nidNumber?: string;
//   brnNumber?: string;
//   fatherNidNumber?: string;
//   motherBrnNumber?: string;

//   // Demographics
//   genderId: string;
//   bloodGroupId?: string;
//   religionId?: string;
//   nationalityId?: string;

//   // Address Information
//   presentAddress?: Address;
//   permanentAddress?: Address;
//   sameAsPresent?: boolean;

//   // File Uploads
//   photo?: string;
//   nidFile?: string;
//   brnFile?: string;
//   fatherNidFile?: string;
//   motherNidFile?: string;
//   digitalSignatureFile?: string;

//   // Lookup Names (Required in Details)
//   genderName?: string;
//   bloodGroupName?: string;
//   religionName?: string;
//   nationalityName?: string;

//   // File Names
//   nidFileName?: string;
//   brnFileName?: string;
//   fatherNidFileName?: string;
//   motherNidFileName?: string;
//   digitalSignatureFileName?: string;

//   personCategoryId: string;              // NEW
//   designationCategoryId?: string;        // NEW
//   designationId?: string;                // NEW

//   status: Status;
// }

let a;
// export interface CreatePersonDTO {
//   // Personal Information
//   firstName: string;
//   lastName: string;
//   fatherName: string;
//   motherName: string;
//   dateOfBirth: string;
//   email?: string;
//   healthCondition?: string;
//   nidNumber?: string;
//   brnNumber?: string;
//   fatherNidNumber?: string;
//   motherBrnNumber?: string;

//   // Demographics
//   genderId: string;
//   bloodGroupId?: string;
//   religionId?: string;
//   nationalityId?: string;

//   // Address Information
//   presentAddress?: Address;
//   permanentAddress?: Address;
//   sameAsPresent?: boolean;

//   // File Uploads (Base64 or URL paths)
//   photo?: string;
//   nidFile?: string;
//   brnFile?: string;
//   fatherNidFile?: string;
//   motherNidFile?: string;
//   digitalSignatureFile?: string;

//   personCategoryId: string;              // NEW (required)
//   designationCategoryId?: string;        // NEW (staff only)
//   designationId?: string;                // NEW (staff only)

//   status: Status;
// }
let b;
// export interface PersonFilter {
//   // Personal Information Filters
//   firstName?: string;
//   lastName?: string;
//   fatherName?: string;
//   motherName?: string;
//   dateOfBirth?: string;
//   email?: string;
//   nidNumber?: string;
//   brnNumber?: string;

//   // Demographic Filters
//   genderId?: string;
//   bloodGroupId?: string;
//   religionId?: string;
//   nationalityId?: string;

  
//   // Status Filter
//   status?: Status;

//   // Address Filters
//   presentAddress?: Partial<Address>;
//   permanentAddress?: Partial<Address>;

//   // Pagination
//   page?: number;
//   limit?: number;

//   personCategoryId?: string;        // NEW
//   designationCategoryId?: string;   // NEW
//   designationId?: string;           // NEW
//   search?: string;
//   // Sorting
//   sortBy?: keyof Person;
//   sortOrder?: 'ASC' | 'DESC';
// }