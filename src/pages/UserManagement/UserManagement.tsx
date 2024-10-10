import { Button, DatePicker, Select } from 'antd';
import SearchBox from 'components/common/SearchBox';
import { userSearchOptions } from 'common/constants/UserManagement';
import { SearchOutlined } from '@ant-design/icons';

const UserManagment = () => {
  return (
    <div>
      <SearchBox title="상세검색">
        <div>
          <div className="search-content">
            <Select options={userSearchOptions} defaultValue={'all'} style={{ width: '20%' }} />
            <DatePicker />
            <DatePicker />
            <Button icon={<SearchOutlined />}>조회하기</Button>
          </div>
        </div>
      </SearchBox>
    </div>
  );
};
export default UserManagment;
