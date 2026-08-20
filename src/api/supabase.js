export const getSensorData = async () => {
  try {
    const response = await fetch(
      // Se corrigió 'created_at' por 'creado_en' según tu esquema de Supabase
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