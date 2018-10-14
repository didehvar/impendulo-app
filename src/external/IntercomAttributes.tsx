export default interface IntercomAttributes {
  app_id: string;
  custom_launcher_selector?: string;

  email?: string;
  created_at?: string;
  name?: string;
  user_hash?: string;
  avatar?: {
    type: 'avatar';
    image_url: string;
  };
}
