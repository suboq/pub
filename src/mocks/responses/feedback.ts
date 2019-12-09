import { ApiResponse } from '@/api/types/responses';
import { Feedback } from '@/api/types/feedback';

export const feedback: ApiResponse<Feedback> = {
  ok: true,
  data: {
    content: "There's an issue with the navbar",
  },
};