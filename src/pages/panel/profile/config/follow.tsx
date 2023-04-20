/** @format */
import { useState } from 'react';
import { GetStaticPropsContext } from 'next';
import { useTranslations } from 'next-intl';
import { Switch } from '@headlessui/react';
// Layout and Header
import AdminLayout from '@/components/layout/admin';
import { Heading } from '@/components/headers/admin/heading';
// Forms
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import {
  CustomError,
  CustomLabel,
  CustomCancel,
  CustomSubmit,
} from '@/components/forms';
import { FormStyles } from '@/helpers';
// Components
import { CustomTagProfile } from '@/components/commons/customTagProfile';
import { getEventsTags } from '@/api/event/event_tags';
import { useUserFavorites } from '@/hooks/user/user_favorites';

const tags = [
  {
    _id: '638d4f143b387d799cc5d6fb',
    tag: 'Iron Maiden',
    status: true,
    created_at: '2022-12-04T19:34:43.334000',
  },
  {
    _id: '643c1287b6e4e43de015c383',
    tag: 's',
    status: true,
    created_at: '2023-04-14T01:33:08.555000',
  },
  {
    _id: '643c148b5b595c31224d0527',
    tag: 's',
    status: true,
    created_at: '2023-04-14T01:33:08.503000',
  },
  {
    _id: '643c190e5b595c31224d0528',
    tag: 'Prueba',
    status: true,
    created_at: '2023-04-14T01:33:08.503000',
  },
  {
    _id: '643c19285b595c31224d0529',
    tag: 'Brtiney Spears',
    status: true,
    created_at: '2023-04-14T01:33:08.503000',
  },
  {
    _id: '643c1f765b595c31224d052a',
    tag: 'Metallica',
    status: true,
    created_at: '2023-04-14T01:33:08.503000',
  },
  {
    _id: '643c2116b6e4e43de015c384',
    tag: 'Blind Guardian',
    status: true,
    created_at: '2023-04-14T01:33:08.555000',
  },
  {
    _id: '643c2cd1b6e4e43de015c385',
    tag: 'Monspell',
    status: true,
    created_at: '2023-04-14T01:33:08.555000',
  },
  {
    _id: '643c2dafb6e4e43de015c386',
    tag: 'Helloween',
    status: true,
    created_at: '2023-04-14T01:33:08.555000',
  },
];

const ProfileFollow = () => {
  const [filteredTags, setFilteredTags] = useState(tags);
  const [searchValue, setSearchValue] = useState('');
  const [selectedTags, setSelectedTags] = useState([]);

  const tc = useTranslations('Common_Forms');
  const ts = useTranslations('Panel_SideBar');

  const breadcrumb = [
    { page: ts('user'), href: '/panel/profile' },
    { page: ts('profile.config.config'), href: '/panel/profile/config' },
    { page: ts('profile.config.follow'), href: '' },
  ];

  const { data } = useUserFavorites();
  console.log('eventsTags:', JSON.stringify(data, null, 2));

  // Function to handle filtering of tags
  const handleSearch = (event) => {
    const input = event.target.value;
    setSearchValue(input);
    const filtered = tags.filter((tag) =>
      tag.tag.toLowerCase().includes(input.toLowerCase())
    );
    setFilteredTags(filtered);
  };

  // Function to handle adding selected tag
  const handleTagSelection = (tag) => {
    if (!selectedTags.find((selected) => selected._id === tag._id)) {
      setSelectedTags([...selectedTags, tag]);
    }
    setSearchValue('');
    setFilteredTags(tags);
  };

  const handleTagRemoval = (tagId) => {
    setSelectedTags(selectedTags.filter((tag) => tag._id !== tagId));
  };

  return (
    <>
      {/* Breadcrumb section */}
      <div>
        <Heading breadcrumb={breadcrumb} />
      </div>
      {/* Admin section */}
      <div className="flex flex-1 pt-6">
        <div className="w-screen min-h-0 overflow-hidden">
          <form className="lg:col-span-9" action="#" method="POST">
            <div className="grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-6">
                <CustomLabel field="search" name={tc('field_search')} />
                <input
                  type="text"
                  name="search"
                  id="search"
                  autoComplete={tc('auto_search')}
                  placeholder={tc('field_search')}
                  value={searchValue}
                  onChange={handleSearch}
                  className={FormStyles('input')}
                />
                {searchValue && (
                  <div className="mt-2">
                    {filteredTags.map((tag) => (
                      <button
                        key={tag._id}
                        onClick={() => handleTagSelection(tag)}
                        className="bg-gray-100 text-gray-800 py-1 px-2 mr-2 mb-2 rounded"
                      >
                        {tag.tag}
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="mt-6 grid grid-cols-12 gap-6">
              <div className="col-span-12 sm:col-span-12">
                <CustomLabel field="tags" name={tc('field_tags')} />
                {selectedTags.map((tag) => (
                  <CustomTagProfile
                    key={tag._id}
                    name={tag.tag}
                    onRemove={() => handleTagRemoval(tag._id)}
                  />
                ))}
              </div>
            </div>
            <div className="divide-y divide-gray-200 pt-6">
              <div className="mt-4 flex justify-end gap-x-3 py-4 px-4 sm:px-6">
                <CustomCancel />
                <CustomSubmit />
              </div>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

ProfileFollow.Layout = AdminLayout;
export default ProfileFollow;

export async function getStaticProps({ locale }: GetStaticPropsContext) {
  return {
    props: {
      messages: (await import(`@/messages/${locale}.json`)).default,
    },
  };
}
