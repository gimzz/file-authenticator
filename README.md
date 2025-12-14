# 📄 File Authenticator API

API para **firmar y verificar documentos** usando criptografía (RSA + SHA-256) y almacenamiento de firmas en **SQLite con Prisma**. Soporta firma y verificación tanto por **archivo** como por **Base64**.

---

## 🚀 Características

* Firma digital de Archvos
* Verificación de integridad y autenticidad
* Soporte para:

  * Subida de archivos (`multipart/form-data`)
  * Archivos en Base64 (`application/json`)
* Cifrado AES para proteger la firma
* Persistencia con **SQLite + Prisma**
* API construida con **NestJS**

---

## 🧱 Tecnologías

* Node.js (>= 18)
* NestJS
* Crypto (RSA + AES + SHA-256)
* Prisma ORM
* SQLite
* Multer

---

## 📦 Requisitos

Antes de empezar asegúrate de tener instalado:

* Node.js >= 18
* npm o yarn
* Git

---

## 📥 Clonar el repositorio

```bash
git clone https://github.com/gimzz/file-authenticator.git
cd file-authenticator
```

---

## 📦 Instalar dependencias

```bash
npm install
```

---

## 🔐 Variables de entorno

Crea un archivo `.env` en la raíz del proyecto:

```env
SECRET_KEY=una_clave_super_secreta_y_larga_123456
DATABASE_URL="file:./prisma/sing.db"
```

📌 **Notas importantes**:

* `SECRET_KEY` se usa para AES (mínimo recomendado: 32 caracteres)
* SQLite se crea automáticamente

---

## 🔑 Llaves RSA

Crea una carpeta `keys/` en la raíz:

```bash
mkdir keys
```

Genera las llaves:

```bash
openssl genrsa -out keys/private.key 2048
openssl rsa -in keys/private.key -pubout -out keys/public.key
```

---

## 🗄️ Base de datos (Prisma)

Generar cliente Prisma:

```bash
npm run db:generate
```

Crear la base de datos:

```bash
npm run db:push
```

---

## ▶️ Ejecutar el proyecto

Modo desarrollo:

```bash
npm run start:dev
```

La API quedará disponible en:

```
http://localhost:3000
```

---

## 🔐 Endpoints principales

### 📌 Firmar Archivos

```http
POST /signature/sign/file
Content-Type: multipart/form-data
```

**Body**:

* `file`: PDF | JPG | PNG | DOC| XLS | PPT | TXT | ZIP | RAR | CBR | EPUB.

---

### 📌 Firmar Archivo (Base64)

```http
POST /signature/sign/base64
Content-Type: application/json
```

```json
{
  "pdfBase64": "JVBERi0xLjQKJ..."
}
```

---

### 📌 Verificar Archivo

```http
POST /signature/verify
Content-Type: multipart/form-data
```

**Body**:

* `file`: Archivo a verificar

---

### 📌 Verificar Archivo (Base64)

```http
POST /signature/verify
Content-Type: application/json
```

```json
{
  "pdfBase64": "JVBERi0xLjQKJ..."
}
```

📌 Este endpoint permite verificar documentos sin enviar archivos físicos.

---

## ✅ Flujo de verificación

1. Se calcula el hash del Archivo
2. Se busca la firma asociada en la base de datos
3. Se descifra la firma
4. Se valida con la clave pública
5. Si el archivo fue modificado → ❌ inválido

---

## 🧪 Seguridad

* Cualquier cambio en el Archivo invalida la firma
* La verificación siempre depende del hash


## 👨‍💻 Autor

Desarrollado por **Gimzz**

---

## 📌 Próximas mejoras

* Inserción de QR en el Archivo
* Endpoint público de verificación
* Auditoría de firmas
* Dockerización

---

✨ Proyecto educativo y demostrativo de firmas digitales en Archivos.
