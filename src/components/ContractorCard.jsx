import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';

import UserSwitch from './SidebarUserSwitch.jsx';
import ContractorItemList from './ContractorItemList.jsx';

import { getMapMarkerList, getSelectedUser } from 'src/reducers/map';
import { getMapMarkers } from 'src/actions/map';

const defaultProfileImage = "/images/rayul-profile-image.jpg";

const Card = ({ item, onClose }) => {
  const address = item.contractorInfo.address;
  const fullAddress = Object.keys(address).reduce((total, current) => {
    if (address[current]) {
      return total.length > 0 ? address[current] + ',' + ' ' + total : address[current]
    }
  }, '');

  return (
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
  )
}

const ContractorCard = (props) => {
  const { onClose, isLoading, ...rest } = props;

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
      {
        !isLoading && <Card {...rest} />
      }
    </div>
  )
}

export default ContractorCard;
