import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';

const R2_ACCOUNT_ID = process.env.R2_ACCOUNT_ID;
const R2_ACCESS_KEY_ID = process.env.R2_ACCESS_KEY_ID;
const R2_SECRET_ACCESS_KEY = process.env.R2_SECRET_ACCESS_KEY;
const R2_BUCKET_NAME = process.env.R2_BUCKET_NAME;
const R2_PUBLIC_DOMAIN = process.env.R2_PUBLIC_DOMAIN || process.env.NEXT_PUBLIC_R2_URL;

let s3ClientInstance: S3Client | null = null;

export function getR2Client(): S3Client | null {
  if (!R2_ACCOUNT_ID || !R2_ACCESS_KEY_ID || !R2_SECRET_ACCESS_KEY) {
    return null;
  }

  if (!s3ClientInstance) {
    s3ClientInstance = new S3Client({
      region: 'auto',
      endpoint: `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
      credentials: {
        accessKeyId: R2_ACCESS_KEY_ID,
        secretAccessKey: R2_SECRET_ACCESS_KEY,
      },
    });
  }

  return s3ClientInstance;
}

export function isR2Configured(): boolean {
  return Boolean(
    R2_ACCOUNT_ID &&
    R2_ACCESS_KEY_ID &&
    R2_SECRET_ACCESS_KEY &&
    R2_BUCKET_NAME
  );
}

export async function uploadToR2(
  buffer: Buffer,
  fileName: string,
  contentType: string
): Promise<string> {
  const client = getR2Client();
  if (!client || !R2_BUCKET_NAME) {
    throw new Error('Cloudflare R2 is not configured.');
  }

  const cleanFileName = fileName.replace(/[^a-zA-Z0-9._-]/g, '_');
  const key = `uploads/${Date.now()}-${cleanFileName}`;

  const command = new PutObjectCommand({
    Bucket: R2_BUCKET_NAME,
    Key: key,
    Body: buffer,
    ContentType: contentType,
    CacheControl: 'public, max-age=31536000, immutable',
  });

  await client.send(command);

  if (R2_PUBLIC_DOMAIN) {
    const domain = R2_PUBLIC_DOMAIN.replace(/\/+$/, '');
    return `${domain}/${key}`;
  }

  // Cloudflare R2 default endpoint path fallback
  return `https://${R2_ACCOUNT_ID}.r2.cloudflarestorage.com/${R2_BUCKET_NAME}/${key}`;
}
