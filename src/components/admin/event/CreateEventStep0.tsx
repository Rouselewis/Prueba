/** @format */
import { useTranslations } from 'next-intl';
import { CustomLabel, CustomError } from '@/components/forms';
import { FormStyles } from '@/helpers';
import { NameDescLang } from '@/components/forms/lang';
import {
  EventCategory,
  EventSupplier,
  EventSpecialCategory,
} from '@/interfaces/event';
import { useLocale } from 'next-intl';
import {
  useFormContext,
  Controller,
  useFieldArray,
  UseFieldArrayReturn,
} from 'react-hook-form';
import { TagsInput } from 'react-tag-input-component';
import { CardUpload } from '@/components/commons';
type Props = {
  categories: EventCategory[];
  suppliers: EventSupplier[];
  specialCategories: EventSpecialCategory[];
} & UseFieldArrayReturn<any, any>;
const CreateEventStep0 = ({
  categories,
  suppliers,
  specialCategories,
  fields,
}: Props) => {
  const {
    register,
    watch,
    control,
    formState: { errors },
  } = useFormContext();
  const t = useTranslations('Panel_SideBar');
  const tc = useTranslations('Common_Forms');
  const tp = useTranslations('Panel_Profile_Request');
  const locale = useLocale();
  const filteredCategories = categories?.map((category) => ({
    ...category,
    category:
      category?.category?.find(({ lang }) => lang == locale) ||
      category?.category?.find(({ lang }) => lang == 'es'),
  }));
  const [specialCategory, category, subCategory, subSubCategory] = watch([
    'special_category',
    'category',
    'category',
    'sub_sub_category',
  ]);
  const subCategories = filteredCategories.filter(
    (c) => c._id !== category?._id
  );

  const subSubCategories = filteredCategories.filter(
    (c) => c._id !== subCategory?._id
  );

  return (
    <div>
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 sm:col-span-12">
          <CustomLabel field="supplier" name={tc('field_supplier')} />
          <select
            id="supplier"
            name="supplier"
            className={FormStyles('select')}
            {...register('event_general.supplier_id')}
          >
            <option value="">{tc('field_select_supplier')}</option>
            {suppliers?.map((supplier, idx) => (
              <option key={idx} value={supplier?.name}>
                {supplier?.name}
              </option>
            ))}
          </select>
          {errors?.['event_general']?.['supplier_id'] && (
            <CustomError
              error={errors?.['event_general']?.['supplier_id']?.message}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <CustomLabel
            field="special_category"
            name={tc('field_special_category')}
            required
          />
          <select
            id="special_category"
            name="special_category"
            className={FormStyles('select')}
            defaultValue={''}
            {...register('event_general.special_category_id')}
          >
            <option value="">{tc('field_select_special_category')}</option>
            {specialCategories?.map((specialCategory, idx) => (
              <option key={idx} value={specialCategory?._id}>
                {specialCategory?.description}
              </option>
            ))}
          </select>
          {errors?.['event_general']?.['special_category_id'] && (
            <CustomError
              error={
                errors?.['event_general']?.['special_category_id']?.message
              }
            />
          )}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <CustomLabel field="category" name={tc('field_category')} required />
          <select
            id="category"
            name="category"
            className={FormStyles('select')}
            {...register('event_general.category_id')}
          >
            <option value="">{tc('field_select_category')}</option>
            {filteredCategories?.map((category, idx) => (
              <option key={idx} value={category?._id}>
                {category?.category?.name}
              </option>
            ))}
          </select>
          {errors?.['event_general']?.['category_id'] && (
            <CustomError
              error={errors?.['event_general']?.['category_id']?.message}
            />
          )}
        </div>
      </div>
      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <CustomLabel
            field="subcategory"
            name={tc('field_subcategory')}
            required
          />
          <select
            id="subcategory"
            name="subcategory"
            className={FormStyles('select')}
            {...register('event_general.sub_category_id')}
          >
            <option value="">{tc('field_select_subcategory')}</option>
            {subCategories?.map((category, idx) => (
              <option key={idx} value={category?._id}>
                {category?.category?.name}
              </option>
            ))}
          </select>
          {errors?.['event_general']?.['sub_category_id'] && (
            <CustomError
              error={errors?.['event_general']?.['sub_category_id']?.message}
            />
          )}
        </div>
        <div className="col-span-12 sm:col-span-6 lg:col-span-6">
          <CustomLabel
            field="subsubcategory"
            name={tc('field_subsubcategory')}
            required
          />
          <select
            id="subsubcategory"
            name="subsubcategory"
            className={FormStyles('select')}
            {...register('event_general.sub_sub_category_id')}
          >
            <option value="">{tc('field_select_subsubcategory')}</option>
            {subSubCategories?.map((category, idx) => (
              <option key={idx} value={category?._id}>
                {category?.category?.name}
              </option>
            ))}
          </select>
          {errors?.['event_general']?.['sub_sub_category_id'] && (
            <CustomError
              error={
                errors?.['event_general']?.['sub_sub_category_id']?.message
              }
            />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <CustomLabel
            field="event_image_web-upload"
            name={tc('field_event_image_web')}
          />
          <CardUpload className="mt-2" name="picture_web" control={control} />
          {errors?.picture_web && (
            <CustomError error={errors?.picture_web?.message} />
          )}
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <CustomLabel
            field="event_image_app-upload"
            name={tc('field_event_image_app')}
          />
          <CardUpload className="mt-2" name="app_web" control={control} />
          {errors?.picture_app && (
            <CustomError error={errors?.picture_app?.message} />
          )}
        </div>

        <div className="col-span-12 sm:col-span-6 lg:col-span-4">
          <CustomLabel
            field="event_image_flyer-upload"
            name={tc('field_event_image_flyer')}
          />
          <CardUpload className="mt-2" name="flyer" control={control} />
          {errors?.flyer && <CustomError error={errors?.flyer?.message} />}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        <div className="col-span-12 sm:col-span-6">
          <CustomLabel field="tags" name={tc('field_tags')} />
          <Controller
            control={control}
            name="event_general.tags"
            render={({ field: { onChange, value } }) => (
              <TagsInput
                value={value}
                onChange={onChange}
                placeHolder={tc('field_tags')}
              />
            )}
          />
          {errors?.['event_general']?.['tags'] && (
            <CustomError error={errors?.['event_general']?.['tags']?.message} />
          )}
        </div>
      </div>

      <div className="grid grid-cols-12 gap-6 mt-6">
        {fields?.map((field, index) => (
          <NameDescLang key={field?.id} index={index} />
        ))}
      </div>
    </div>
  );
};

export default CreateEventStep0;
