📄 File Authenticator API (V1 – Demo)

API para firmar y verificar documentos usando criptografía moderna
(RSA + SHA-256) y almacenamiento de firmas en SQLite con Prisma.

⚠️ Este repositorio corresponde a la versión V1 (Demo pública).
La versión V2 (comercial) incluye funcionalidades avanzadas y no es open-source.

🚀 ¿Qué hace esta API?

Genera un hash SHA-256 del archivo

Firma el hash usando RSA (clave privada)

Protege la firma mediante cifrado AES

Permite verificar:

✅ Integridad del archivo

✅ Autenticidad de la firma

Funciona con cualquier tipo de archivo

No modifica el archivo original

📌 Ideal para validación técnica, pruebas y demostraciones.

✨ Características (V1)

🔐 Firma digital de archivos

🧾 Verificación de integridad y autenticidad

🔑 Criptografía:

SHA-256 (hash)

RSA (firma digital)

AES (protección de la firma)

📤 Soporte para:

Subida de archivos (multipart/form-data)

Archivos en Base64 (application/json)

🗄️ Persistencia con SQLite + Prisma

⚙️ API construida con NestJS

🧱 Tecnologías

Node.js (>= 18)

NestJS

Crypto (RSA + AES + SHA-256)

Prisma ORM

SQLite

Multer

📦 Requisitos

Antes de empezar asegúrate de tener instalado:

Node.js >= 18

npm o yarn

Git

📥 Clonar el repositorio
git clone https://github.com/gimzz/file-authenticator.git
cd file-authenticator

📦 Instalar dependencias
npm install

🔐 Variables de entorno

Crea un archivo .env en la raíz del proyecto:

SECRET_KEY=una_clave_super_secreta_y_larga_123456
DATABASE_URL="file:./prisma/sign.db"

📌 Notas importantes

SECRET_KEY se usa para AES (mínimo recomendado: 32 caracteres)

SQLite se crea automáticamente

🔑 Llaves RSA

Crea una carpeta keys/ en la raíz:

mkdir keys


Genera las llaves:

openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key

🗄️ Base de datos (Prisma)

Generar cliente Prisma:

npm run db:generate


Crear la base de datos:

npm run db:push

▶️ Ejecutar el proyecto

Modo desarrollo:

npm run start:dev


La API quedará disponible en:

http://localhost:3000

🔐 Endpoints principales (V1)
📌 Firmar archivo

POST /signature/sign/file

Content-Type: multipart/form-data

Body:

file: cualquier tipo de archivo
(PDF, JPG, PNG, DOC, XLS, PPT, TXT, ZIP, etc.)


📌 Firmar archivo (Base64)

POST /signature/sign/base64

Content-Type: application/json

{
  "fileBuffer64": "JVBERi0xLjQKJ..."
}

📌 Verificar archivo

POST /signature/verify

Content-Type: multipart/form-data

Body:

file: archivo a verificar


---

### 📌 Verificar Archivo (Base64)

```http
POST /signature/verify
Content-Type: application/json
```

```json
{
  "fileBuffer64": "JVBERi0xLjQKJ..."
}
```

📌 Valida que:

El archivo no fue modificado

La firma corresponde al archivo original

✅ Flujo de verificación

Se calcula el hash SHA-256 del archivo

Se busca la firma asociada en la base de datos

Se descifra la firma (AES)

Se valida con la clave pública RSA

Si el archivo fue modificado → ❌ inválido

🧪 Seguridad

🔒 Cualquier cambio en el archivo invalida la firma

🔐 La verificación siempre depende del hash

📎 El archivo original nunca se modifica

🚧 Limitaciones de esta versión

Esta V1 es solo una demo técnica.

👉 La V2 (comercial) incluye:

Códigos QR de verificación

Verificación pública sin exponer claves

Revocación de documentos

UI pública

Seguridad avanzada

Arquitectura orientada a SaaS

👨‍💻 Autor

Desarrollado por Gimzz
Proyecto de demostración / portafolio técnico.