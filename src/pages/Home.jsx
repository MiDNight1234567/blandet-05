import {
  Container,
  ExchangeForm,
  ExchangeInfo,
  Heading,
  Loader,
  Section,
} from 'components';
import { useSelector } from 'react-redux';
import {
  selectExchangeInfo,
  selectIsError,
  selectIsLoading,
} from 'reduxState/selectors';

const Home = () => {
  const isError = useSelector(selectIsError);
  const isLoading = useSelector(selectIsLoading);
  const exchangeInfo = useSelector(selectExchangeInfo);
  // console.log('exchangeInfo:', exchangeInfo);
  return (
    <Section>
      <Container>
        <Heading info title="What currencies do you want to exchange?🙂" />
        <ExchangeForm />
        {isLoading && <Loader />}
        {exchangeInfo && <ExchangeInfo {...exchangeInfo} />}
        {!isError ?? (
          <Heading
            error
            title="Something went wrong...😐 Check the data validity and try again!"
          />
        )}
      </Container>
    </Section>
  );
};

export default Home;
