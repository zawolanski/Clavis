import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { Formik, Form, Field } from 'formik';
import Button from '../atoms/Button';
import Message from '../atoms/Message';
import { FetchContext } from '../../context/fetchContext';
import { ClassroomContext } from '../../context/classroomsContext';
import DateInputs from '../molecules/DateInputs';
import { isSameOrBefore, formatDate } from '../../util/helpers';
import FiltersSchema from '../../schemas/FiltersSchema';
import SubTitle from '../atoms/SubTitle';
import Checkbox from '../molecules/Checkbox';
import { useDate } from '../../hooks/useDate';

const StyledFrom = styled(Form)`
  width: 100%;
`;

const StyledContainer = styled.div`
  padding: 15px 0;
`;

const StyledBox = styled.div`
  width: 220px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.disabled};
  padding: 10px 0;

  &:last-child {
    border-bottom: 0;
  }
`;

const StyledFormContainer = styled.div`
  margin-bottom: 20px;
`;

const FiltersForm = () => {
  const [isError, setIsError] = useState({ is: false, msg: 'Wystąpił błąd podczas filtrowania.' });
  const [isCorrect, setIsCorrect] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const fetchContext = useContext(FetchContext);
  const classroomContext = useContext(ClassroomContext);
  const [dateObj] = useDate();

  return (
    <>
      <Formik
        validationSchema={FiltersSchema}
        initialValues={{
          ...dateObj,
          status: ['take', 'free'],
        }}
        onSubmit={async (values, { setErrors }) => {
          const formattedDate = formatDate(values);
          setIsCorrect(false);
          setIsError({ is: false, msg: 'Wystąpił błąd podczas filtrowania.' });
          setIsLoading(true);

          if (!isSameOrBefore(formattedDate.startAt, formattedDate.endAt)) {
            setErrors({ startAt: 'Data zakończenia jest mniejsza niż rozpoczęcia' });
            setIsLoading(false);
            return;
          }

          const dataToSend = { status: values.status || [], ...formattedDate };

          try {
            const result = await fetchContext.authAxios.post(`classrooms`, dataToSend);
            classroomContext.setClassrooms(result.data.classrooms);
          } catch (err) {
            setIsError({ is: true, msg: 'Wystąpił błąd podczas filtrowania.' });
          }
          setIsLoading(false);
        }}
      >
        {({ values, errors, touched, handleChange }) => (
          <StyledFrom autoComplete="off">
            <StyledFormContainer>
              <StyledBox>
                <SubTitle>W przedziale:</SubTitle>
                <DateInputs values={values} errors={errors} touched={touched} handleChange={handleChange} />
              </StyledBox>
              <StyledBox role="group" aria-labelledby="checkbox-status-group">
                <SubTitle id="checkbox-status-group">Status sali:</SubTitle>
                <ul>
                  <Field as={Checkbox} name="status" label="Wolna" type="checkbox" value="free" />
                  <Field as={Checkbox} name="status" label="Zajęta" type="checkbox" value="take" />
                </ul>
              </StyledBox>
            </StyledFormContainer>
            {(isError.is || isCorrect || errors.startAt) && (
              <StyledContainer>
                <Message error={isError.is || errors.startAt} correct={isCorrect}>
                  {isError.is || errors.startAt ? errors.startAt || isError.msg : 'Sala zarezerwowana pomyślnie.'}
                </Message>
              </StyledContainer>
            )}
            <Button isLoading={isLoading}>Filtruj</Button>
          </StyledFrom>
        )}
      </Formik>
    </>
  );
};

export default FiltersForm;