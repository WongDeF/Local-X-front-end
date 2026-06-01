import { memo, type FunctionComponent } from "react";
import { Col, Row } from 'antd';
const Conditions: FunctionComponent<object> = () => {
    return <div>
        <Row>
            <Col xs={24} lg={8}>
                Col
            </Col>
            <Col xs={24} lg={8}>
                Col
            </Col>
            <Col xs={24} lg={8}>
                Col
            </Col>
        </Row>
    </div>
}
export default memo(Conditions)