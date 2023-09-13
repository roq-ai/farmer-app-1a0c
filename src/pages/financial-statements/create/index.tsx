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
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFinancialStatement } from 'apiSdk/financial-statements';
import { financialStatementValidationSchema } from 'validationSchema/financial-statements';
import { FarmInterface } from 'interfaces/farm';
import { getFarms } from 'apiSdk/farms';
import { FinancialStatementInterface } from 'interfaces/financial-statement';

function FinancialStatementCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FinancialStatementInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFinancialStatement(values);
      resetForm();
      router.push('/financial-statements');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FinancialStatementInterface>({
    initialValues: {
      contract_id: '',
      total_income: 0,
      total_expense: 0,
      net_income: 0,
      statement_date: new Date(new Date().toDateString()),
      farm_id: (router.query.farm_id as string) ?? null,
    },
    validationSchema: financialStatementValidationSchema,
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
              label: 'Financial Statements',
              link: '/financial-statements',
            },
            {
              label: 'Create Financial Statement',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Financial Statement
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.contract_id}
            label={'Contract Id'}
            props={{
              name: 'contract_id',
              placeholder: 'Contract Id',
              value: formik.values?.contract_id,
              onChange: formik.handleChange,
            }}
          />

          <NumberInput
            label="Total Income"
            formControlProps={{
              id: 'total_income',
              isInvalid: !!formik.errors?.total_income,
            }}
            name="total_income"
            error={formik.errors?.total_income}
            value={formik.values?.total_income}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_income', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Total Expense"
            formControlProps={{
              id: 'total_expense',
              isInvalid: !!formik.errors?.total_expense,
            }}
            name="total_expense"
            error={formik.errors?.total_expense}
            value={formik.values?.total_expense}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('total_expense', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <NumberInput
            label="Net Income"
            formControlProps={{
              id: 'net_income',
              isInvalid: !!formik.errors?.net_income,
            }}
            name="net_income"
            error={formik.errors?.net_income}
            value={formik.values?.net_income}
            onChange={(valueString, valueNumber) =>
              formik.setFieldValue('net_income', Number.isNaN(valueNumber) ? 0 : valueNumber)
            }
          />

          <FormControl id="statement_date" mb="4">
            <FormLabel fontSize="1rem" fontWeight={600}>
              Statement Date
            </FormLabel>
            <DatePicker
              selected={formik.values?.statement_date ? new Date(formik.values?.statement_date) : null}
              onChange={(value: Date) => formik.setFieldValue('statement_date', value)}
            />
          </FormControl>
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
              onClick={() => router.push('/financial-statements')}
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
    entity: 'financial_statement',
    operation: AccessOperationEnum.CREATE,
  }),
)(FinancialStatementCreatePage);
