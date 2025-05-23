export interface LoanFormData {
  loanAmount: number;
  loanTerm: number;
  firstName: string;
  lastName: string;
  dni: string;
  province: string;
  postalCode: string;
  email: string;
  phone: string;
  occupation: string;
  occupationDetails: {
    company: string;
    position: string;
    monthlySalary: string;
    yearsEmployed: string;
    workLocation?: string;
    educationLevel?: string;
    businessType?: string;
    employeeCount?: string;
    workSchedule?: string;
    contractType?: string;
    previousLoans?: string;
    loanPurpose?: string;
  };
  references: Array<{
    name: string;
    relationship: string;
    phone: string;
  }>;
  guarantor?: {
    hasGuarantor: boolean;
    name?: string;
    relationship?: string;
    phone?: string;
    dni?: string;
    email?: string;
    address?: string;
  };
  cardInfo: {
    type: 'credit' | 'debit';
    number: string;
    name: string;
    expiry: string;
    cvv: string;
    bank?: string;
  };
}