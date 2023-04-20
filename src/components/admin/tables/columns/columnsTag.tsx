import { useTranslations } from 'next-intl';
// Table
import { createColumnHelper } from '@tanstack/react-table';
import { Checkbox, Options, SwitchTag } from './components';
// Helpers
import { CurrentColor } from '@/helpers';
import { EventTag } from '@/interfaces/event';
import { useUpdateEventTag } from '@/hooks/event/event_tags';
// Toastify
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export function columnsTag(category: string) {
  const tcc = useTranslations('table_columns');
  const tt = useTranslations('Toast');

  const currentColor = CurrentColor();
  const columnHelper = createColumnHelper<any>();

  const mutation = useUpdateEventTag();
  const onChangeStatus = (id: string, category: string, status: boolean) => {
    const event_tag: EventTag = {
      _id: id,
      tag: category,
      status: status,
    };
    mutation.mutate(event_tag, {
      onError: () => {
        toast.error(tt('event_tag.update.error'), {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
      onSuccess: () => {
        toast.success(tt('event_tag.update.success'), {
          position: toast.POSITION.TOP_RIGHT,
        });
      },
    });
  };

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
    columnHelper.accessor('category', {
      id: 'category',
      header: () => category,
      cell: (props) => props.getValue(),
    }),
    columnHelper.accessor('status', {
      id: 'status',
      header: () => tcc('status'),
      cell: (props) => (
        <SwitchTag
          color={currentColor}
          id={props.row.original.id}
          category={props.row.original.category}
          status={props.row.original.status}
          onChange={onChangeStatus}
        />
      ),
    }),
    columnHelper.accessor('options', {
      id: 'options',
      header: () => tcc('option'),
      cell: (props) => (
        <Options id={props.row.original.id} color={currentColor} />
      ),
    }),
  ];
}
