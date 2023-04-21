import {
  useMutation,
  useQuery,
  useInfiniteQuery,
  useQueryClient,
} from '@tanstack/react-query';
import {
  getEvents,
  createEvent,
  readEvent,
  updateEvent,
  deleteEvent,
  createNewEvent,
} from '@/api/event/event';
import { Event } from '@/interfaces/event';
import { WithDocs } from '@/interfaces/serializers/commons';

const key = 'event';

export function useEvents() {
  return useQuery<WithDocs<Event>>([key], getEvents);
}

export function useInfinteEvents(pagination: { [key: string]: any } = {}) {
  return useInfiniteQuery<WithDocs<Event>>([key, pagination?.page], {
    queryFn: () => getEvents(pagination),
    keepPreviousData: true,
  });
}

export function useEvent(event_id: string) {
  return useQuery<Event>([key, event_id], () => readEvent(event_id as any));
}

export function useCreateEventSubcategory() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(createEvent, {
    onSuccess: (data) => {
      queryClient.setQueryData([key], (prev: any) => prev.concat(data));
    },
  });
  return { mutate, isLoading, isError, isSuccess };
}

export function useMutationUpdateEvent() {
  const queryClient = useQueryClient();
  return useMutation(updateEvent, {
    onSuccess: () => queryClient.invalidateQueries([key]),
  });
}

export function useCreateNewEvent() {
  const queryClient = useQueryClient();

  const { mutate, isLoading, isError, isSuccess } = useMutation(
    createNewEvent,
    {
      onSuccess: (data) => {
        queryClient.setQueryData([key], (prev: any) => prev.concat(data));
      },
    }
  );
  return { mutate, isLoading, isError, isSuccess };
}
