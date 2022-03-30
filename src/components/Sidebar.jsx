import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';

import { getMapMarkersData, getSelectedUser } from 'src/reducers/map';

const ItemList = ({ list, onClick }) => list.map((item) => {
  return (
    <div
      style={{ margin: 20, padding: 10, backgroundColor: 'beige' }}
      onClick={() => { onClick(item.id) }}
    >
      {item.id}
      {item.contractorInfo.address}
    </div>
  )
});

const UserCard = ({ item, onClose }) => {

  return (
    <div
      style={{ margin: 20, padding: 10, backgroundColor: 'beige' }}
    >
      <div onClick={onClose}>X</div>
      {item.name}
    </div>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const mapMarkersData = useSelector(getMapMarkersData);
  const selectedUser = useSelector(getSelectedUser);

  const onClickSummaryUserCard = (id) => {
    dispatch({
      type: 'SELECT_USER',
      payload: {
        data: mapMarkersData.find((item) => item.id === id)
      }
    })
  }

  const onCloseUserCard = () => {
    dispatch({
      type: 'CLEAR_SELECTED_USER'
    })
  }

  return (
    <div>
      {
        selectedUser
          ? <UserCard item={selectedUser} onClose={onCloseUserCard} />
          : <ItemList
            list={mapMarkersData}
            onClick={onClickSummaryUserCard}
          />
      }
    </div>
  )
}

export default Sidebar;
