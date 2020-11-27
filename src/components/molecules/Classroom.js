import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import Title from '../atoms/Title';
import DotStatus from '../atoms/DotStatus';

const StyledClassroom = styled.div`
  height: 100px;
  border-radius: ${({ theme }) => theme.radius};
  border: 3px solid ${({ theme }) => theme.colors.dark};
`;

const StyledTitleBox = styled.div`
  padding: 10px;
  padding-bottom: 0;
  height: 50%;
  display: flex;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  font-size: 25px;
  text-transform: none;
  color: ${({ theme }) => theme.colors.dark}; ;
`;

const StyledCapacityBox = styled(StyledTitleBox)`
  padding: 10px;
  padding-top: 0;
`;

const StyledParagraph = styled.p`
  margin: 0;
  font-size: 21px;
  align-self: flex-end;
`;

const Classroom = ({ number, label, status, capacity }) => (
  <StyledClassroom key={number}>
    <StyledTitleBox>
      <DotStatus type={status} title={`status sali nr ${number} to ${label}`} />
      <StyledTitle as="h3">{number}</StyledTitle>
    </StyledTitleBox>
    <StyledCapacityBox>
      <StyledParagraph>{`Pojemność: ${capacity}`}</StyledParagraph>
    </StyledCapacityBox>
  </StyledClassroom>
);

Classroom.propTypes = {
  number: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
  capacity: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
};

export default Classroom;