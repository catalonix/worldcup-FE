import Card from 'components/common/Card';
import { Button, DatePicker, Select } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import { ndviSearchOptions } from 'common/constants/NdviDetail';

const NdviDetail = () => {
  return (
    <div>
      <Card title="상세검색">
        <div>
          <div className="search-content">
            <Select options={ndviSearchOptions} defaultValue={'all'} style={{ width: '20%' }} />
            <DatePicker />
            <DatePicker />
            <Button icon={<SearchOutlined />}>조회하기</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default NdviDetail;
