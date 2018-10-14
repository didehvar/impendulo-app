export default interface JwtToken {
  email: string;
  name: string;
  picture: string;
  'https://app.impendulo.org/created_at': string;
  'https://app.impendulo.org/id_verification': string;
}
