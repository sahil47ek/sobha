import { NextRequest, NextResponse } from 'next/server';
import { writeFile, access, constants } from 'fs/promises';
import { join } from 'path';
import { mkdir } from 'fs/promises';

const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
const ALLOWED_VIDEO_TYPES = ['video/mp4', 'video/webm'];
const MAX_FILE_SIZE = 100 * 1024 * 1024; // 100MB

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const file = formData.get('file') as File;
    const fileType = formData.get('type') as string; // 'image' or 'video'

    if (!file) {
      return NextResponse.json(
        { error: 'No file uploaded' },
        { status: 400 }
      );
    }

    // Validate file size
    if (file.size > MAX_FILE_SIZE) {
      return NextResponse.json(
        { error: 'File size exceeds 100MB limit' },
        { status: 400 }
      );
    }

    // Validate file type
    const isImage = ALLOWED_IMAGE_TYPES.includes(file.type);
    const isVideo = ALLOWED_VIDEO_TYPES.includes(file.type);

    if (!isImage && !isVideo) {
      return NextResponse.json(
        { error: 'Invalid file type. Only JPEG, PNG, WebP images and MP4, WebM videos are allowed.' },
        { status: 400 }
      );
    }

    // Read the file as ArrayBuffer
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create a unique filename with original extension
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    const extension = file.name.split('.').pop();
    const filename = file.name.replace(/\.[^/.]+$/, '') + '-' + uniqueSuffix + '.' + extension;
    
    // Determine the appropriate directory based on file type
    const directory = isVideo ? 'videos' : 'properties';
    const publicDir = join(process.cwd(), 'public', directory);

    // Check if public directory exists and is writable
    try {
      await access(join(process.cwd(), 'public'), constants.W_OK);
    } catch (error) {
      console.error('Public directory is not writable:', error);
      return NextResponse.json(
        { error: 'Server configuration error - storage directory is not writable' },
        { status: 500 }
      );
    }

    // Ensure directory exists with proper error handling
    try {
      await mkdir(publicDir, { recursive: true });
    } catch (error) {
      console.error('Error creating directory:', error);
      return NextResponse.json(
        { error: 'Failed to create storage directory' },
        { status: 500 }
      );
    }

    // Write file with proper error handling
    try {
      const filePath = join(publicDir, filename);
      await writeFile(filePath, buffer);
      
      // Return the relative path that can be used in the frontend
      const relativePath = `/${directory}/${filename}`;
      return NextResponse.json({ path: relativePath });
    } catch (error) {
      console.error('Error writing file:', error);
      return NextResponse.json(
        { error: 'Failed to save file' },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Upload error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 