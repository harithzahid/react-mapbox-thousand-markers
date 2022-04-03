import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';

import UserSwitch from './SidebarUserSwitch.jsx';

import { getMapMarkerList, getSelectedUser } from 'src/reducers/map';
import { getMapMarkers } from 'src/actions/map';

const defaultProfileImage = "/images/rayul-profile-image.jpg"

const ContractorItemList = ({ list, onClick }) => list.map((item) => {

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

export default ContractorItemList;
