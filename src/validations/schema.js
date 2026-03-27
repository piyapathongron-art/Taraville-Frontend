import { z } from 'zod';

import { emailValidator, optionalDateString, optionalNumberString, optionalString, OwnerPhoneValidator, passwordValidator, phoneValidator, requiredNumber, requiredString, urlValidator } from './zodValidator.js';


//Auth Schemas ==========================================
const registerBase = z.object({
  empId: requiredString("empId"),
  password: passwordValidator,
  confirmPassword: requiredString("confirm password"),
  role: z.enum(['User', 'Staff', 'Admin']).optional().default('User')
});

//create
export const registerSchema = registerBase
  .refine(input => input.password === input.confirmPassword, {
    message: "Password must match with confirm password",
    path: ['confirmPassword']
  })

  //create by admin
  export const registerSchemaAdmin = z.object({
    empId: requiredString("empId"),
    password: passwordValidator,
    role: z.enum(['User','Staff','Admin']).optional().default("User")
  }).transform(async data =>({
    empId: +data.empId,
    password: bcrypt.hashSync(data.password,8),
    role: data.role    
  }))
  

  //login
export const loginSchema = z.object({
  empId: requiredString("employeeId"),
  password: passwordValidator
});

//Employee Schemas ==========================================
const employeeBase = z.object({
  firstName: requiredString("First name"),
  lastName: requiredString("Last name"),
  phone: phoneValidator,
  email: emailValidator,
  department: z.enum(['Sale', 'Engineer', 'Staff', 'Employee']).optional(),
  salary: optionalNumberString.optional(),
  address: optionalString,
  imageUrl: urlValidator
});

//create
export const createEmployeeSchema = employeeBase

//update
export const updateEmployeeSchema = employeeBase.partial()

//House Schemas ==========================================
const houseBase = z.object({
  houseCode: requiredString("House code"),
  houseName: optionalString,
  projectName: optionalString,
  houseType: optionalString,
  price: optionalNumberString,
  status: z.enum(['Available', 'Book', 'Sold', 'Repair', 'Building']).optional(),
  details: optionalString,
  ownerPhone : OwnerPhoneValidator
});

// create
export const createHouseSchema = houseBase
//update
export const updateHouseSchema = houseBase.partial()

export const houseImageSchema = z.object({
  imageUrl: urlValidator,
  isCover: z.boolean().optional().default(false)
}).transform(data =>({
  imageUrl: data.imageUrl,
  isCover: data.isCover
}));

//Assignment Schemas ==========================================
const assignmentBase = z.object({
  houseId: requiredNumber("houseId"),
  empId: requiredNumber("empId"),
  taskTitle: requiredString("Task title"),
  taskDescription: optionalString,
  dutyRole: optionalString,
  assignedDate: optionalDateString,
  status: z.enum(['Confirming', 'Pending', 'Complete']).optional().default("Pending")
});

//create
export const createAssignmentSchema = assignmentBase

//update
export const updateAssignmentSchema = assignmentBase.partial()
//Customer ==========================================
const customerBase = z.object({
  firstName: requiredString("First name"),
  lastName: requiredString("Last name"),
  phone: phoneValidator,
  lineId: optionalString,
  email: emailValidator,
  houseNo: optionalString,
  street: optionalString,
  subDistrict: optionalString,
  district: optionalString,
  province: optionalString,
  zipcode: optionalString,
  gender: optionalString,
  occupation: optionalString,
  incomeRange: optionalString
});

//create
export const createCustomerSchema = customerBase;
//update
export const updateCustomerSchema = customerBase.partial();

//survey Schemas ==========================================
const surveyBase = z.object({
  customerId: requiredString("customerId"),
  userId: optionalNumberString,
  visitDate: optionalDateString,
  interestedPropertyType: optionalString,
  preferredBedroom: optionalNumberString,
  preferredBathroom: optionalNumberString,
  decisionFactors: z.array(z.string()).optional(), 
  familySize: optionalString,
  expectedBudget: optionalString,
  informationSource: optionalString,
  installmentCapacity: optionalString,
  remark:optionalString,
  otherNewsChannel:optionalString
});

//create
export const createSurveySchema = surveyBase

//update
export const updateSurveySchema = surveyBase.partial().transform(data => ({
  ...data,
  customerId: data.customerId ? Number(data.customerId) : undefined,
  userId: data.userId ? Number(data.userId) : undefined,
  visitDate: data.visitDate ? new Date(data.visitDate) : undefined,
  preferredBedroom: data.preferredBedroom ? Number(data.preferredBedroom) : undefined,
  preferredBathroom: data.preferredBathroom ? Number(data.preferredBathroom) : undefined,
}));