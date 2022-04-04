import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';

import UserSwitch from './SidebarUserSwitch.jsx';
import ContractorItemList from './ContractorItemList.jsx';
import ContractorCard from './ContractorCard.jsx';
import ProjectItemList from './ProjectItemList.jsx';
import ProjectCard from './ProjectCard.jsx';

import { REQUEST_STATUS } from 'src/store';
import { getUsers, getSelectedUser, getMapMarkerType, getSelectUserStatus } from 'src/reducers/map';
import { getPaginationInfo } from 'src/store';
import { getMapMarkers, initalizePage } from 'src/actions/map';
import { getUsersActions, getUserActions } from 'src/actions/user';

const defaultProfileImage = "/images/rayul-profile-image.jpg";

const ContractorSidebarItem = ({ onCloseUserCard, onClickSummaryUserCard }) => {
  const selectUserStatus = useSelector(getSelectUserStatus);
  const selectedUser = useSelector(getSelectedUser);
  const users = useSelector(getUsers);

  return (
    selectedUser
      ? <ContractorCard
          isLoading={selectUserStatus !== REQUEST_STATUS.SUCCEEDED}
          item={selectedUser}
          onClose={onCloseUserCard}
        />
      : <ContractorItemList
          list={users}
          onClick={onClickSummaryUserCard}
        />
  )
}

const ProjectSidebarItem = ({ onCloseUserCard, onClickSummaryUserCard }) => {
  const selectUserStatus = useSelector(getSelectUserStatus);
  const selectedUser = useSelector(getSelectedUser);
  const users = useSelector(getUsers);

  return (
    selectedUser
      ? <ProjectCard
          isLoading={selectUserStatus !== REQUEST_STATUS.SUCCEEDED}
          item={selectedUser}
          onClose={onCloseUserCard}
        />
      : <ProjectItemList
          list={users}
          onClick={onClickSummaryUserCard}
        />
  )
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const { mainMap } = useMap();
  const users = useSelector(getUsers);
  const selectedUser = useSelector(getSelectedUser);
  const mapMarkerType = useSelector(getMapMarkerType);
  const paginationInfo = useSelector(getPaginationInfo);

  const onClickSummaryUserCard = (id) => {
    dispatch(getUserActions(id));
  }

  const onCloseUserCard = () => {
    dispatch({
      type: 'CLEAR_SELECTED_USER'
    })
  }

  const onSwitchUser = (event) => {
    const boundsCoords = mainMap.getBounds().toArray();
    const userType = event.target.checked ? 'contractor' : 'owner';
    dispatch(initalizePage(boundsCoords, userType));
  }

  const isUserSwitchChecked = mapMarkerType ? mapMarkerType === 'contractor' : true;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {
        !selectedUser &&
        <div style={{ margin: '15px 10px 10px 10px', height: 45 }}>
          <UserSwitch
            checked={isUserSwitchChecked}
            onChange={onSwitchUser}
          />
        </div>
      }
      <div style={{ height: window.innerHeight - (paginationInfo.totalPages > 1 ? 116 : 70), overflow: 'auto' }}>
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
      {
        paginationInfo.totalPages > 1 && !selectedUser &&
        <Stack spacing={2}>
          <Pagination
            sx={{ display: 'flex', margin: '10px', justifyContent: 'center' }}
            onChange={(e, page) => {
              const boundsCoords = mainMap.getBounds().toArray();
              dispatch(getUsersActions({
                coords: boundsCoords,
                user: mapMarkerType,
                page
              }))
            }}
            page={paginationInfo.page}
            count={paginationInfo.totalPages}
            size="small"
          />
        </Stack>
      }
    </div>
  )
}

export default Sidebar;
