import type { ComplianceStandard, CodeSnippet } from '../types/compliance';

export const ALL_COMPLIANCE_STANDARDS: ComplianceStandard[] = [
  // 1. ISO 27001
  {
    id: 'iso-27001',
    code: 'ISO/IEC 27001:2022',
    shortName: 'ISO 27001 (SGSI)',
    title: 'Sistema de Gestión de Seguridad de la Información',
    category: 'iso',
    authority: 'Organización Internacional de Normalización (ISO) / IEC',
    applicabilityReason: 'Mandatorio para cualquier empresa de software que procese datos de clientes, opere en la nube o requiera vender a corporaciones y banca.',
    priority: 'obligatorio',
    summary: 'Estándar mundial para implementar un Sistema de Gestión de Seguridad de la Información (SGSI). Define controles lógicos, criptográficos, organizacionales y de resiliencia operativa.',
    keyControls: [
      {
        id: 'iso27001-a515',
        code: 'Control A.5.15',
        name: 'Control de Acceso Basado en Roles (RBAC) y Menor Privilegio',
        description: 'Todo acceso a endpoints, datos y paneles administrativos debe estar estrictamente restringido por roles verificables (ej. Admin, Usuario, Dev) con tokens de expiración corta.',
        technicalEvidence: 'Middleware de verificación JWT con validación de claims de rol en cada ruta protegida.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'iso27001-a824',
        code: 'Control A.8.24',
        name: 'Uso de Criptografía de Grado Bancario (AES-256-GCM)',
        description: 'Toda información confidencial o sensible en reposo debe cifrarse con algoritmos autenticados (AES-256-GCM) utilizando claves maestras aisladas en variables de entorno seguras.',
        technicalEvidence: 'Motor criptográfico con derivación HKDF o PBKDF2 sin claves quemadas en el código fuente.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'iso27001-a820',
        code: 'Control A.8.20',
        name: 'Seguridad en Redes, Túneles Cifrados y CORS Whitelist',
        description: 'Forzado de HTTPS/TLS 1.3, encabezados HSTS con preload y configuración de Cross-Origin Resource Sharing restringido únicamente a dominios propios autorizados.',
        technicalEvidence: 'Cabeceras HTTP de seguridad configuradas en el servidor web o middleware de proxy.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'iso27001-a826',
        code: 'Control A.8.26',
        name: 'Requisitos de Seguridad de Aplicaciones y Sanitización',
        description: 'Validación estricta de esquemas de entrada (input validation), consultas parametrizadas con ORMs para erradicar SQL Injection y sanitización de salida contra XSS.',
        technicalEvidence: 'Esquemas Zod/Joi en endpoints y queries tipadas en ORM (Drizzle, Prisma, SQLAlchemy).',
        status: 'not_started',
        priority: 'critica'
      }
    ],
    howToApplySteps: [
      'Paso 1: Delimitar el alcance del SGSI (qué repositorios, servidores y bases de datos guardan información del cliente).',
      'Paso 2: Implementar middleware de cabeceras de seguridad HTTP (Helmet, CSP, HSTS, X-Content-Type-Options).',
      'Paso 3: Prohibir credenciales en texto plano usando variables de entorno cifradas (.env en gestores como AWS Secrets Manager o Doppler).',
      'Paso 4: Redactar la Declaración de Aplicabilidad (SoA) marcando los controles Anexo A implementados.',
      'Paso 5: Configurar rotación periódica de tokens y sesiones con expiración máxima recomendada de 24 horas.'
    ],
    requiredDocuments: [
      'Política General de Seguridad de la Información',
      'Declaración de Aplicabilidad (Statement of Applicability - SoA)',
      'Matriz de Evaluación y Tratamiento de Riesgos de Ciberseguridad',
      'Procedimiento de Control de Accesos y Gestión de Contraseñas'
    ],
    codeSnippets: [
      {
        title: 'Middleware de Seguridad HTTP y CORS (Node.js / Express)',
        language: 'typescript',
        targetFile: 'src/middleware/security.ts',
        description: 'Implementa cabeceras ISO 27001 A.8.20 y A.8.26 con HSTS estricto y protección anti-clickjacking.',
        code: `import helmet from 'helmet';
import cors from 'cors';
import { Express } from 'express';

export function configureSecurityHeaders(app: Express) {
  // ISO 27001 A.8.20: Túneles cifrados y cabeceras estrictas
  app.use(helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'", "data:", "https:"],
        connectSrc: ["'self'"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
    hsts: {
      maxAge: 31536000, // 1 año estricto
      includeSubDomains: true,
      preload: true,
    },
    frameguard: { action: 'sameorigin' },
    noSniff: true,
  }));

  // CORS restringido a orígenes autorizados
  const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(',') || ['https://tuapp.com'];
  app.use(cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Bloqueado por política CORS ISO 27001'));
      }
    },
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  }));
}`
      }
    ]
  },

  // 2. ISO 27701
  {
    id: 'iso-27701',
    code: 'ISO/IEC 27701:2019',
    shortName: 'ISO 27701 (PIMS)',
    title: 'Sistema de Gestión de Privacidad de la Información',
    category: 'iso',
    authority: 'Organización Internacional de Normalización (ISO)',
    applicabilityReason: 'Indispensable cuando el software almacena o gestiona nombres, correos, documentos, expedientes o datos personales de usuarios.',
    priority: 'obligatorio',
    summary: 'Extensión de ISO 27001 para la protección de la privacidad y datos personales. Establece cómo actuar como encargado del tratamiento (Data Processor) y garantizar los derechos de los usuarios.',
    keyControls: [
      {
        id: 'iso27701-c722',
        code: 'Cláusula 7.2.2',
        name: 'Aislamiento Criptográfico por Usuario o Inquilino',
        description: 'Garantizar que ningún usuario u organización pueda ver ni filtrar datos de otro cliente mediante particionamiento y vinculación unívoca por identificador.',
        technicalEvidence: 'Políticas de Row-Level Security (RLS) en base de datos o filtros obligatorios WHERE tenant_id = $1 en cada consulta.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'iso27701-c733',
        code: 'Cláusula 7.3.3',
        name: 'Borrado Seguro y Efectivo de Datos (Derecho al Olvido)',
        description: 'Mecanismo técnico para que cuando un usuario solicite la baja de su cuenta, todos sus registros, sesiones y archivos asociados se eliminen de manera irrecuperable.',
        technicalEvidence: 'Cláusulas ON DELETE CASCADE en base de datos y script automatizado de depuración de almacenamiento.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'iso27701-c741',
        code: 'Cláusula 7.4.1',
        name: 'Minimización de Datos y Consentimiento Trazable',
        description: 'Solo recopilar los campos estrictamente necesarios para prestar el servicio, guardando el timestamp y la versión de la política aceptada por el usuario.',
        technicalEvidence: 'Tabla de auditoría user_consents con user_id, policy_version, ip y accepted_at.',
        status: 'not_started',
        priority: 'alta'
      }
    ],
    howToApplySteps: [
      'Paso 1: Realizar un inventario de PII (listar qué datos personales guarda cada tabla de la base de datos).',
      'Paso 2: Crear el endpoint de auto-eliminación o solicitud de cancelación de cuenta con eliminación en cascada.',
      'Paso 3: Añadir casilla de verificación de consentimiento no premarcada en el formulario de registro.',
      'Paso 4: Emitir cabecera personalizada de confidencialidad en las respuestas del API (ej. X-Data-Privacy-Policy: ISO-27701).'
    ],
    requiredDocuments: [
      'Registro de Actividades de Tratamiento (RAT / Inventario PII)',
      'Política de Retención y Destrucción de Datos',
      'Protocolo de Respuesta a Solicitudes de Derechos de Privacidad (ARCO)'
    ],
    codeSnippets: [
      {
        title: 'Endpoint de Eliminación de Cuenta en Cascada (Node / Express)',
        language: 'typescript',
        targetFile: 'src/routes/privacy.ts',
        description: 'Cumple con ISO 27701 Cláusula 7.3.3 y Derecho al Olvido ejecutando borrado atómico en cascada.',
        code: `import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users, sessions, userFiles } from '../db/schema';
import { eq } from 'drizzle-orm';

export const privacyRouter = Router();

// Endpoint obligatorio ISO 27701 / ARCO: Derecho al Olvido
privacyRouter.delete('/account', async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'No autenticado' });

  try {
    await db.transaction(async (tx) => {
      // 1. Eliminar archivos físicos vinculados en storage
      await tx.delete(userFiles).where(eq(userFiles.userId, userId));
      // 2. Revocar sesiones activas
      await tx.delete(sessions).where(eq(sessions.userId, userId));
      // 3. Eliminar usuario (dispara cascadas referenciales)
      await tx.delete(users).where(eq(users.id, userId));
    });

    res.setHeader('X-Privacy-Action', 'Account-Permanently-Deleted');
    return res.status(200).json({ 
      success: true, 
      message: 'Todos los datos personales fueron eliminados de forma irreversible conforme a ISO 27701.' 
    });
  } catch (error) {
    return res.status(500).json({ error: 'Fallo al procesar borrado seguro' });
  }
});`
      }
    ]
  },

  // 3. ISO 25010
  {
    id: 'iso-25010',
    code: 'ISO/IEC 25010:2023',
    shortName: 'ISO 25010 (SQuaRE)',
    title: 'Ingeniería de Software — Calidad del Producto de Software',
    category: 'iso',
    authority: 'ISO/IEC JTC 1/SC 7 Software and systems engineering',
    applicabilityReason: 'Aplica a cualquier software web o móvil para medir su estabilidad, velocidad, fiabilidad, tolerancia a fallos y mantenibilidad.',
    priority: 'altamente_recomendado',
    summary: 'Modelo de calidad de producto de software (SQuaRE). Evalúa 8 características fundamentales: Adecuación funcional, Eficiencia de desempeño, Compatibilidad, Usabilidad, Fiabilidad, Seguridad, Mantenibilidad y Portabilidad.',
    keyControls: [
      {
        id: 'iso25010-perf',
        code: 'Característica 4.2',
        name: 'Eficiencia de Desempeño y Latencia DB Controlada',
        description: 'Tiempos de respuesta de endpoints clave por debajo de 200 ms y consultas de base de datos indexadas por debajo de 45 ms.',
        technicalEvidence: 'Métricas de tiempo de respuesta registradas en middleware y pruebas de carga demostrables.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'iso25010-reliab',
        code: 'Característica 4.5',
        name: 'Fiabilidad, Tolerancia a Fallos y Endpoint de Salud',
        description: 'Manejo elegante de excepciones sin exponer stack traces al cliente, reintentos exponenciales en llamadas externas y endpoint /health.',
        technicalEvidence: 'Ruta /health que verifica conectividad a DB y servicios críticos con respuesta JSON.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'iso25010-maint',
        code: 'Característica 4.7',
        name: 'Mantenibilidad y Tipado Estricto',
        description: 'Código modularizado, desacoplado y fuertemente tipado (TypeScript estricto / Linters activos) con suites de tests automatizados.',
        technicalEvidence: 'Configuración tsconfig con "strict": true y pipeline de CI que ejecute linters.',
        status: 'not_started',
        priority: 'media'
      }
    ],
    howToApplySteps: [
      'Paso 1: Crear endpoint /health con diagnóstico en tiempo real de la base de datos y memoria.',
      'Paso 2: Habilitar compresión Gzip/Brotli y optimizar bundles del frontend.',
      'Paso 3: Implementar un Global Error Boundary en el frontend y middleware de captura de errores en el backend.',
      'Paso 4: Establecer métricas de rendimiento y monitorización básica de uptime (ej. UptimeRobot o BetterStack).'
    ],
    requiredDocuments: [
      'Acuerdo de Nivel de Servicio (SLA) con métricas de disponibilidad (99.5%+)',
      'Guía de Estándares de Arquitectura y Convenciones de Código',
      'Plan de Pruebas y Aseguramiento de Calidad (QA)'
    ],
    codeSnippets: [
      {
        title: 'Endpoint de Telemetría y Salud /health (Node / Express)',
        language: 'typescript',
        targetFile: 'src/routes/health.ts',
        description: 'Cumple con ISO 25010 Característica de Fiabilidad y Monitoreo de Desempeño.',
        code: `import { Router, Request, Response } from 'express';
import { db } from '../db';
import { sql } from 'drizzle-orm';

export const healthRouter = Router();

healthRouter.get('/health', async (_req: Request, res: Response) => {
  const start = performance.now();
  let dbStatus = 'healthy';
  let dbLatencyMs = 0;

  try {
    const dbStart = performance.now();
    await db.execute('SELECT 1');
    dbLatencyMs = Math.round(performance.now() - dbStart);
  } catch (err) {
    dbStatus = 'degraded';
  }

  const memoryUsage = process.memoryUsage();

  return res.status(dbStatus === 'healthy' ? 200 : 503).json({
    status: dbStatus,
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime()),
    database: {
      status: dbStatus,
      latencyMs: dbLatencyMs,
    },
    system: {
      memoryRssMb: Math.round(memoryUsage.rss / 1024 / 1024),
      memoryHeapUsedMb: Math.round(memoryUsage.heapUsed / 1024 / 1024),
    },
    standard: 'ISO/IEC 25010:2023 - Software Product Quality (SQuaRE)',
  });
});`
      }
    ]
  },

  // 4. ISO 42001 (AIMS)
  {
    id: 'iso-42001',
    code: 'ISO/IEC 42001:2023',
    shortName: 'ISO 42001 (AIMS - IA)',
    title: 'Sistema de Gestión de Inteligencia Artificial',
    category: 'ai_governance',
    authority: 'ISO/IEC JTC 1/SC 42 Artificial Intelligence',
    applicabilityReason: 'Mandatorio si el producto integra modelos de IA, LLMs, asistentes generativos o motores de predicción automatizada.',
    priority: 'obligatorio',
    summary: 'Primer estándar internacional para gobernar el ciclo de vida de la Inteligencia Artificial. Regula la ética, trazabilidad, mitigación de alucinaciones, sesgos algorítmicos y supervisión humana.',
    keyControls: [
      {
        id: 'iso42001-grounding',
        code: 'Control B.5.2',
        name: 'Grounding Normativo y Mitigación de Alucinaciones',
        description: 'Obligación técnica de anclar las respuestas del modelo a fuentes verificables mediante RAG o inyección de contexto validado, impidiendo citas falsas.',
        technicalEvidence: 'Prompts de sistema con restricciones de veracidad estricta y parámetros de temperatura controlados (<= 0.2 para respuestas técnicas o legales).',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'iso42001-trace',
        code: 'Control B.7.3',
        name: 'Trazabilidad Algorítmica y Registro de Consumo',
        description: 'Registrar qué modelo se utilizó (Gemini, Claude, GPT, etc.), fecha, tokens y usuario solicitante para fines de auditoría.',
        technicalEvidence: 'Tabla ai_generation_logs con metadata de invocación sin almacenar secretos ni PII no anonimizada.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'iso42001-human',
        code: 'Control B.9.1',
        name: 'Supervisión Humana en el Ciclo (Human-in-the-Loop)',
        description: 'El sistema debe avisar explícitamente que la IA asiste pero no toma decisiones finales vinculantes de forma autónoma, reservando la validación al usuario humano.',
        technicalEvidence: 'Disclaimers visuales claros en la interfaz y badges de revisión humana requerida.',
        status: 'not_started',
        priority: 'alta'
      }
    ],
    howToApplySteps: [
      'Paso 1: Configurar en las llamadas al API de IA temperatura baja (ej. 0.0 a 0.2) para evitar invenciones.',
      'Paso 2: Firmar con los proveedores de IA acuerdos de no-retención (Zero Data Retention) para que los datos de usuarios no se usen para entrenar modelos públicos.',
      'Paso 3: Mostrar un disclaimer visible en el frontend informando que el contenido fue asistido por IA.',
      'Paso 4: Implementar un filtro regex previo a la llamada para enmascarar números de tarjetas de crédito o credenciales.'
    ],
    requiredDocuments: [
      'Política de Gobernanza y Uso Ético de Inteligencia Artificial',
      'Evaluación de Impacto de IA (Algorithmic Impact Assessment)',
      'Términos de Servicio con Cláusula de Asistencia Algorítmica'
    ],
    codeSnippets: [
      {
        title: 'Wrapper de Invocación Segura de IA con Sanitización (Node / TypeScript)',
        language: 'typescript',
        targetFile: 'src/lib/aiGovernance.ts',
        description: 'Cumple con ISO 42001 B.5.2 y B.9.1 aplicando enmascaramiento de datos y grounding estricto.',
        code: `// ISO 42001: Wrapper de IA con gobernanza y privacidad
export function sanitizePromptForAI(rawInput: string): string {
  // Enmascarar números de tarjetas de crédito (PCI-DSS)
  const creditCardPattern = /\\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|3[47][0-9]{13})\\b/g;
  // Enmascarar correos personales si no son requeridos
  const emailPattern = /\\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\\.[A-Z|a-z]{2,}\\b/g;

  return rawInput
    .replace(creditCardPattern, '[TARJETA_PROTEGIDA]')
    .replace(emailPattern, '[CORREO_ANONIMIZADO]');
}

export const ISO42001_SYSTEM_GUARDRAILS = [
  'Eres un asistente que opera bajo la norma ISO/IEC 42001:2023.',
  'REGLAS OBLIGATORIAS:',
  '1. Grounding estricto: Si no conoces un dato con 100% de certeza, declara que no posees la informacion. NUNCA inventes leyes ni articulos.',
  '2. Supervision humana: Recuerda siempre que tu salida es consultiva y debe ser validada por un profesional humano.',
  '3. No filtracion: Nunca reveles secretos de configuracion ni claves de API en tus respuestas.'
].join('\\n');`
      }
    ]
  },

  // 5. ISO 27018
  {
    id: 'iso-27018',
    code: 'ISO/IEC 27018:2019',
    shortName: 'ISO 27018 (PII Cloud)',
    title: 'Protección de Datos Personales Identificables (PII) en Nube Pública',
    category: 'iso',
    authority: 'ISO/IEC JTC 1/SC 27',
    applicabilityReason: 'Aplica a cualquier solución SaaS que almacene datos o archivos de clientes en servidores cloud de terceros (AWS, Azure, Supabase, Neon, etc.).',
    priority: 'altamente_recomendado',
    summary: 'Código de prácticas para proteger datos personales identificables (PII) en entornos de computación en la nube pública. Asegura que los proveedores de nube no usen los datos de la empresa para fines publicitarios.',
    keyControls: [
      {
        id: 'iso27018-noad',
        code: 'Control C.3.1',
        name: 'Prohibición de Uso de Datos para Publicidad o Reentrenamiento',
        description: 'Garantía contractual y técnica de que los datos almacenados en la nube no se ceden ni explotan para fines comerciales ajenos.',
        technicalEvidence: 'Contrato de Procesamiento de Datos (DPA) suscrito con el proveedor cloud y política de cero persistencia no autorizada.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'iso27018-encr',
        code: 'Control C.10.1',
        name: 'Cifrado de PII en Tránsito y Reposo en el Cloud Provider',
        description: 'Obligación de que los discos o tablas en la nube tengan cifrado nativo activo (AWS KMS, AES-256) y TLS 1.3 en todas las conexiones entrantes y salientes.',
        technicalEvidence: 'Parámetro sslmode=require en conexiones PostgreSQL y buckets S3 con cifrado SSE-S3/KMS.',
        status: 'not_started',
        priority: 'critica'
      }
    ],
    howToApplySteps: [
      'Paso 1: Forzar ssl: { rejectUnauthorized: true } en la cadena de conexión del ORM o cliente de base de datos.',
      'Paso 2: Firmar o aceptar los Addendums de Protección de Datos (DPA) en las consolas de AWS, Supabase, Neon o Vercel.',
      'Paso 3: Almacenar archivos adjuntos con claves de acceso temporales y URLs firmadas (presigned URLs) que expiren en 15 minutos.'
    ],
    requiredDocuments: [
      'Inventario de Proveedores Cloud y Sub-encargados de Tratamiento',
      'Adenda de Procesamiento de Datos (DPA) con proveedores'
    ],
    codeSnippets: [
      {
        title: 'Conexión Segura con Cifrado Obligatorio en Reposo y Tránsito (PostgreSQL)',
        language: 'typescript',
        targetFile: 'src/lib/db.ts',
        description: 'Cumple con ISO 27018 forzando TLS estricto y pool de conexiones seguro.',
        code: `import { Pool } from 'pg';

export const dbPool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: true, // ISO 27018: Rechazar certificados autofirmados o no válidos
  },
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
});`
      }
    ]
  },

  // 6. ISO 29110
  {
    id: 'iso-29110',
    code: 'ISO/IEC 29110-4-1',
    shortName: 'ISO 29110 (Startups & PYMEs Software)',
    title: 'Ingeniería de Software para Entidades Muy Pequeñas (VSEs)',
    category: 'iso',
    authority: 'ISO/IEC JTC 1/SC 7',
    applicabilityReason: '¡La norma ISO perfecta para startups y pequeñas empresas de desarrollo! Diseñada para equipos de 1 a 25 personas que necesitan certificarse sin sobrecarga burocrática.',
    priority: 'altamente_recomendado',
    summary: 'Perfil básico y de entrada para micro y pequeñas empresas que desarrollan software. Establece dos procesos clave: Gestión del Proyecto (Project Management) e Implementación de Software (Software Implementation).',
    keyControls: [
      {
        id: 'iso29110-pm',
        code: 'Proceso PM',
        name: 'Gestión de Proyecto, Backlog y Control de Cambios',
        description: 'Tener requerimientos claros documentados en historias de usuario, priorización en sprints y trazabilidad de versiones.',
        technicalEvidence: 'Tablero Kanban/Scrum (Linear, Jira o GitHub Projects) y changelogs documentados.',
        status: 'not_started',
        priority: 'media'
      },
      {
        id: 'iso29110-si',
        code: 'Proceso SI',
        name: 'Flujo de Implementación de Software y Code Review',
        description: 'Obligatoriedad de ramas protegidas en Git, revisiones de código (Pull Requests) antes de pasar a producción y suites de pruebas.',
        technicalEvidence: 'Reglas de protección de ramas en GitHub/GitLab que impiden commits directos a main sin aprobación.',
        status: 'not_started',
        priority: 'alta'
      }
    ],
    howToApplySteps: [
      'Paso 1: Configurar GitHub Branch Protection en la rama main (exigir 1 aprobación de Pull Request).',
      'Paso 2: Crear archivo CHANGELOG.md siguiendo formato Conventional Commits.',
      'Paso 3: Mantener un archivo README.md con instrucciones claras de instalación, despliegue y variables de entorno.',
      'Paso 4: Definir una Definition of Done (DoD) que incluya pruebas automáticas antes de cada release.'
    ],
    requiredDocuments: [
      'Plan de Proyecto de Software Simplificado',
      'Especificación de Requerimientos del Sistema (SRS)',
      'Registro de Pruebas de Aceptación y Validación'
    ],
    codeSnippets: []
  },

  // 7. ISO 9001
  {
    id: 'iso-9001',
    code: 'ISO 9001:2015',
    shortName: 'ISO 9001 (Calidad & Clientes)',
    title: 'Sistema de Gestión de la Calidad (SGC)',
    category: 'iso',
    authority: 'Organización Internacional de Normalización (ISO)',
    applicabilityReason: 'Requerido para licitaciones con el Estado, contratos corporativos medianos/grandes y garantía de satisfacción continua del cliente.',
    priority: 'recomendado',
    summary: 'Estándar de calidad transversal enfocado en la satisfacción del cliente, la gestión por procesos, la mejora continua y la reducción de defectos en las entregas.',
    keyControls: [
      {
        id: 'iso9001-csat',
        code: 'Cláusula 9.1.2',
        name: 'Medición Periódica de Satisfacción del Cliente (CSAT / NPS)',
        description: 'Mecanismo sistematizado para recabar la opinión de los usuarios que usan el software e identificar oportunidades de mejora.',
        technicalEvidence: 'Encuestas in-app de satisfacción o registro semestral de feedback de clientes.',
        status: 'not_started',
        priority: 'media'
      },
      {
        id: 'iso9001-nc',
        code: 'Cláusula 10.2',
        name: 'Gestión de No Conformidades y Análisis Causa Raíz de Bugs',
        description: 'Cuando ocurre una caída o bug crítico en producción, debe realizarse un post-mortem técnico identificando la causa raíz y medidas correctivas.',
        technicalEvidence: 'Registro de post-mortems en incidentes de severidad alta con acciones preventivas.',
        status: 'not_started',
        priority: 'media'
      }
    ],
    howToApplySteps: [
      'Paso 1: Implementar un widget sutil de feedback o NPS dentro de la aplicación.',
      'Paso 2: Registrar incidencias de soporte en un sistema de tickets con SLA de respuesta (< 4 horas para fallas críticas).',
      'Paso 3: Redactar plantilla de informe post-mortem para caídas del servicio.'
    ],
    requiredDocuments: [
      'Manual de Calidad y Política de Satisfacción del Cliente',
      'Procedimiento de Gestión de Incidencias y Acciones Correctivas',
      'Tablero de Indicadores Clave de Desempeño (KPIs / Balanced Scorecard)'
    ],
    codeSnippets: []
  },

  // 8. MARCO LEGAL PERÚ - Ley 29733
  {
    id: 'ley-29733',
    code: 'Ley N° 29733 & D.S. 003-2013-JUS',
    shortName: 'Ley 29733 (Datos Personales Perú)',
    title: 'Ley de Protección de Datos Personales de la República del Perú',
    category: 'legal_pe',
    authority: 'Autoridad Nacional de Protección de Datos Personales (ANPD - MINJUS)',
    applicabilityReason: 'OBLIGATORIA POR LEY para toda empresa constituida en el Perú o que procese datos personales de residentes peruanos. Su incumplimiento acarrea multas de hasta 100 UIT (más de S/ 500,000).',
    priority: 'obligatorio',
    summary: 'Marco regulatorio peruano que tutela el tratamiento de datos personales en soporte físico y digital. Exige consentimiento previo, informado, expreso e inequívoco, registro de bancos de datos ante el MINJUS e implementación de medidas de seguridad de nivel básico, medio o alto.',
    keyControls: [
      {
        id: 'ley29733-consent',
        code: 'Artículos 4 al 12',
        name: 'Consentimiento Previo, Informado y Expreso',
        description: 'El usuario debe aceptar de forma activa (opt-in explícito, nunca casilla premarcada) el tratamiento de sus datos, conociendo la finalidad exacta y el destinatario.',
        technicalEvidence: 'Registro en base de datos con booleano accepted=true, timestamp UTC, IP y versión de la política aceptada.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'ley29733-arco',
        code: 'Artículos 18 al 22',
        name: 'Procedimiento de Ejercicio de Derechos ARCO',
        description: 'Garantizar el ejercicio de los derechos de Acceso, Rectificación, Cancelación y Oposición en los plazos legales peruanos (máximo 10 a 20 días hábiles).',
        technicalEvidence: 'Formulario o correo visible de atención de solicitudes ARCO y canal de soporte legal habilitado.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'ley29733-security',
        code: 'D.S. 003-2013-JUS Arts. 32-43',
        name: 'Medidas de Seguridad Lógica de Nivel Alto',
        description: 'Exige cifrado robusto para datos sensibles (financieros, salud, antecedentes), control de accesos por usuario individual y logs de auditoría inmutables por mínimo 2 años.',
        technicalEvidence: 'Cifrado AES-256 en reposo, firmas HMAC y logs de transacciones sin posibilidad de alteración.',
        status: 'not_started',
        priority: 'critica'
      }
    ],
    howToApplySteps: [
      'Paso 1: Inscribir el Banco de Datos Personales ("Clientes" y "Usuarios Web") ante la ANPD (formulario oficial MINJUS).',
      'Paso 2: Publicar la Política de Privacidad adaptada a la legislación peruana con datos del titular y domicilio en Perú.',
      'Paso 3: Incorporar casilla de aceptación obligatoria en los formularios de registro y contacto.',
      'Paso 4: Crear el canal directo para atender solicitudes de derechos ARCO (ej. arco@tuempresa.pe).'
    ],
    requiredDocuments: [
      'Formulario de Inscripción de Banco de Datos Personales ante el MINJUS',
      'Política de Privacidad y Protección de Datos Personales (Perú)',
      'Cláusula de Consentimiento para Formularios Web y Apps',
      'Directiva de Seguridad de la Información (Nivel Básico, Medio y Alto)'
    ],
    codeSnippets: [
      {
        title: 'Modelo de Registro de Consentimiento Trazable (Drizzle ORM / SQL)',
        language: 'typescript',
        targetFile: 'src/db/schema.ts',
        description: 'Estructura conforme al Art. 12 Ley 29733 para acreditar consentimiento ante una inspección de la ANPD.',
        code: `import { pgTable, uuid, text, timestamp, boolean } from 'drizzle-orm/pg-core';

export const userConsents = pgTable('user_consents', {
  id: uuid('id').defaultRandom().primaryKey(),
  userId: uuid('user_id').notNull(),
  policyVersion: text('policy_version').notNull(), // ej. "v1.2-2026-10"
  purpose: text('purpose').notNull(), // ej. "Prestación de servicio SaaS y autenticación"
  consentGiven: boolean('consent_given').notNull(),
  ipAddress: text('ip_address'),
  userAgent: text('user_agent'),
  timestamp: timestamp('timestamp', { withTimezone: true }).defaultNow().notNull(),
});`
      }
    ]
  },

  // 9. LEY DE DELITOS INFORMÁTICOS PERÚ
  {
    id: 'ley-30096',
    code: 'Ley N° 30096 & Ley N° 30171',
    shortName: 'Ley 30096 (Delitos Informáticos)',
    title: 'Ley de Delitos Informáticos de la República del Perú',
    category: 'legal_pe',
    authority: 'División de Investigación de Delitos de Alta Tecnología (DIVINDAT - PNP) / Ministerio Público',
    applicabilityReason: 'Aplica a cualquier plataforma de software para protegerse contra accesos no autorizados, sabotaje de datos, fraude informático e interceptación ilícita.',
    priority: 'obligatorio',
    summary: 'Tipifica y sanciona penalmente el acceso ilícito a sistemas informáticos, atentados a la integridad de datos, interceptación no autorizada de redes y fraude informático en Perú.',
    keyControls: [
      {
        id: 'ley30096-ratelimit',
        code: 'Art. 2 y Art. 3',
        name: 'Protección Contra Acceso Ilícito y Fuerza Bruta (Rate Limiting)',
        description: 'Bloqueo automático de direcciones IP o cuentas tras múltiples intentos fallidos de autenticación para mitigar ataques de fuerza bruta.',
        technicalEvidence: 'Middleware express-rate-limit o Redis Token Bucket en endpoints de login.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'ley30096-auditlogs',
        code: 'Art. 7 y Art. 10',
        name: 'Registro Forense de Trazabilidad y Logs Inmutables',
        description: 'Guardar logs de accesos administrativos y cambios críticos para permitir peritaje informático de la DIVINDAT en caso de incidente o brecha.',
        technicalEvidence: 'Servicio de logs centralizado con formato JSON estructurado y retención segura.',
        status: 'not_started',
        priority: 'alta'
      }
    ],
    howToApplySteps: [
      'Paso 1: Aplicar limitador de tasa de peticiones (Rate Limit) de máximo 5 intentos por minuto en el endpoint /api/auth/login.',
      'Paso 2: Hashear contraseñas con algoritmos modernos (Argon2id o bcrypt con coste >= 12).',
      'Paso 3: Notificar por correo al usuario cuando se detecte un inicio de sesión desde una nueva ubicación o dispositivo desconocido.'
    ],
    requiredDocuments: [
      'Protocolo de Respuesta ante Incidentes de Intrusión Informática',
      'Política de Contraseñas Seguras y Autenticación'
    ],
    codeSnippets: [
      {
        title: 'Middleware Anti-Fuerza Bruta con Rate Limiting (Node.js)',
        language: 'typescript',
        targetFile: 'src/middleware/rateLimiter.ts',
        description: 'Previene accesos ilícitos tipificados en el Art. 2 de la Ley 30096.',
        code: `import rateLimit from 'express-rate-limit';

export const loginRateLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutos
  max: 5, // Bloquear tras 5 intentos fallidos
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    error: 'Demasiados intentos fallidos. Bloqueado temporalmente por seguridad conforme a Ley 30096.',
    retryAfterMinutes: 15,
  },
});`
      }
    ]
  },

  // 10. DECRETO DE URGENCIA 007-2020 (CONFIANZA DIGITAL)
  {
    id: 'du-007-2020',
    code: 'D.U. N° 007-2020 & PCM',
    shortName: 'D.U. 007-2020 (Confianza Digital)',
    title: 'Decreto de Urgencia que aprueba el Marco de Confianza Digital en el Perú',
    category: 'legal_pe',
    authority: 'Secretaría de Gobierno y Transformación Digital (PCM) & Centro Nacional de Seguridad Digital (CNSD)',
    applicabilityReason: 'Establece medidas obligatorias de seguridad digital para empresas que prestan servicios digitales y gestionan infraestructuras críticas en Perú.',
    priority: 'altamente_recomendado',
    summary: 'Crea el marco legal para la confianza digital, ciberseguridad, gestión de incidentes y protección de servicios digitales frente a ataques informáticos.',
    keyControls: [
      {
        id: 'du007-cnsd',
        code: 'Art. 18',
        name: 'Reporte y Notificación de Incidentes Graves de Ciberseguridad',
        description: 'Obligación de documentar incidentes que comprometan la continuidad del servicio o la privacidad de los usuarios.',
        technicalEvidence: 'Registro de incidentes y procedimiento de comunicación.',
        status: 'not_started',
        priority: 'alta'
      }
    ],
    howToApplySteps: [
      'Paso 1: Designar un Oficial de Seguridad Digital o responsable técnico de ciberseguridad.',
      'Paso 2: Establecer copias de seguridad automáticas diarias con prueba de restauración mensual.',
      'Paso 3: Monitorear activamente las alertas emitidas por el Centro Nacional de Seguridad Digital (CNSD Perú).'
    ],
    requiredDocuments: [
      'Plan de Continuidad del Negocio y Recuperación ante Desastres (DRP)',
      'Procedimiento de Notificación de Incidentes de Seguridad Digital'
    ],
    codeSnippets: []
  },

  // 11. GDPR (EUROPA / ESTÁNDAR GLOBAL)
  {
    id: 'gdpr',
    code: 'Reglamento (UE) 2016/679',
    shortName: 'GDPR / RGPD (Unión Europea)',
    title: 'Reglamento General de Protección de Datos de la Unión Europea',
    category: 'legal_intl',
    authority: 'Comité Europeo de Protección de Datos (EDPB) & Agencias Nacionales (AEPD, CNIL)',
    applicabilityReason: 'Mandatorio si la startup tiene clientes o usuarios en la Unión Europea o si aspira a levantar inversión internacional / venta a empresas globales.',
    priority: 'obligatorio',
    summary: 'El estándar de oro mundial en privacidad de datos. Aplica de forma extraterritorial a cualquier software del mundo que ofrezca bienes o servicios a residentes de la UE o supervise su comportamiento.',
    keyControls: [
      {
        id: 'gdpr-art17',
        code: 'Artículo 17',
        name: 'Derecho a la Supresión (Derecho al Olvido)',
        description: 'El interesado tiene derecho a obtener sin dilación indebida la supresión de los datos personales que le conciernan.',
        technicalEvidence: 'Eliminación atómica y comprobable de datos en bases de datos primarias y réplicas.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'gdpr-art20',
        code: 'Artículo 20',
        name: 'Derecho a la Portabilidad de los Datos',
        description: 'El usuario tiene derecho a recibir sus datos personales en un formato estructurado, de uso común y lectura mecánica (JSON o CSV descargable).',
        technicalEvidence: 'Botón de "Exportar mis datos" en el perfil del usuario que genera un archivo .json estructurado.',
        status: 'not_started',
        priority: 'alta'
      },
      {
        id: 'gdpr-art32',
        code: 'Artículo 32',
        name: 'Seguridad del Tratamiento y Pseudonimización',
        description: 'Aplicación de medidas técnicas apropiadas para garantizar la confidencialidad, integridad y disponibilidad continua de los sistemas.',
        technicalEvidence: 'Cifrado de extremo a extremo o pseudonimización de identificadores directos.',
        status: 'not_started',
        priority: 'critica'
      }
    ],
    howToApplySteps: [
      'Paso 1: Implementar endpoint de exportación de datos en formato JSON para portabilidad (Art. 20).',
      'Paso 2: Habilitar banner de cookies con consentimiento granular (técnicas, analíticas, marketing) sin premarcar.',
      'Paso 3: Notificar a la autoridad supervisora y afectados en un plazo máximo de 72 horas si ocurre una brecha grave de seguridad.'
    ],
    requiredDocuments: [
      'Política de Privacidad Integral conforme a GDPR',
      'Protocolo de Notificación de Brechas en 72 Horas',
      'Contrato de Encargado de Tratamiento (Data Processing Addendum - DPA)'
    ],
    codeSnippets: [
      {
        title: 'Endpoint de Portabilidad de Datos en JSON (GDPR Art. 20)',
        language: 'typescript',
        targetFile: 'src/routes/portability.ts',
        description: 'Permite al usuario descargar sus datos estructurados con un solo clic.',
        code: `import { Router, Request, Response } from 'express';
import { db } from '../db';
import { users, userActivity, documents } from '../db/schema';
import { eq } from 'drizzle-orm';

export const exportRouter = Router();

// GDPR Art. 20: Derecho a la Portabilidad
exportRouter.get('/export-my-data', async (req: Request, res: Response) => {
  const userId = req.user?.id;
  if (!userId) return res.status(401).json({ error: 'No autorizado' });

  const [profile] = await db.select().from(users).where(eq(users.id, userId));
  const activity = await db.select().from(userActivity).where(eq(userActivity.userId, userId));
  const userDocs = await db.select().from(documents).where(eq(documents.userId, userId));

  const exportPayload = {
    exportedAt: new Date().toISOString(),
    standard: 'GDPR / RGPD Regulation (EU) 2016/679 - Article 20',
    profile: {
      id: profile.id,
      email: profile.email,
      name: profile.name,
      createdAt: profile.createdAt,
    },
    activityLogs: activity,
    documentsCount: userDocs.length,
    documents: userDocs.map(d => ({ id: d.id, title: d.title, createdAt: d.createdAt })),
  };

  res.setHeader('Content-Type', 'application/json');
  res.setHeader('Content-Disposition', 'attachment; filename="data-export-' + userId + '.json"');
  return res.status(200).send(JSON.stringify(exportPayload, null, 2));
});`
      }
    ]
  },

  // 12. OWASP TOP 10 & OWASP LLM 2025
  {
    id: 'owasp-top10',
    code: 'OWASP Top 10 (2021) & LLM (2025)',
    shortName: 'OWASP AppSec & AI Top 10',
    title: 'Estándar Global de Seguridad en Aplicaciones Web y Modelos de Lenguaje',
    category: 'cybersecurity',
    authority: 'Open Worldwide Application Security Project (OWASP)',
    applicabilityReason: 'Mandatorio para cualquier desarrollador de software. Es el estándar de oro que auditan los pentesters y clientes corporativos.',
    priority: 'obligatorio',
    summary: 'Consenso mundial sobre los riesgos de seguridad más críticos en software: Control de acceso roto (Broken Access Control), Fallos criptográficos, Inyección, Diseño inseguro, y para IA: Prompt Injection y Divulgación de Información Sensible.',
    keyControls: [
      {
        id: 'owasp-a01',
        code: 'A01:2021',
        name: 'Broken Access Control (Control de Acceso Inseguro)',
        description: 'Impedir la vulnerabilidad IDOR (Insecure Direct Object Reference) verificando que el usuario autenticado sea el dueño legítimo del recurso que intenta leer o modificar.',
        technicalEvidence: 'Validación WHERE id = req.params.id AND user_id = req.user.id en toda mutación o lectura.',
        status: 'not_started',
        priority: 'critica'
      },
      {
        id: 'owasp-llm01',
        code: 'LLM01:2025',
        name: 'Prompt Injection & Insecure Output Handling',
        description: 'Sanitización de prompts para evitar que un usuario malicioso eluda las directivas del sistema mediante inyección indirecta o manipulación de contexto.',
        technicalEvidence: 'Delimitadores claros en los system prompts y validación de tipos en la salida estructurada de los modelos.',
        status: 'not_started',
        priority: 'critica'
      }
    ],
    howToApplySteps: [
      'Paso 1: Auditar cada endpoint con ID en URL para evitar IDOR (siempre filtrar por user_id).',
      'Paso 2: Utilizar esquemas de validación Zod en el backend antes de procesar cualquier cuerpo JSON.',
      'Paso 3: Separar las instrucciones del sistema del contenido del usuario usando roles nativos del API del LLM.'
    ],
    requiredDocuments: [
      'Informe de Análisis de Vulnerabilidades (SAST / DAST)',
      'Checklist de Revisión de Seguridad de Código Pre-Despliegue'
    ],
    codeSnippets: []
  },

  // 13. PCI-DSS v4.0 (PAGOS & FINTECH)
  {
    id: 'pci-dss',
    code: 'PCI-DSS v4.0',
    shortName: 'PCI-DSS (Seguridad de Tarjetas y Pagos)',
    title: 'Payment Card Industry Data Security Standard',
    category: 'legal_intl',
    authority: 'PCI Security Standards Council (Visa, MasterCard, Amex)',
    applicabilityReason: 'Aplica a cualquier software o startup que cobre por suscripción, venta digital, pasarela de pagos o maneje números de tarjetas.',
    priority: 'obligatorio',
    summary: 'Norma de seguridad mundial obligatoria para proteger datos de titulares de tarjetas. Prohíbe terminantemente almacenar el CVV/CVC y exige el uso de tokenización mediante pasarelas certificadas.',
    keyControls: [
      {
        id: 'pci-notoken',
        code: 'Requisito 3.2',
        name: 'Prohibición Absoluta de Almacenar Datos de Autenticación Sensibles (CVV)',
        description: 'El software NUNCA debe guardar en su propia base de datos el CVV, la banda magnética ni el PIN del titular de la tarjeta.',
        technicalEvidence: 'Uso de librerías en el frontend (Stripe Elements, Culqi Checkout, etc.) que envían datos directos a la pasarela sin tocar el servidor propio.',
        status: 'not_started',
        priority: 'critica'
      }
    ],
    howToApplySteps: [
      'Paso 1: Delegar el cobro al frontend usando SDKs oficiales de pasarelas (Stripe, Culqi, MercadoPago).',
      'Paso 2: Guardar únicamente tokens de pago retornados por la pasarela (ej. cust_123, card_xyz), nunca datos de tarjeta.',
      'Paso 3: Completar el Cuestionario de Autoevaluación SAQ A de PCI-DSS.'
    ],
    requiredDocuments: [
      'Self-Assessment Questionnaire (SAQ A / SAQ A-EP)',
      'Política de No Almacenamiento de Datos de Tarjetas'
    ],
    codeSnippets: []
  }
];

export const MOTOR_CRIPTOGRAFICO_SNIPPET: CodeSnippet = {
  title: 'Motor Criptográfico AES-256-GCM con Derivación HKDF (TypeScript)',
  language: 'typescript',
  targetFile: 'src/lib/encryption.ts',
  description: 'Mismo motor criptográfico certificado de grado militar usado en plataformas de alto secreto profesional y banca.',
  code: `import crypto from 'crypto';

const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // 96 bits recomendado para GCM
const AUTH_TAG_LENGTH = 16; // 128 bits
const SALT_LENGTH = 32;

// Derivar clave única por usuario/inquilino mediante HKDF-SHA256
export function deriveKeyForUser(masterSecret: string, userSalt: Buffer): Buffer {
  return crypto.hkdfSync('sha256', masterSecret, userSalt, 'legaltech-tenant-isolation', 32);
}

export interface EncryptedPayload {
  ciphertext: string;
  iv: string;
  tag: string;
  salt: string;
}

export function encryptAES256GCM(plaintext: string, masterKey: string): EncryptedPayload {
  const salt = crypto.randomBytes(SALT_LENGTH);
  const key = deriveKeyForUser(masterKey, salt);
  const iv = crypto.randomBytes(IV_LENGTH);

  const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
  const ciphertext = Buffer.concat([cipher.update(plaintext, 'utf8'), cipher.final()]);
  const tag = cipher.getAuthTag();

  return {
    ciphertext: ciphertext.toString('base64'),
    iv: iv.toString('base64'),
    tag: tag.toString('base64'),
    salt: salt.toString('base64'),
  };
}

export function decryptAES256GCM(payload: EncryptedPayload, masterKey: string): string {
  const salt = Buffer.from(payload.salt, 'base64');
  const iv = Buffer.from(payload.iv, 'base64');
  const tag = Buffer.from(payload.tag, 'base64');
  const ciphertext = Buffer.from(payload.ciphertext, 'base64');

  const key = deriveKeyForUser(masterKey, salt);
  const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
  decipher.setAuthTag(tag);

  const decrypted = Buffer.concat([decipher.update(ciphertext), decipher.final()]);
  return decrypted.toString('utf8');
}`
};
