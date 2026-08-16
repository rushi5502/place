import { useQuery, UseQueryResult } from '@tanstack/react-query';
import type { Post } from '@prisma/client';
import { getInternship } from '@/actions/student/getInternship';

export const useGetInternship = (postId: string) => {
  return useQuery({
    queryKey: ['InternshipPosts', postId],
    queryFn: async () => {
      const result = await getInternship(postId);
      if (result.error) {
        throw new Error(result.error);
      }
      return result.data;
    },
  });
};