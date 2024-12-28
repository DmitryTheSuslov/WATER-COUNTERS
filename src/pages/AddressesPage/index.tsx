import { Button, Col, Container, Form, Input, Row } from "reactstrap";
import { T_Address } from "src/modules/types.ts";
import AddressCard from "components/AddressCard";
import { AddressMocks } from "src/modules/mocks.ts";
import { useSelector, useDispatch } from "react-redux";
import { setAddressName } from "src/searchSlice";
import { FormEvent, useEffect } from "react";
import { useParams} from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { RootState, AppDispatch } from "src/store";
import { fetchAddresses } from "src/thunks/addressesThunk";
import * as React from "react";
import './index.css'; // Импортируем стили

type AddressesPageProps = {
    addresses: T_Address[],
    setAddresses: React.Dispatch<React.SetStateAction<T_Address[]>>
    isMock: boolean,
    setIsMock: React.Dispatch<React.SetStateAction<boolean>>
    addressName: string,
    setAddressName: React.Dispatch<React.SetStateAction<string>>
}

const AddressesPage: React.FC = () => {
    const {fix} = useParams<{ fix: string }>();
    const navigate = useNavigate();
    const dispatch = useDispatch<AppDispatch>();
    const currentCartCount = useSelector((state: any) => state.addresses_count.addressesCount);
    const addressName = useSelector((state: RootState) => state.search.addressName);
    const { addresses, loading, error, draftId } = useSelector((state: RootState) => state.addresses_count);
    const sessionId = useSelector((state: any) => state.cookie.cookie);
    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();
        console.log(addressName);
        dispatch(fetchAddresses(addressName)); // Вызываем Thunk
      };

    useEffect(() => {
        dispatch(fetchAddresses("")); // Загружаем все аудитории при монтировании
    }, [dispatch]);

    return (
        <Container className="container-custom">
            <Row className="justify-content-center mb-5"> 
                <Col xs="12" md="8" lg="6"> 
                    <Form onSubmit={handleSubmit} className="d-flex">
                        <Input
                            value={addressName}
                            onChange={(e) => dispatch(setAddressName(e.target.value))}
                            placeholder="Поиск..."
                            className="me-2 search-input"
                        />
                        <Button color="primary" className="search-button">
                            Поиск
                        </Button>
                        {sessionId && (
                            <Button
                                color="primary"
                                className="search-button"
                                onClick={() => navigate(`/draft_fixation/${draftId}`)}
                                disabled={currentCartCount === 0} // Отключаем кнопку, если количество 0
                            >
                                Корзина: {currentCartCount !== null ? currentCartCount : 0}
                            </Button>
                        )}
                    </Form>
                </Col>
            </Row>
            <Row className="card-grid">
                {addresses?.map((address) => (
                    <Col key={address.address_id} md="auto" className="address-card-col">
                        <AddressCard address={address} isMock={false} />
                    </Col>
                ))}
            </Row>
    </Container>
    );
};

export default AddressesPage;