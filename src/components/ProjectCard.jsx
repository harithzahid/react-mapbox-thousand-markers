import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';

import { formatDate } from 'src/utils';

import UserSwitch from './SidebarUserSwitch.jsx';
import ContractorItemList from './ContractorItemList.jsx';

import { getMapMarkerList, getSelectedUser } from 'src/reducers/map';
import { getMapMarkers } from 'src/actions/map';

const data = {
  projectInfo: {
    title: 'Need helps moving stuff.',
    address: {
      state: 'New York',
      country: 'US'
    },
  }
}

const ContractorCard = ({ item=data, onClose }) => {
  const address = item.projectInfo.address;
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
      <h3>{item.projectInfo.title}</h3>
      <div style={{ fontSize: 13 }}>{fullAddress}</div>
      <p>{item.projectInfo.description}</p>
      <div>Budget: ${item.projectInfo.budget}</div>
      <div>Start date: {formatDate(item.projectInfo.startDate)}</div>
    </div>
  )
}

export default ContractorCard;
