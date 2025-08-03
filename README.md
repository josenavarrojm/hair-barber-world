# Hair Barber World

Hair Barber World es una aplicación móvil desarrollada con React Native y Expo que permite a los usuarios descubrir salones de belleza y barberías, y reservar servicios utilizando un sistema de créditos. Este proyecto fue desarrollado como parte de una prueba técnica.

## 🚀 Instrucciones para ejecutar el proyecto

1. Clona el repositorio:

   ```bash
   git clone https://github.com/josenavarrojm/hair-barber-world.git
   cd hair-barber-world
   ```

2. Instala las dependencias:

   ```bash
   npm install
   ```

3. Inicia el servidor de desarrollo:

   ```bash
   npx expo start
   ```

4. Escanea el código QR con la app Expo Go en tu dispositivo móvil o usa un emulador.

## ✅ Funcionalidades completadas

- Visualización de salones disponibles.
- Búsqueda por nombre de salón.
- Filtrado por categoría de servicios (corte, barbería, cejas, etc.).
- Ordenamiento por precio y calificación.
- Visualización de detalles de cada salón.
- Sistema de créditos:
  - Los usuarios pueden reservar si tienen suficientes créditos.
  - Muestra notificación si no tienen créditos suficientes.
- Reservas activadas solo si el usuario tiene suficientes créditos.
- Sistema de notificaciones tipo Toast.
- Responsive según tamaño de pantalla.
- Gestión global del estado con contextos (`appContext`, `ToastContext`).
- Fuentes personalizadas.

## 🛠 Tecnologías utilizadas

- React Native con Expo
- TypeScript
- Tailwind CSS (con NativeWind)
- Context API para manejo de estado global
- AsyncStorage para persistencia local
- EAS Build para despliegue
- Hooks personalizados (`useScreenDimension`, `useThemeColor`, etc.)

## 💡 Decisiones de diseño y consideraciones técnicas

- **Sistema de créditos:** En vez de simular autenticación o pagos reales, se utilizó una variable `credits` en el contexto global para controlar si un usuario puede reservar o no.
- **Contextos compartidos:** Se usaron para centralizar información de la app y facilitar la gestión de notificaciones y créditos.
- **Diseño UI:** Inspirado en aplicaciones modernas de reservas, con componentes reutilizables (`SalonCard`, `BookingFormCard`, `CustomDropDownMenuCats`, etc.).
- **Paginación y filtrado:** Simulados en el cliente para este reto técnico, sin backend real.
- **Fuentes personalizadas:** Integradas para mejorar la estética del branding.
- **Toast de éxito/error:** Notifica cambios y errores de forma clara al usuario.

---

Desarrollado por [@josenavarrojm](https://github.com/josenavarrojm)
