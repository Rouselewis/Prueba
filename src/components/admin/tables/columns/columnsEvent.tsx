import { useTranslations } from 'next-intl';
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Options, SwitchTable } from './components';
import { CurrentColor } from '@/helpers';
import {
  useDeleteEventScheduleTimetable,
  useUpdateEventScheduleTimetable,
} from '@/hooks/event/event_schedules_timetables';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import { Controller, useForm } from 'react-hook-form';

export function columnsEvent() {
  const ts = useTranslations('Fsuccess');
  const tcc = useTranslations('table_columns');
  const currentColor = CurrentColor();
  const columnHelper = createColumnHelper<any>();
  const { mutate: deleteEventSecheduleTimetable } =
    useDeleteEventScheduleTimetable();
  const { mutate: updateEventScheduleTimetable } =
    useUpdateEventScheduleTimetable();
  const router = useRouter();

  const onDelete = async (id) => {
    try {
      await deleteEventSecheduleTimetable(id);
      toast.success(ts('deleted'));
    } catch (error) {
      toast.error(error.message);
    }
  };
  const onUpdate = (id) => router.push(`/panel/event/create?id=${id}`);
  const toggleStatus = async (id: string, status: boolean) =>
    await updateEventScheduleTimetable({
      id,
      schedule_timetable: {
        status: !status,
      },
    });
  return [
    columnHelper.accessor('select', {
      id: 'select',
      header: ({ table }) => (
        <Checkbox
          {...{
            checked: table.getIsAllRowsSelected(),
            indeterminate: table.getIsSomeRowsSelected(),
            onChange: table.getToggleAllRowsSelectedHandler(),
          }}
        />
      ),
      cell: ({ row }) => (
        <div>
          <Checkbox
            {...{
              checked: row.getIsSelected(),
              disabled: !row.getCanSelect(),
              indeterminate: row.getIsSomeSelected(),
              onChange: row.getToggleSelectedHandler(),
            }}
          />
        </div>
      ),
    }),
    columnHelper.accessor('event', {
      id: 'event',
      header: () => tcc('event.event.event'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('category', {
      id: 'category',
      header: () => tcc('event.event.category'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('visit', {
      id: 'visit',
      header: () => tcc('event.event.visit'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('like', {
      id: 'like',
      header: () => tcc('event.event.like'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('assisted', {
      id: 'assisted',
      header: () => tcc('event.event.assisted'),
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('shared', {
      id: 'shared',
      header: () => tcc('event.event.shared'),
      cell: (props) => props.getValue(),
    }),

    columnHelper.accessor('status', {
      id: 'status',
      header: () => tcc('status'),
      cell: (props) => {
        const id = props.row.original.id;
        const { control, watch } = useForm<{ status: boolean }>();
        const [status] = watch(['status']);

        return (
          <Controller
            control={control}
            name="status"
            render={({ field: { onChange, value } }) => (
              <SwitchTable
                color={currentColor}
                status={value}
                onChange={(v) => {
                  toggleStatus(id, v);
                  onChange(v);
                }}
              />
            )}
          />
        );
      },
    }),
    columnHelper.accessor('options', {
      id: 'options',
      header: () => tcc('option'),
      cell: (props) => {
        const id = props.row.original.id;
        return (
          <Options
            id={props.row.original.id}
            actions={{
              onDelete: () => onDelete(id),
              onUpdate: () => onUpdate(id),
            }}
            color={currentColor}
          />
        );
      },
    }),
  ];
}
