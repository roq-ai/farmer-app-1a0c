import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
  Center,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getFarmById, updateFarmById } from 'apiSdk/farms';
import { farmValidationSchema } from 'validationSchema/farms';
import { FarmInterface } from 'interfaces/farm';
import { UserInterface } from 'interfaces/user';
import { getUsers } from 'apiSdk/users';

function FarmEditPage() {
  const router = useRouter();
  const id = router.query.id as string;
  const imageUploaderRef = useRef(null);
  const { data, error, isLoading, mutate } = useSWR<FarmInterface>(
    () => (id ? `/farms/${id}` : null),
    () => getFarmById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FarmInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      await imageUploaderRef.current.handleUpload();
      const updated = await updateFarmById(id, values);
      mutate(updated);
      resetForm();
      router.push('/farms');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const handleImageChange = async (file: File | null) => {
    //
  };

  const formik = useFormik<FarmInterface>({
    initialValues: data,
    validationSchema: farmValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Farms',
              link: '/farms',
            },
            {
              label: 'Update Farm',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Farm
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper wrapperProps={{ mb: 3 }}>
          <ImagePicker ref={imageUploaderRef} onChange={handleImageChange} entity="farm" entityId={id} />
        </FormWrapper>

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.description}
            label={'Description'}
            props={{
              name: 'description',
              placeholder: 'Description',
              value: formik.values?.description,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.location}
            label={'Location'}
            props={{
              name: 'location',
              placeholder: 'Location',
              value: formik.values?.location,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Size"
            formControlProps={{
              id: 'size',
              isInvalid: !!formik.errors?.size,
            }}
            name="size"
            error={formik.errors?.size}
            value={formik.values?.size}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('size', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <TextInput
            error={formik.errors.type}
            label={'Type'}
            props={{
              name: 'type',
              placeholder: 'Type',
              value: formik.values?.type,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.name}
            label={'Name'}
            props={{
              name: 'name',
              placeholder: 'Name',
              value: formik.values?.name,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<UserInterface>
            formik={formik}
            name={'user_id'}
            label={'Select User'}
            placeholder={'Select User'}
            fetcher={getUsers}
            labelField={'email'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/farms')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'farm',
    operation: AccessOperationEnum.UPDATE,
  }),
)(FarmEditPage);
