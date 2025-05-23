import React, { useState } from 'react';
import { ChevronRight, ChevronLeft, Building2, CreditCard, Calendar, User, Lock, Building, FileText, Users, Heart, History, Target, Plus, X } from 'lucide-react';

interface OccupationDetailsStepProps {
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
  guarantor?: {
    hasGuarantor: boolean;
    name?: string;
    relationship?: string;
    phone?: string;
    dni?: string;
    email?: string;
    address?: string;
  };
  onDetailsChange: (field: string, value: string | any) => void;
  onGuarantorChange: (value: any) => void;
  onNext: () => void;
  onBack: () => void;
}

export const OccupationDetailsStep: React.FC<OccupationDetailsStepProps> = ({
  occupation,
  occupationDetails,
  guarantor = { hasGuarantor: false },
  onDetailsChange,
  onGuarantorChange,
  onNext,
  onBack
}) => {
  const [errors, setErrors] = useState<{[key: string]: string}>({});
  const [isLoading, setIsLoading] = useState(false);
  
  const validateForm = () => {
    const newErrors: {[key: string]: string} = {};
    
    if (['empleado', 'monotributista', 'empleador'].includes(occupation)) {
      if (!occupationDetails.company) {
        newErrors.company = occupation === 'empleado' ? 'Por favor ingrese el nombre de su empresa' : 'Por favor ingrese el nombre de su negocio';
      }
      
      if (!occupationDetails.position) {
        newErrors.position = 'Por favor ingrese su cargo o actividad';
      }

      if (!occupationDetails.workLocation) {
        newErrors.workLocation = 'Por favor ingrese la ubicación de trabajo';
      }

      if (!occupationDetails.workSchedule) {
        newErrors.workSchedule = 'Por favor seleccione su horario de trabajo';
      }
    }

    if (occupation === 'empleado') {
      if (!occupationDetails.contractType) {
        newErrors.contractType = 'Por favor seleccione el tipo de contrato';
      }
    }

    if (occupation === 'empleador') {
      if (!occupationDetails.businessType) {
        newErrors.businessType = 'Por favor seleccione el tipo de negocio';
      }
      if (!occupationDetails.employeeCount) {
        newErrors.employeeCount = 'Por favor ingrese la cantidad de empleados';
      }
    }
    
    if (!occupationDetails.monthlySalary) {
      newErrors.monthlySalary = 'Por favor ingrese sus ingresos mensuales';
    } else if (isNaN(Number(occupationDetails.monthlySalary)) || Number(occupationDetails.monthlySalary) <= 0) {
      newErrors.monthlySalary = 'Por favor ingrese un monto válido';
    }
    
    if (['empleado', 'monotributista', 'empleador', 'jubilado'].includes(occupation)) {
      if (!occupationDetails.yearsEmployed) {
        newErrors.yearsEmployed = occupation === 'jubilado' ? 'Por favor ingrese hace cuántos años está jubilado' : 'Por favor ingrese su antigüedad laboral';
      } else if (isNaN(Number(occupationDetails.yearsEmployed)) || Number(occupationDetails.yearsEmployed) < 0) {
        newErrors.yearsEmployed = 'Por favor ingrese un valor válido';
      }
    }

    // Validate guarantor fields only if hasGuarantor is true
    if (guarantor.hasGuarantor) {
      if (!guarantor.name) {
        newErrors.guarantorName = 'Por favor ingrese el nombre del garante';
      }
      if (!guarantor.dni) {
        newErrors.guarantorDni = 'Por favor ingrese el DNI del garante';
      }
      if (!guarantor.phone) {
        newErrors.guarantorPhone = 'Por favor ingrese el teléfono del garante';
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleNext = async () => {
    if (validateForm()) {
      setIsLoading(true);
      await new Promise(resolve => setTimeout(resolve, 800));
      setIsLoading(false);
      onNext();
    }
  };

  const formatCurrency = (value: string) => {
    const numericValue = value.replace(/\D/g, '');
    onDetailsChange('monthlySalary', numericValue);
  };

  const getFormTitle = () => {
    switch (occupation) {
      case 'empleado':
        return 'Información laboral detallada';
      case 'monotributista':
        return 'Información de su actividad';
      case 'empleador':
        return 'Información de su empresa';
      case 'jubilado':
        return 'Información de jubilación';
      case 'desempleado':
        return 'Información adicional';
      case 'estudiante':
        return 'Información académica';
      default:
        return 'Información adicional';
    }
  };

  const workSchedules = [
    'Tiempo completo',
    'Medio tiempo',
    'Por horas',
    'Flexible'
  ];

  const contractTypes = [
    'Indefinido',
    'Temporal',
    'Por obra',
    'Pasantía'
  ];

  const businessTypes = [
    'Comercio',
    'Servicios',
    'Industria',
    'Tecnología',
    'Otro'
  ];

  const educationLevels = [
    'Primario',
    'Secundario',
    'Terciario',
    'Universitario',
    'Posgrado'
  ];

  const relationships = [
    'Familiar',
    'Amigo',
    'Colega',
    'Otro'
  ];

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        {getFormTitle()}
      </h2>
      
      <div className="mb-8 space-y-6">
        {['empleado', 'monotributista', 'empleador'].includes(occupation) && (
          <>
            <div>
              <div className="flex items-center mb-2">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                <label className="text-xs font-light text-gray-700">
                  {occupation === 'empleado' ? 'Empresa donde trabaja' : 'Nombre de su negocio'}
                </label>
              </div>
              
              <div>
                <input
                  type="text"
                  value={occupationDetails.company}
                  onChange={(e) => onDetailsChange('company', e.target.value)}
                  placeholder={occupation === 'empleado' ? 'Nombre de la empresa' : 'Nombre de su negocio'}
                  className="form-input"
                />
                {errors.company && (
                  <p className="mt-1 text-xs text-red-500">{errors.company}</p>
                )}
              </div>
            </div>
            
            <div>
              <div className="flex items-center mb-2">
                <FileText className="w-4 h-4 mr-2 text-blue-600" />
                <label className="text-xs font-light text-gray-700">
                  {occupation === 'empleado' ? 'Cargo que ocupa' : 'Actividad principal'}
                </label>
              </div>
              
              <div>
                <input
                  type="text"
                  value={occupationDetails.position}
                  onChange={(e) => onDetailsChange('position', e.target.value)}
                  placeholder={occupation === 'empleado' ? 'Su cargo o puesto' : 'Tipo de actividad'}
                  className="form-input"
                />
                {errors.position && (
                  <p className="mt-1 text-xs text-red-500">{errors.position}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                <label className="text-xs font-light text-gray-700">
                  Ubicación de trabajo
                </label>
              </div>
              
              <div>
                <input
                  type="text"
                  value={occupationDetails.workLocation}
                  onChange={(e) => onDetailsChange('workLocation', e.target.value)}
                  placeholder="Dirección o zona de trabajo"
                  className="form-input"
                />
                {errors.workLocation && (
                  <p className="mt-1 text-xs text-red-500">{errors.workLocation}</p>
                )}
              </div>
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Calendar className="w-4 h-4 mr-2 text-blue-600" />
                <label className="text-xs font-light text-gray-700">
                  Horario de trabajo
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {workSchedules.map((schedule) => (
                  <button
                    key={schedule}
                    type="button"
                    onClick={() => onDetailsChange('workSchedule', schedule)}
                    className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                      occupationDetails.workSchedule === schedule
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {schedule}
                  </button>
                ))}
              </div>
              {errors.workSchedule && (
                <p className="mt-1 text-xs text-red-500">{errors.workSchedule}</p>
              )}
            </div>
          </>
        )}

        {occupation === 'empleado' && (
          <div>
            <div className="flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">
                Tipo de contrato
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {contractTypes.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => onDetailsChange('contractType', type)}
                  className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                    occupationDetails.contractType === type
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.contractType && (
              <p className="mt-1 text-xs text-red-500">{errors.contractType}</p>
            )}
          </div>
        )}

        {occupation === 'empleador' && (
          <>
            <div>
              <div className="flex items-center mb-2">
                <Building className="w-4 h-4 mr-2 text-blue-600" />
                <label className="text-xs font-light text-gray-700">
                  Tipo de negocio
                </label>
              </div>
              
              <div className="grid grid-cols-2 gap-3">
                {businessTypes.map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => onDetailsChange('businessType', type)}
                    className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                      occupationDetails.businessType === type
                        ? 'bg-blue-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
              {errors.businessType && (
                <p className="mt-1 text-xs text-red-500">{errors.businessType}</p>
              )}
            </div>

            <div>
              <div className="flex items-center mb-2">
                <Users className="w-4 h-4 mr-2 text-blue-600" />
                <label className="text-xs font-light text-gray-700">
                  Cantidad de empleados
                </label>
              </div>
              
              <div>
                <input
                  type="number"
                  value={occupationDetails.employeeCount}
                  onChange={(e) => onDetailsChange('employeeCount', e.target.value)}
                  placeholder="Número de empleados"
                  className="form-input"
                />
                {errors.employeeCount && (
                  <p className="mt-1 text-xs text-red-500">{errors.employeeCount}</p>
                )}
              </div>
            </div>
          </>
        )}

        {occupation === 'estudiante' && (
          <div>
            <div className="flex items-center mb-2">
              <FileText className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">
                Nivel de estudios
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {educationLevels.map((level) => (
                <button
                  key={level}
                  type="button"
                  onClick={() => onDetailsChange('educationLevel', level)}
                  className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                    occupationDetails.educationLevel === level
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {level}
                </button>
              ))}
            </div>
            {errors.educationLevel && (
              <p className="mt-1 text-xs text-red-500">{errors.educationLevel}</p>
            )}
          </div>
        )}
        
        <div>
          <div className="flex items-center mb-2">
            <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
            <label className="text-xs font-light text-gray-700">
              {occupation === 'desempleado' || occupation === 'estudiante' 
                ? 'Ingreso mensual del hogar' 
                : 'Ingreso mensual neto'}
            </label>
          </div>
          
          <div>
            <div className="relative">
              <span className="absolute left-0 top-1/2 transform -translate-y-1/2 text-gray-600 text-sm">$</span>
              <input
                type="text"
                value={occupationDetails.monthlySalary}
                onChange={(e) => formatCurrency(e.target.value)}
                placeholder="0"
                inputMode="numeric"
                className="form-input pl-3"
              />
            </div>
            {errors.monthlySalary && (
              <p className="mt-1 text-xs text-red-500">{errors.monthlySalary}</p>
            )}
          </div>
        </div>
        
        {['empleado', 'monotributista', 'empleador', 'jubilado'].includes(occupation) && (
          <div>
            <div className="flex items-center mb-2">
              <Calendar className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">
                {occupation === 'jubilado' 
                  ? 'Años como jubilado/pensionado' 
                  : 'Antigüedad (años)'}
              </label>
            </div>
            
            <div>
              <input
                type="text"
                value={occupationDetails.yearsEmployed}
                onChange={(e) => onDetailsChange('yearsEmployed', e.target.value.replace(/\D/g, ''))}
                placeholder="0"
                inputMode="numeric"
                className="form-input"
              />
              {errors.yearsEmployed && (
                <p className="mt-1 text-xs text-red-500">{errors.yearsEmployed}</p>
              )}
            </div>
          </div>
        )}

        {occupation !== 'estudiante' && (
          <div>
            <div className="flex items-center mb-2">
              <History className="w-4 h-4 mr-2 text-blue-600" />
              <label className="text-xs font-light text-gray-700">
                ¿Ha tenido préstamos anteriores?
              </label>
            </div>
            
            <div className="grid grid-cols-2 gap-3">
              {['Sí', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onDetailsChange('previousLoans', option)}
                  className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                    occupationDetails.previousLoans === option
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>
        )}

        <div>
          <div className="flex items-center mb-2">
            <Target className="w-4 h-4 mr-2 text-blue-600" />
            <label className="text-xs font-light text-gray-700">
              Propósito del préstamo
            </label>
          </div>
          
          <select
            value={occupationDetails.loanPurpose || ''}
            onChange={(e) => onDetailsChange('loanPurpose', e.target.value)}
            className="w-full px-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none cursor-pointer hover:bg-white/80"
          >
            <option value="">Seleccione el propósito</option>
            <option value="vivienda">Vivienda</option>
            <option value="vehiculo">Vehículo</option>
            <option value="educacion">Educación</option>
            <option value="negocio">Negocio</option>
            <option value="consolidacion">Consolidación de deudas</option>
            <option value="otro">Otro</option>
          </select>
        </div>

        {/* Guarantor Section */}
        <div className="pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-blue-600" />
              <span className="text-sm font-medium text-gray-700">¿Tiene un garante?</span>
            </div>
            <div className="flex gap-2">
              {['Sí', 'No'].map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => onGuarantorChange({ 
                    hasGuarantor: option === 'Sí',
                    ...(option === 'No' ? {} : guarantor)
                  })}
                  className={`py-1.5 px-4 rounded-lg text-sm font-light transition-colors ${
                    (option === 'Sí' ? guarantor.hasGuarantor : !guarantor.hasGuarantor)
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
          </div>

          {guarantor.hasGuarantor && (
            <div className="space-y-6 bg-gray-50/50 p-6 rounded-xl mt-4">
              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Nombre completo del garante
                  </label>
                </div>
                <input
                  type="text"
                  value={guarantor.name || ''}
                  onChange={(e) => onGuarantorChange({ ...guarantor, name: e.target.value })}
                  placeholder="Nombre y apellido"
                  className="form-input"
                />
                {errors.guarantorName && (
                  <p className="mt-1 text-xs text-red-500">{errors.guarantorName}</p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <CreditCard className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    DNI del garante
                  </label>
                </div>
                <input
                  type="text"
                  value={guarantor.dni || ''}
                  onChange={(e) => onGuarantorChange({ ...guarantor, dni: e.target.value.replace(/\D/g, '') })}
                  placeholder="Número de DNI"
                  inputMode="numeric"
                  className="form-input"
                />
                {errors.guarantorDni && (
                  <p className="mt-1 text-xs text-red-500">{errors.guarantorDni}</p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <User className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Relación con el garante
                  </label>
                </div>
                <div className="grid grid-cols-2 gap-2">
                  {relationships.map((rel) => (
                    <button
                      key={rel}
                      type="button"
                      onClick={() => onGuarantorChange({ ...guarantor, relationship: rel })}
                      className={`py-2 px-3 rounded-lg text-sm font-light transition-colors ${
                        guarantor.relationship === rel
                          ? 'bg-blue-600 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {rel}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Phone className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Teléfono del garante
                  </label>
                </div>
                <input
                  type="tel"
                  value={guarantor.phone || ''}
                  onChange={(e) => onGuarantorChange({ ...guarantor, phone: e.target.value.replace(/\D/g, '') })}
                  placeholder="Número de teléfono"
                  inputMode="numeric"
                  className="form-input"
                />
                {errors.guarantorPhone && (
                  <p className="mt-1 text-xs text-red-500">{errors.guarantorPhone}</p>
                )}
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Mail className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Email del garante (opcional)
                  </label>
                </div>
                <input
                  type="email"
                  value={guarantor.email || ''}
                  onChange={(e) => onGuarantorChange({ ...guarantor, email: e.target.value })}
                  placeholder="Correo electrónico"
                  className="form-input"
                />
              </div>

              <div>
                <div className="flex items-center mb-2">
                  <Building2 className="w-4 h-4 mr-2 text-blue-600" />
                  <label className="text-xs font-light text-gray-700">
                    Dirección del garante (opcional)
                  </label>
                </div>
                <input
                  type="text"
                  value={guarantor.address || ''}
                  onChange={(e) => onGuarantorChange({ ...guarantor, address: e.target.value })}
                  placeholder="Dirección completa"
                  className="form-input"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      
      <div className="flex gap-4">
        <button 
          onClick={onBack}
          className="w-1/3 py-3.5 bg-gray-100 hover:bg-gray-200 text-gray-800 text-sm font-light tracking-wide rounded-lg transition-colors flex items-center justify-center group"
        >
          <ChevronLeft className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" />
          Volver
        </button>
        
        <button 
          onClick={handleNext}
          disabled={isLoading}
          className="w-2/3 py-3.5 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center group relative"
        >
          {isLoading ? (
            <div className="absolute inset-0 flex items-center justify-center bg-black">
              <div className="w-6 h-6 border-2 border-white/20 border-t-white rounded-full animate-spin"></div>
            </div>
          ) : (
            <>
              Continuar
              <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
            </>
          )}
        </button>
      </div>
    </div>
  );
};