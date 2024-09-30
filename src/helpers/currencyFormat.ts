import {formatNumber} from 'react-native-currency-input';

export const currencyFormat = ({
  name,
  value,
}: {
  name: string;
  value: string;
}) => {
  const regex = /[^0-9]/g;

  if (regex.test(value)) {
    return '';
  }

  const requireCurrency = ['Precio ', 'Metraje Total', 'Metraje Construido'];

  if (requireCurrency.some(el => name.includes(el))) {
    if (!value) {
      return '';
    }

    const formattedValue = formatNumber(Number(value), {
      separator: '.',
      precision: 2,
      delimiter: ',',
    });

    if (formattedValue === 'NaN') {
      return '';
    }

    return formattedValue;
  }

  return value;
};

export const formatHelper = (value: string) => {
  const formattedValue = formatNumber(Number(value), {
    separator: '.',
    precision: 2,
    delimiter: ',',
  });

  if (formattedValue === 'NaN') {
    return '';
  }

  return formattedValue;
};

export const padWithLeadingZeros = (num: any, totalLength: number) => {
  return String(num).padStart(totalLength, '0');
};

export const convertirMinutosAHorasYMinutos = (
  minutos: number,
): {horas: number; minutos: number} => {
  const horas = Math.floor(minutos / 60); // Obtener las horas completas
  const minutosRestantes = minutos % 60; // Obtener los minutos restantes
  return {horas, minutos: minutosRestantes};
};

export const calcularSubtotalYIVA = (
  total: number,
  tasaIVA: number,
  descuento: number,
): {subtotal: number; iva: number} => {
  console.info({descuento});
  
  const totaltmp = total - descuento;
  const subtotal = totaltmp / (1 + tasaIVA);
  
  const iva = totaltmp - subtotal;
  console.info({subtotal});
  console.info({iva});
  console.info({tasaIVA});
  console.info({total});
  return {subtotal, iva};
};

export const calcularTotalTarifa = (
  duration: number,
  testDiscount: any,
  discountCode: string,
) => {
  const valorUnitario = testDiscount ? 1.5 : 2;
  let tiemposminutos = convertirMinutosAHorasYMinutos(duration);
  const horas = padWithLeadingZeros(tiemposminutos.horas, 2);
  const minutos = padWithLeadingZeros(tiemposminutos.minutos, 2);
  let lostiempos = `${horas} horas : ${minutos} min`;
  let horasTotales = horas;
  console.info({duration});
  if (minutos > 0) {
    horasTotales++;
  }
  /** VALIDAMOS EL COBRO DE HORAS PARA QUE NO EXCEDA LA BASE MÁXIMA */
  horasTotales = parseInt(horasTotales, 10) > 10 ? 10 : horasTotales;
  /** FIN VALIDACIÓN */
  let tariff = horasTotales * valorUnitario;
  let total = parseFloat(tariff); // Cambia esto al total que desees calcular
  const tasaIVA = 0.15; // Cambia esto a la tasa de IVA aplicable en tu región

  let discounted = 0;
  if (testDiscount) {
    if (duration > 120) {
      discounted = parseFloat('3');
      tariff = tariff - 3;
    }
  }

  /* Aqui viene lo chido */
  // discountCode

  if (discountCode == 'freeforall') {
    discounted = total;
    tariff = 0;
  }

  if (discountCode == 'singleexit') {
    discounted = total;
    tariff = 0;
  }

  if (discountCode == 'twentyfivediscount') {
    discounted = total * 0.25;
    tariff = tariff - discounted;
  }

  if (discountCode == 'fiftydiscount') {
    discounted = total * 0.5;
    tariff = tariff - discounted;
  }

  const calculoSubtotalIva = calcularSubtotalYIVA(total, tasaIVA, discounted);

  return {
    duration,
    descuento: discounted.toFixed(2),
    subtotal: calculoSubtotalIva.subtotal.toFixed(2),
    iva: calculoSubtotalIva.iva.toFixed(2),
    total: tariff.toFixed(2),
    lostiempos,
  };
};

export const parseGMT5Date = (entrytime: any) => {
  const fechaGMT: string = entrytime;
  const fechaOriginal: Date = new Date(fechaGMT);
  const diferenciaGMT5: number = -5 * 60;
  const fechaGMT5: Date = new Date(
    fechaOriginal.getTime() + diferenciaGMT5 * 60 * 1000,
  );
  const cadenaFechaGMT5: string = fechaGMT5.toISOString();
  return cadenaFechaGMT5;
};
