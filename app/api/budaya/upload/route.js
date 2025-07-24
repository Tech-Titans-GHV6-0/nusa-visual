import { v2 as cloudinary } from 'cloudinary';
import { NextResponse } from 'next/server';
import { writeFile } from 'fs/promises';
import path from 'path';
import { tmpdir } from 'os';
import fs from 'fs';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req) {
  const formData = await req.formData();
  const file = formData.get('image');

  if (!file) {
    return NextResponse.json({ error: 'No file provided' }, { status: 400 });
  }

  const buffer = Buffer.from(await file.arrayBuffer());
  const tmpPath = path.join(tmpdir(), file.name);
  await writeFile(tmpPath, buffer);

  try {
    const upload = await cloudinary.uploader.upload(tmpPath, {
      folder: 'culture_swap',
    });

    fs.unlinkSync(tmpPath); // hapus file lokal

    return NextResponse.json({ url: upload.secure_url });
  } catch (err) {
    return NextResponse.json({ error: 'Upload gagal', detail: err.message }, { status: 500 });
  }
}
