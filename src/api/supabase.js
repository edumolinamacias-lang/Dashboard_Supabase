export const getSensorData = async () => {
  // Obtenemos las variables correctamente desde el entorno de Vite
  const SUPABASE_URL = import.meta.env.VITE_SUPABASE_URL;
  const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  try {
    const response = await fetch(
      `${SUPABASE_URL}/rest/v1/sensor_de_datos?select=*&order=creado_en.desc&limit=10`,
      {
        method: 'GET',
        headers: {
          apikey: SUPABASE_KEY,
          Authorization: `Bearer ${SUPABASE_KEY}`,
          'Content-Type': 'application/json',
          Prefer: 'return=representation'
        }
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Supabase REST error:', response.status, errorText);
      throw new Error('Error al obtener datos');
    }

    return await response.json();
  } catch (error) {
    console.error(error);
    return [];
  }
};
