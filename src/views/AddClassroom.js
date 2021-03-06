import React from 'react';
import styled from 'styled-components';
import CreateIcon from '@material-ui/icons/Create';
import AvatarBox from '../components/atoms/AvatarBox';
import AddClassroomFrom from '../components/form/AddClassroomForm';

const StyledWrapper = styled.div`
  width: 100%;
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  justify-content: center;
  align-items: flex-start;

  @media (min-width: 900px) {
    align-items: center;
    min-height: calc(var(--vh) * 100);
  }
`;

const StyledContainer = styled.div`
  width: 100%;
  height: 100%;
  max-width: 300px;
  padding: 30px 0;

  @media (min-width: 1000px) {
    max-width: 600px;
  }
`;

const StyledAvatarContainer = styled.div`
  width: 100%;
  padding: 30px 15px;
  display: flex;
  justify-content: center;
`;

const AddClassroom = () => (
  <StyledWrapper>
    <StyledContainer>
      <StyledAvatarContainer>
        <AvatarBox>
          <CreateIcon />
        </AvatarBox>
      </StyledAvatarContainer>
      <AddClassroomFrom />
    </StyledContainer>
  </StyledWrapper>
);

export default AddClassroom;
