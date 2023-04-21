import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  getEventsTags,
  createEventTag,
  readEventTag,
  updateEventTag,
  deleteEventTag,
} from '@/api/event/event_tags';
import { EventTag } from '@/interfaces/event';

const key = 'event_tag';

export function useTags() {
  return useQuery([key], getEventsTags);
}

/* Create Tag */
export function useCreateTag() {
  const queryClient = useQueryClient();

  return useMutation(
    createEventTag, {
      onSuccess: () => {
        queryClient.invalidateQueries([key]);
      },
    }
  );
}

/* Read Tag */
export function useReadEventTag(tag_id: string) {
  return useQuery([key, tag_id], () => readEventTag(tag_id));
}

/* Update Tag */
export function useUpdateEventTag() {
  const queryClient = useQueryClient();

  return useMutation(
    updateEventTag, {
      onSuccess: (data) => {
        //queryClient.setQueryData([key], (prev: any) => prev.concat(data));
        queryClient.invalidateQueries([key]);
      },
    }
  );
}

/* Delete Tag */
export async function useDeleteEventTag(id: string) {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    await deleteEventTag(id),
    {
      onSuccess: (data) => {
        queryClient.setQueryData([key], (prev: any) => prev.concat(data));
      },
    }
  );
  return { mutate, isLoading, isError, isSuccess };
}
