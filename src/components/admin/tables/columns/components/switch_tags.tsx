import { useEffect, useState } from 'react';
import { Switch } from '@headlessui/react';
// Helpers
import { classNames } from '@/helpers';

type Props = {
  color: string;
  id: string;
  category: string;
  status: boolean;
  onChange: (id: string, category: string, status: boolean) => void;
};

export const SwitchTag = ({ color, id, category, status, onChange }: Props) => {
  const [enabled, setEnabled] = useState(status);

  const changeHandler = (e) => {
    setEnabled(e);
    onChange(id, category, e);
  };

  return (
    <Switch
      checked={enabled}
      onChange={changeHandler}
      className={`group relative inline-flex h-5 w-10 flex-shrink-0 cursor-pointer items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:${color} focus:ring-offset-2`}
    >
      <span className="sr-only">Status</span>
      <span
        aria-hidden="true"
        className="pointer-events-none absolute h-full w-full rounded-md bg-white"
      />
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? `bg-${color}` : 'bg-gray-300',
          'pointer-events-none absolute mx-auto h-4 w-9 rounded-full transition-colors duration-200 ease-in-out'
        )}
      />
      <span
        aria-hidden="true"
        className={classNames(
          enabled ? 'translate-x-5' : 'translate-x-0',
          'pointer-events-none absolute left-0 inline-block h-5 w-5 transform rounded-full border border-gray-300 bg-white shadow ring-0 transition-transform duration-200 ease-in-out'
        )}
      />
    </Switch>
  );
};
