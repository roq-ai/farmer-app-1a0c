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
import { getPurchaseById, updatePurchaseById } from 'apiSdk/purchases';
import { purchaseValidationSchema } from 'validationSchema/purchases';
import { PurchaseInterface } from 'interfaces/purchase';
import { FarmInterface } from 'interfaces/farm';
import { getFarms } from 'apiSdk/farms';

function PurchaseEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<PurchaseInterface>(
    () => (id ? `/purchases/${id}` : null),
    () => getPurchaseById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: PurchaseInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updatePurchaseById(id, values);
      mutate(updated);
      resetForm();
      router.push('/purchases');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<PurchaseInterface>({
    initialValues: data,
    validationSchema: purchaseValidationSchema,
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
              label: 'Purchases',
              link: '/purchases',
            },
            {
              label: 'Update Purchase',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Purchase
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
          </Box>
        )}

        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.product_name}
            label={'Product Name'}
            props={{
              name: 'product_name',
              placeholder: 'Product Name',
              value: formik.values?.product_name,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Quantity"
            formControlProps={{
              id: 'quantity',
              isInvalid: !!formik.errors?.quantity,
            }}
            name="quantity"
            error={formik.errors?.quantity}
            value={formik.values?.quantity}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('quantity', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Price"
            formControlProps={{
              id: 'price',
              isInvalid: !!formik.errors?.price,
            }}
            name="price"
            error={formik.errors?.price}
            value={formik.values?.price}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('price', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="purchase_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Purchase Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.purchase_date ? new Date(formik.values?.purchase_date) : null}
              onChange={(value: Date) => formik.setFieldValue('purchase_date', value)}
            />
          </FormControl>

          <TextInput
            error={formik.errors.supplier}
            label={'Supplier'}
            props={{
              name: 'supplier',
              placeholder: 'Supplier',
              value: formik.values?.supplier,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<FarmInterface>
            formik={formik}
            name={'farm_id'}
            label={'Select Farm'}
            placeholder={'Select Farm'}
            fetcher={getFarms}
            labelField={'name'}
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
              onClick={() => router.push('/purchases')}
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
    entity: 'purchase',
    operation: AccessOperationEnum.UPDATE,
  }),
)(PurchaseEditPage);
