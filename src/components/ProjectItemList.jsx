import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';
import dayjs from 'dayjs';
import advancedFormat from 'dayjs/plugin/advancedFormat';

import UserSwitch from './SidebarUserSwitch.jsx';

import { getMapMarkerList, getSelectedUser } from 'src/reducers/map';
import { getMapMarkers } from 'src/actions/map';
import maxChar from 'src/utils/maxChar';

const formatDate = (date) => {
  const dateFormat = dayjs.extend(advancedFormat);
  return dateFormat(date).format('MMMM Do, YYYY');
};

const ProjectItemList = ({ list, onClick }) => list.map((item) => {
  const address = _.get(item, 'projectInfo.address') || {};
  const desc = maxChar(item.projectInfo.description, 150);

  return (
    <div
      style={{
        margin: 10,
        display: 'flex',
        flexDirection: 'column',
        padding: 10,
        borderRadius: 10,
        textAlign: 'left',
        maxWidth: 400,
        backgroundColor: 'white',
        alignItems: 'center',
        boxShadow: 'rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px',
        cursor: 'pointer',
      }}
      onClick={() => { onClick(item.id) }}
    >
      <div>
        <div style={{ fontSize: 16, fontWeight: 500 }}>{item.projectInfo.title}</div>
        <p style={{ fontSize: 15 }}>{desc}</p>
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '100%',
          gap: '5px'
        }}
      >
        <div style={{ fontSize: 11, padding: '5px 10px', borderRadius: 15, textTransform: 'uppercase', backgroundColor: '#e9e9e9', width: '100%' }}>
          {address.city + ', ' + address.state}
        </div>
        <div style={{ fontSize: 11, padding: '5px 10px', borderRadius: 15, textTransform: 'uppercase', backgroundColor: '#e9e9e9', width: 'calc(50% - 22.5px)' }}>
          ${item.projectInfo.budget}
        </div>
        <div style={{ fontSize: 11, padding: '5px 10px', borderRadius: 15, textTransform: 'uppercase', backgroundColor: '#e9e9e9', width: 'calc(50% - 22.5px)' }}>
          {formatDate(item.projectInfo.startDate)}
        </div>
      </div>
    </div>
  )
});

export default ProjectItemList;
