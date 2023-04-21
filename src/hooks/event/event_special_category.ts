import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  createEventSpecialCategory,
  deleteEventSpecialCategory,
  getEventSpecialCategoryList,
  getEventsSpecialsCategories,
  readEventSpecialCategory,
  readEventSpecialCategoryDateRange,
  updateEventSpecialCategory,
} from '@/api/event/event_special_category';
import {
  EventScheduleTimetable,
  EventSpecialCategory,
} from '@/interfaces/event';
import { WithDocs } from '@/interfaces/serializers/commons';

const key = 'event_special_category';

export function useEventsSpecialsCategories() {
  return useQuery<WithDocs<EventSpecialCategory>>(
    [key],
    getEventsSpecialsCategories
  );
}

export function useEventSpecialCategory(event_special_category_id: string) {
  return useQuery<EventSpecialCategory>([key, event_special_category_id], () =>
    readEventSpecialCategory(event_special_category_id as any)
  );
}

export function useEventSpecialCategoryDateRange(
  event_special_category_id: string
) {
  return useQuery(
    ['event_special_category_daterange', event_special_category_id],
    () => readEventSpecialCategoryDateRange(event_special_category_id)
  );
}

export function useEventSpecialCategoryList(event_special_category_id: string) {
  return useQuery<EventScheduleTimetable[]>(
    ['event_special_category_list', event_special_category_id],
    () => getEventSpecialCategoryList(event_special_category_id)
  );
}
