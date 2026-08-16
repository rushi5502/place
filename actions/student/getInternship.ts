'use server';

import { db } from "@/lib/db";
import { Post } from '@prisma/client';

// Validate if the provided string is a valid ObjectId
const isValidObjectId = (id: string): boolean => {
  return /^[0-9a-fA-F]{24}$/.test(id);
};

export const getInternship = async (postId: string): Promise<{ data?: Post, error?: string }> => {
  if (!isValidObjectId(postId)) {
    return { error: 'Invalid ObjectId: Must be a 24-character hex string' };
  }

  try {
    const data = await db.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (!data) {
      return { error: 'Post not found' };
    }

    return { data };
  } catch (error) {
    console.error('Failed to retrieve post:', error);
    return { error: 'Failed to retrieve post' };
  }
};