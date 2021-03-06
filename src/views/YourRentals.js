import React, { useContext, useEffect, useState } from 'react';
import styled from 'styled-components';
import Loader from '../components/molecules/Loader';
import GridTemplate from '../components/templates/GridTemplate';
import ViewTitle from '../components/atoms/ViewTitle';
import RentalCard from '../components/molecules/RentalCard';
import FixedMessage from '../components/atoms/FixedMessage';
import { CANCELED, FINISH } from '../util/constants';
import { RentalContext } from '../context/rentalsContext';
import { FetchContext } from '../context/fetchContext';

const StyledWrapper = styled.div`
  min-height: calc(var(--vh) * 100 - 70px);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (min-width: ${({ theme }) => theme.breakpoints.hidemenu}) {
    min-height: calc(var(--vh) * 100);
  }
`;

const StyledHeader = styled.div`
  width: 100%;
`;

const StyledContainer = styled.div`
  padding: 30px 15px;
  flex-grow: 1;
  display: flex;
  justify-content: center;
`;

const YourRentals = () => {
  const fetchContext = useContext(FetchContext);
  const rentalContext = useContext(RentalContext);
  const [rental, setRental] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [messageStatus, setMessageStatus] = useState({ show: false, msg: 'Akcja wykonana pomyślnie.' });

  useEffect(() => {
    (async () => {
      setIsLoading(true);
      const cl = await fetchContext.authAxios.post('reservations');
      rentalContext.setRental(cl.data.reservations);
      setRental(cl.data.reservations);
      setIsLoading(false);
    })();
  }, []);

  useEffect(() => {
    // console.log(rentalContext.rentals);
    setRental(rentalContext.rentals);
  }, [rentalContext.rentals]);

  return (
    <StyledWrapper>
      {isLoading ? (
        <Loader size={20} margin={4} />
      ) : (
        <StyledContainer>
          <div>
            <StyledHeader>
              <ViewTitle>Twoje wypożyczenia</ViewTitle>
            </StyledHeader>
            <GridTemplate>
              {rental.length > 0 ? (
                rental.map(
                  (rentalEl) =>
                    rentalEl.status !== CANCELED &&
                    rentalEl.status !== FINISH && (
                      <RentalCard
                        key={rentalEl._id}
                        messageStatus={messageStatus}
                        setMessageStatus={setMessageStatus}
                        userRentals
                        id={rentalEl._id}
                        {...rentalEl}
                      />
                    ),
                )
              ) : (
                <p>Brak próśb o wypożyczenie.</p>
              )}
            </GridTemplate>
          </div>
          <FixedMessage show={messageStatus.show}>{messageStatus.msg}</FixedMessage>
        </StyledContainer>
      )}
    </StyledWrapper>
  );
};

export default YourRentals;
