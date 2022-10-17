import {IVAOption, LocationOption} from './models';

export const LocationOptions: LocationOption[] = [
  {
    id: 11,
    label: 'Bogotá, D.C.',
    subOptions: [
      {
        id: 11001,
        label: 'Bogotá, D.C.',
        taxValue: 0.414,
      },
    ],
  },
  {
    id: 47,
    label: 'Magdalena',
    subOptions: [
      {
        id: 47189,
        label: 'Ciénega',
        taxValue: 0.42,
      },
      {
        id: 47288,
        label: 'Fundación',
        taxValue: 0.3,
      },
      {
        id: 47245,
        label: 'El Blanco',
        taxValue: 0.5,
      },
      {
        id: 47555,
        label: 'Plato',
        taxValue: 0.42,
      },
      {
        id: 47001,
        label: 'Santa Marta',
        taxValue: 0.5,
      },
    ],
  },
  {
    id: 54,
    label: 'Norte de Santander',
    subOptions: [
      {
        id: 54405,
        label: 'Los Patios',
        taxValue: 1.0,
      },
    ],
  },
  {
    id: 63,
    label: 'Quindío',
    subOptions: [
      {
        id: 63001,
        label: 'Armenia',
        taxValue: 0.3,
      },
      {
        id: 63130,
        label: 'Calarcá',
        taxValue: 0.25,
      },
    ],
  },
  {
    id: 68,
    label: 'Santander',
    subOptions: [
      {
        id: 68001,
        label: 'Santander',
        taxValue: 0.5,
      },
      {
        id: 68081,
        label: 'Barrancabermeja',
        taxValue: 0.4,
      },
      {
        id: 25245,
        label: 'El Colegio',
        taxValue: 0.4,
      },
      {
        id: 68276,
        label: 'Floridablanca',
        taxValue: 0.6,
      },
    ],
  },
  {
    id: 70,
    label: 'Sucre',
    subOptions: [
      {
        id: 70001,
        label: 'Sincelejo',
        taxValue: 0.3,
      },
      {
        id: 70215,
        label: 'Corozal',
        taxValue: 0.42,
      },
      {
        id: 70708,
        label: 'San Marcos',
        taxValue: 0.5,
      },
    ],
  },
  {
    id: 76,
    label: 'Valle del Cauca',
    subOptions: [
      {
        id: 76622,
        label: 'Roldanillo',
        taxValue: 0.5,
      },
      {
        id: 76113,
        label: 'Bugalagrande',
        taxValue: 0.5,
      },
    ],
  },
  {
    id: 5,
    label: 'Antioquia',
    subOptions: [
      {
        id: 5042,
        label: 'Santa Fé De Antioquia',
        taxValue: 0.8,
      },
      {
        id: 5628,
        label: 'Sabanalarga',
        taxValue: 0.5,
      },
      {
        id: 5308,
        label: 'Girardota',
        taxValue: 0.5,
      },
      {
        id: 5001,
        label: 'Medellín',
        taxValue: 0.2,
      },
      {
        id: 5045,
        label: 'Apartadó',
        taxValue: 0.5,
      },
      {
        id: 5079,
        label: 'Barbosa',
        taxValue: 0.5,
      },
      {
        id: 5088,
        label: 'Bello',
        taxValue: 0.2,
      },
      {
        id: 5101,
        label: 'Ciudad Bolívar',
        taxValue: 0.5,
      },
      {
        id: 5318,
        label: 'Guarne',
        taxValue: 0.5,
      },
      {
        id: 5360,
        label: 'Itagüi',
        taxValue: 0.5,
      },
      {
        id: 5376,
        label: 'La Ceja',
        taxValue: 0.5,
      },
      {
        id: 5440,
        label: 'Marinilla',
        taxValue: 0.5,
      },
      {
        id: 5631,
        label: 'Sabaneta',
        taxValue: 0.2,
      },
      {
        id: 5837,
        label: 'Turbo',
        taxValue: 0.5,
      },
    ],
  },
  {
    id: 25,
    label: 'Cundinamarca',
    subOptions: [
      {
        id: 25513,
        label: 'Pacho',
        taxValue: 1.0,
      },
      {
        id: 25290,
        label: 'Fusagasugá',
        taxValue: 0.5,
      },
      {
        id: 25295,
        label: 'Gachancipá',
        taxValue: 0.4,
      },
      {
        id: 25175,
        label: 'Chía',
        taxValue: 0.5,
      },
      {
        id: 25307,
        label: 'Girardot',
        taxValue: 0.5,
      },
      {
        id: 25386,
        label: 'La Mesa',
        taxValue: 1.0,
      },
    ],
  },
  {
    id: 15,
    label: 'Boyacá',
    subOptions: [
      {
        id: 15496,
        label: 'Moniquirá',
        taxValue: 0.3,
      },
      {
        id: 15001,
        label: 'Tunja',
        taxValue: 0.5,
      },
      {
        id: 15238,
        label: 'Duitama',
        taxValue: 0.39,
      },
    ],
  },
  {
    id: 8,
    label: 'Atlántico',
    subOptions: [
      {
        id: 8001,
        label: 'Barranquilla',
        taxValue: 0.42,
      },
      {
        id: 8296,
        label: 'Galapa',
        taxValue: 0.5,
      },
      {
        id: 8638,
        label: 'Sabanalarga',
        taxValue: 0.5,
      },
    ],
  },
  {
    id: 13,
    label: 'Bolívar',
    subOptions: [
      {
        id: 13052,
        label: 'Arjona',
        taxValue: 0.5,
      },
      {
        id: 13430,
        label: 'Magangué',
        taxValue: 0.42,
      },
    ],
  },
  {
    id: 20,
    label: 'Cesar',
    subOptions: [
      {
        id: 20001,
        label: 'Valledupar',
        taxValue: 0.42,
      },
    ],
  },
  {
    id: 23,
    label: 'Córdoba',
    subOptions: [
      {
        id: 23079,
        label: 'Buenavista',
        taxValue: 1.0,
      },
    ],
  },
  {
    id: 52,
    label: 'Nariño',
    subOptions: [
      {
        id: 52001,
        label: 'Pasto',
        taxValue: 0.25,
      },
    ],
  },
  {
    id: 73,
    label: 'Tolima',
    subOptions: [
      {
        id: 73319,
        label: 'Guamo',
        taxValue: 1.0,
      },
    ],
  },
];

export const IVAOptions: IVAOption[] = [
  {id: 1, label: 'IVA 5%', value: 5},
  {id: 2, label: 'IVA 19%', value: 19},
  {id: 3, label: 'Sin IVA', value: 0},
];

export const DefaultIVAOption: IVAOption = IVAOptions[2];

export const TreintaPercentage = 2.99;
export const ReteFuentePercentage = 1.5;
export const ReteIVA = 15;
