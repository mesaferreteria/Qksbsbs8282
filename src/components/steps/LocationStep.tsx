import React, { useState, useMemo } from 'react';
import { ChevronRight, ChevronLeft, MapPin, Search } from 'lucide-react';

interface LocationStepProps {
  province: string;
  onProvinceChange: (value: string) => void;
  onNext: () => void;
  onBack: () => void;
}

export const LocationStep: React.FC<LocationStepProps> = ({
  province,
  onProvinceChange,
  onNext,
  onBack
}) => {
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const validateForm = () => {
    if (!province) {
      setError('Por favor seleccione una provincia');
      return false;
    }
    setError(null);
    return true;
  };
  
  const handleNext = () => {
    if (validateForm()) {
      onNext();
    }
  };

  const provinces = [
    { id: 'bsas', name: 'Buenos Aires', region: 'Pampeana' },
    { id: 'caba', name: 'Ciudad Autónoma de Buenos Aires', region: 'Metropolitana' },
    { id: 'catamarca', name: 'Catamarca', region: 'Noroeste' },
    { id: 'chaco', name: 'Chaco', region: 'Nordeste' },
    { id: 'chubut', name: 'Chubut', region: 'Patagonia' },
    { id: 'cordoba', name: 'Córdoba', region: 'Pampeana' },
    { id: 'corrientes', name: 'Corrientes', region: 'Nordeste' },
    { id: 'entrerios', name: 'Entre Ríos', region: 'Pampeana' },
    { id: 'formosa', name: 'Formosa', region: 'Nordeste' },
    { id: 'jujuy', name: 'Jujuy', region: 'Noroeste' },
    { id: 'lapampa', name: 'La Pampa', region: 'Pampeana' },
    { id: 'larioja', name: 'La Rioja', region: 'Noroeste' },
    { id: 'mendoza', name: 'Mendoza', region: 'Cuyo' },
    { id: 'misiones', name: 'Misiones', region: 'Nordeste' },
    { id: 'neuquen', name: 'Neuquén', region: 'Patagonia' },
    { id: 'rionegro', name: 'Río Negro', region: 'Patagonia' },
    { id: 'salta', name: 'Salta', region: 'Noroeste' },
    { id: 'sanjuan', name: 'San Juan', region: 'Cuyo' },
    { id: 'sanluis', name: 'San Luis', region: 'Cuyo' },
    { id: 'santacruz', name: 'Santa Cruz', region: 'Patagonia' },
    { id: 'santafe', name: 'Santa Fe', region: 'Pampeana' },
    { id: 'santiago', name: 'Santiago del Estero', region: 'Noroeste' },
    { id: 'tierradelfuego', name: 'Tierra del Fuego', region: 'Patagonia' },
    { id: 'tucuman', name: 'Tucumán', region: 'Noroeste' }
  ];

  const filteredProvinces = useMemo(() => {
    if (!searchQuery) return provinces;
    const query = searchQuery.toLowerCase();
    return provinces.filter(
      province => 
        province.name.toLowerCase().includes(query) || 
        province.region.toLowerCase().includes(query)
    );
  }, [searchQuery]);

  const groupedProvinces = useMemo(() => {
    const groups = filteredProvinces.reduce((acc, province) => {
      if (!acc[province.region]) {
        acc[province.region] = [];
      }
      acc[province.region].push(province);
      return acc;
    }, {} as Record<string, typeof provinces>);

    return Object.entries(groups).sort(([a], [b]) => a.localeCompare(b));
  }, [filteredProvinces]);

  return (
    <div className="animate-fade-in py-2">
      <h2 className="text-lg font-light text-center tracking-wide text-gray-800 mb-8">
        Ubicación
      </h2>
      
      <div className="mb-12">
        <div className="flex items-center mb-4">
          <MapPin className="w-4 h-4 mr-2 text-blue-600" />
          <label className="text-xs font-light text-gray-700">Provincia de residencia</label>
        </div>
        
        <div className="relative mb-6">
          <div className="relative mb-4">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-4 w-4 text-gray-400" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Buscar provincia o región..."
              className="w-full pl-10 pr-4 py-3 bg-white/50 backdrop-blur-sm border border-gray-200 rounded-lg text-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <div className="space-y-6">
            {groupedProvinces.map(([region, provinces]) => (
              <div key={region}>
                <h3 className="text-xs font-medium text-gray-500 mb-3">{region}</h3>
                <div className="grid grid-cols-1 gap-2">
                  {provinces.map((prov) => (
                    <button
                      key={prov.id}
                      onClick={() => {
                        onProvinceChange(prov.name);
                        setError(null);
                      }}
                      className={`w-full px-4 py-3 rounded-lg text-left text-sm transition-all ${
                        province === prov.name
                          ? 'bg-blue-600 text-white'
                          : 'bg-white/50 hover:bg-white/80 text-gray-700'
                      }`}
                    >
                      {prov.name}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {error && (
            <p className="mt-2 text-xs text-red-500">{error}</p>
          )}
        </div>
        
        <div className="text-xs text-gray-500 bg-gray-50/50 p-4 rounded-lg">
          <p>
            Esta información es necesaria para verificar la disponibilidad de nuestros servicios 
            en su área de residencia.
          </p>
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
          className="w-2/3 py-3.5 bg-black/80 hover:bg-black text-white text-sm font-light tracking-wide rounded-lg shadow-sm transition-all duration-300 hover:shadow-md flex items-center justify-center group"
        >
          Continuar
          <ChevronRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};