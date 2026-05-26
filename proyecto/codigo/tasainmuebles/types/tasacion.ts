export type TipoInmueble =
  | 'casa'
  | 'depto'
  | 'terreno'
  | 'galpon'
  | 'local'
  | 'oficina';

export type EstadoTasacion =
  | 'borrador'
  | 'a_editar'
  | 'a_tasar'
  | 'en_comite'
  | 'tasada'
  | 'compartida';

export type MotivoTasacion =
  | 'venta'
  | 'alquiler'
  | 'sucesion'
  | 'divorcio'
  | 'judicial'
  | 'garantia'
  | 'contable'
  | 'seguro'
  | 'donacion'
  | 'otro';

export interface Tasacion {
  id: string;
  fecha: string;
  tipo: TipoInmueble;
  motivo: MotivoTasacion;
  estado: EstadoTasacion;
  estadoLabel: string;
  domicilio: string;
  solicitante: Solicitante;
  tasador: string;
  valorARS: number;
  valorUSD: number;
  fotos: string[];
  detalles: DetalleInmueble;
  descripcion: string;
}

export interface Solicitante {
  nombre: string;
  apellido: string;
  telefono: string;
  email?: string;
}

export interface DetalleInmueble {
  supTotal: string;
  supCubierta: string;
  dormitorios: string;
  banios: string;
  antiguedad: string;
  estado: string;
  amenities: string[];
}

export const SAMPLE_TASACIONES: Tasacion[] = [
  {
    id: '1578',
    fecha: '13/07/2026',
    tipo: 'casa',
    motivo: 'venta',
    estado: 'a_tasar',
    estadoLabel: 'A tasar',
    domicilio: 'Joaquín V. González 1895, Mendoza',
    tasador: 'Federico E.',
    valorARS: 0,
    valorUSD: 0,
    fotos: [],
    solicitante: { nombre: 'Mario', apellido: 'Pérez', telefono: '2615550001' },
    detalles: { supTotal: '480', supCubierta: '320', dormitorios: '4', banios: '3', antiguedad: '15', estado: 'Bueno', amenities: ['Pileta', 'Cochera', 'Jardín'] },
    descripcion: 'Casa estilo californiano sobre lote propio, con jardín delantero y galería techada. Excelente luminosidad y orientación norte.',
  },
  {
    id: '5603',
    fecha: '05/28/2026',
    tipo: 'depto',
    motivo: 'alquiler',
    estado: 'borrador',
    estadoLabel: 'Sin asignar',
    domicilio: 'Av. San Martín 2100, Mendoza',
    tasador: 'Gaspar N.',
    valorARS: 0,
    valorUSD: 0,
    fotos: [],
    solicitante: { nombre: 'Marcos', apellido: 'Barroso', telefono: '2615550002' },
    detalles: { supTotal: '80', supCubierta: '72', dormitorios: '2', banios: '1', antiguedad: '10', estado: 'Muy bueno', amenities: ['Balcón'] },
    descripcion: '',
  },
  {
    id: '05822',
    fecha: '02/04/2026',
    tipo: 'casa',
    motivo: 'sucesion',
    estado: 'en_comite',
    estadoLabel: 'En proceso',
    domicilio: 'Belgrano 450, Luján de Cuyo',
    tasador: 'Alfredo C.',
    valorARS: 142500000,
    valorUSD: 175000,
    fotos: [],
    solicitante: { nombre: 'Eleonora', apellido: 'Ferrari', telefono: '2615550003', email: 'efemorrai@gmail.com' },
    detalles: { supTotal: '320', supCubierta: '200', dormitorios: '3', banios: '2', antiguedad: '25', estado: 'Regular', amenities: ['Cochera', 'Parrilla'] },
    descripcion: 'Vivienda familiar con amplio jardín trasero. Necesita refacciones menores.',
  },
  {
    id: '00347',
    fecha: '23/12/2025',
    tipo: 'terreno',
    motivo: 'venta',
    estado: 'a_editar',
    estadoLabel: 'A editar',
    domicilio: 'Las Heras 789, Ciudad, Mendoza',
    tasador: 'Joaquín A.',
    valorARS: 0,
    valorUSD: 0,
    fotos: [],
    solicitante: { nombre: 'Valentina', apellido: 'Vitale', telefono: '2615550004' },
    detalles: { supTotal: '600', supCubierta: '0', dormitorios: '', banios: '', antiguedad: '0', estado: 'Bueno', amenities: [] },
    descripcion: '',
  },
  {
    id: '4472',
    fecha: '17/09/2025',
    tipo: 'depto',
    motivo: 'garantia',
    estado: 'en_comite',
    estadoLabel: 'En proceso',
    domicilio: 'Colón 1234, Ciudad, Mendoza',
    tasador: 'Gaspar N.',
    valorARS: 0,
    valorUSD: 0,
    fotos: [],
    solicitante: { nombre: 'Camila', apellido: 'Pereyra', telefono: '2615550005' },
    detalles: { supTotal: '55', supCubierta: '50', dormitorios: '1', banios: '1', antiguedad: '5', estado: 'Muy bueno', amenities: [] },
    descripcion: '',
  },
];
