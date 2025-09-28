import type { DonacionConfig } from '$content/models';

export const donacionConfig: DonacionConfig = {
  montosSugeridos: [2000, 5000, 10000, 15000],
  metodos: [
    {
      tipo: 'online',
      descripcion: 'Pago online con tarjeta (Stripe)'
    },
    {
      tipo: 'transferencia',
      descripcion: 'Transferencia bancaria o depósito',
      datos: {
        Banco: 'Nuevo Banco de Santa Fe',
        CBU: '3300000100000000000012',
        Alias: 'ove.guadalupe',
        Concepto: 'Colaboración OVE'
      }
    },
    {
      tipo: 'app',
      descripcion: 'App local (Mercado Pago / billeteras)',
      datos: {
        CVU: '0000003100045678901234',
        Alias: 'vocaciones.guadalupe',
        Concepto: 'Aporte Seminario'
      }
    }
  ],
  stripePublicKey: 'pk_test_xxxxxx'
};
