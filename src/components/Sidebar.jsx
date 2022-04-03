import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';

import UserSwitch from './SidebarUserSwitch.jsx';
import ContractorItemList from './ContractorItemList.jsx';
import ContractorCard from './ContractorCard.jsx';
import ProjectItemList from './ProjectItemList.jsx';
import ProjectCard from './ProjectCard.jsx';

import { getMapMarkerList, getSelectedUser, getMapMarkerType } from 'src/reducers/map';
import { getMapMarkers } from 'src/actions/map';

const defaultProfileImage = "/images/rayul-profile-image.jpg";

const ContractorSidebarItem = ({ onCloseUserCard, onClickSummaryUserCard }) => {
  const selectedUser = useSelector(getSelectedUser);
  const mapMarkerList = useSelector(getMapMarkerList);

  return (
    selectedUser
      ? <ContractorCard item={selectedUser} onClose={onCloseUserCard} />
      : <ContractorItemList
          list={mapMarkerList}
          onClick={onClickSummaryUserCard}
        />
  )
}

const ProjectSidebarItem = ({ onCloseUserCard, onClickSummaryUserCard }) => {
  const selectedUser = useSelector(getSelectedUser);
  const mapMarkerList = useSelector(getMapMarkerList);

  return (
    selectedUser
      ? <ProjectCard item={selectedUser} onClose={onCloseUserCard} />
      : <ProjectItemList
          list={mapMarkerList}
          onClick={onClickSummaryUserCard}
        />
  )
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const { mainMap } = useMap();
  const mapMarkerList = useSelector(getMapMarkerList);
  const selectedUser = useSelector(getSelectedUser);
  const mapMarkerType = useSelector(getMapMarkerType);

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
      user: event.target.checked ? 'contractor' : 'owner'
    }))
  }

  const isUserSwitchChecked = mapMarkerType ? mapMarkerType === 'contractor' : true;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {!selectedUser && <div style={{ margin: '15px 10px 10px 10px', height: 45 }}><UserSwitch checked={isUserSwitchChecked} onChange={onSwitchUser} /></div>}
      <div style={{ height: window.innerHeight - 70, overflow: 'auto' }}>
        {
          mapMarkerType === 'contractor'
            ? <ContractorSidebarItem
                onCloseUserCard={onCloseUserCard}
                onClickSummaryUserCard={onClickSummaryUserCard}
              />
            : <ProjectSidebarItem
                onCloseUserCard={onCloseUserCard}
                onClickSummaryUserCard={onClickSummaryUserCard}
              />
        }
      </div>
    </div>
  )
}

export default Sidebar;
