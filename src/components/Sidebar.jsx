import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';

import UserSwitch from './SidebarUserSwitch.jsx';

import { getMapMarkerList, getSelectedUser } from 'src/reducers/map';
import { getMapMarkers } from 'src/actions/map';

const defaultProfileImage = "/images/rayul-profile-image.jpg"

const ItemList = ({ list, onClick }) => list.map((item) => {

  const address = _.get(item, 'contractorInfo.address') || {};

  return (
    <div
      style={{
        margin: 10,
        display: 'flex',
        padding: 10,
        borderRadius: 10,
        textAlign: 'left',
        maxWidth: 400,
        gap: 20,
        backgroundColor: 'white',
        alignItems: 'center',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        cursor: 'pointer',
      }}
      onClick={() => { onClick(item.id) }}
    >
      <img src={item.contractorInfo.picture || defaultProfileImage} style={{ width: '85px', borderRadius: 5 }} />
      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        <div style={{ fontSize: 16, fontWeight: 500 }}>{item.name}</div>
        <div style={{ fontSize: 12, textTransform: 'uppercase' }}>
          {address.street_address},
          {' ' + address.city}
        </div>
        <div style={{ display: 'flex', gap: 5, flexWrap: 'wrap', }}>
          {
            item.contractorInfo.skills.map((item) => (
              <div style={{ fontSize: 9, padding: '5px 10px', borderRadius: 15, textTransform: 'uppercase', backgroundColor: '#e9e9e9' }}>{item}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
});

const UserCard = ({ item, onClose }) => {
  console.log({ item });

  const address = item.contractorInfo.address;
  const fullAddress = Object.keys(address).reduce((total, current) => {
    if (address[current]) {
      return total.length > 0 ? address[current] + ',' + ' ' + total : address[current]
    }
  }, '');

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: 20,
        borderRadius: 5,
        textAlign: 'left',
        maxWidth: 400,
      }}
    >
      <div onClick={onClose} style={{ fontSize: 14, fontWeight: 'bold' }}>{'< Back'}</div>
      <div>
        <div style={{ marginTop: 20 }}>
          <img src={item.contractorInfo.picture || defaultProfileImage} style={{ width: '100%', borderRadius: 5 }} />
        </div>
        <h2>{item.name}</h2>
        <div style={{ fontSize: 13 }}>{item.contractorInfo.contact_email}</div>
        <div style={{ fontSize: 13 }}>{item.contractorInfo.contact_number}</div>
        <div style={{ fontSize: 13 }}>
          {fullAddress}
        </div>
        <p>{item.contractorInfo.intro}</p>
        <div style={{ display: 'flex', gap: 10 }}>
          {
            item.contractorInfo.skills.map((item) => (
              <div style={{ fontSize: 12, padding: 10, borderRadius: 5, backgroundColor: '#e9e9e9' }}>{item}</div>
            ))
          }
        </div>
      </div>
    </div>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const { mainMap } = useMap();
  const mapMarkerList = useSelector(getMapMarkerList);
  const selectedUser = useSelector(getSelectedUser);

  const onClickSummaryUserCard = (id) => {
    dispatch({
      type: 'SELECT_USER',
      payload: {
        data: mapMarkerList.find((item) => item.id === id)
      }
    })
  }

  const onCloseUserCard = () => {
    dispatch({
      type: 'CLEAR_SELECTED_USER'
    })
  }

  const onSwitchUser = (event) => {
    const boundsCoords = mainMap.getBounds().toArray();
    dispatch(getMapMarkers({
      coords: boundsCoords,
      user: event.target.checked ? 'contractor' : 'project'
    }))
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {!selectedUser && <div style={{ margin: '15px 10px 10px 10px', height: 45 }}><UserSwitch onChange={onSwitchUser} /></div>}
      <div style={{ height: window.innerHeight - 70, overflow: 'auto' }}>
        {
          selectedUser
            ? <UserCard item={selectedUser} onClose={onCloseUserCard} />
            : <ItemList
              list={mapMarkerList}
              onClick={onClickSummaryUserCard}
            />
        }
      </div>
    </div>
  )
}

export default Sidebar;
