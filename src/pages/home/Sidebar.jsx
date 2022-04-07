import { useSelector, useDispatch } from 'react-redux';
import { useState } from 'react';
import { useMap } from 'react-map-gl';
import _ from 'lodash';
import Pagination from '@mui/material/Pagination';
import Stack from '@mui/material/Stack';
import LinearProgress from '@mui/material/LinearProgress';

import ProjectCardSmall from 'src/components/ProjectCardSmall.jsx';
import ListIterator from 'src/components/ListIterator.jsx';
import ContractorCardBig from 'src/components/ContractorCardBig.jsx';
import ProjectCardBig from 'src/components/ProjectCardBig.jsx';
import ContractorSmallCard from 'src/components/ContractorCardSmall.jsx';
import UserSwitch from 'src/components/UserSwitch.jsx';

import { REQUEST_STATUS } from 'src/store';
import {
  getUsers,
  getSelectedUser,
  getMapMarkerType,
  getSelectUserStatus,
  getBounds,
  getUsersStatus
} from 'src/reducers/map';
import { getPaginationInfo } from 'src/store';
import { getMapMarkers, initalizePage } from 'src/actions/map';
import { getUsersActions, getUserActions } from 'src/actions/user';

import styles from './Sidebar.module.css';
import UserCardContainer from './UserCardContainer.jsx';

const SidebarUserItem = ({ onCloseUserCard, onClickSummaryUserCard }) => {
  const mapMarkerType = useSelector(getMapMarkerType);
  const usersStatus = useSelector(getUsersStatus);
  const selectUserStatus = useSelector(getSelectUserStatus);
  const selectedUser = useSelector(getSelectedUser);
  const users = useSelector(getUsers);
  const isListLoading = usersStatus !== REQUEST_STATUS.SUCCEEDED;
  const isUserLoading = selectUserStatus !== REQUEST_STATUS.SUCCEEDED;
  const isContractorSelected = mapMarkerType === 'contractor';

  if (selectedUser) {
    return (
      <UserCardContainer
        isLoading={isUserLoading}
        onClose={onCloseUserCard}
      >
        {
          isContractorSelected
          ? <ContractorCardBig item={selectedUser} />
          : <ProjectCardBig item={selectedUser} />
        }
      </UserCardContainer>
    )
  }

  return (
    <>
      {
        isListLoading
        && <LinearProgress sx={{ margin: '15px' }} />
      }
      <ListIterator
        items={users}
        onClick={onClickSummaryUserCard}
        itemRenderer={
          isContractorSelected
          ? ContractorSmallCard
          : ProjectCardSmall
        }
      />
    </>
  )
}

const Sidebar = () => {
  const dispatch = useDispatch();
  const { mainMap } = useMap();
  const users = useSelector(getUsers);
  const currentBounds = useSelector(getBounds);
  const selectedUser = useSelector(getSelectedUser);
  const mapMarkerType = useSelector(getMapMarkerType);
  const paginationInfo = useSelector(getPaginationInfo);
  const isUserSwitchChecked = mapMarkerType ? mapMarkerType === 'contractor' : true;
  const sidebarUserItemsHeight = window.innerHeight - (paginationInfo.totalPages > 1 ? 116 : 70);
  const showPagination = paginationInfo.totalPages > 1 && !selectedUser;

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

  const onChangePagination = (_, page) => {
    dispatch(getUsersActions({
      coords: currentBounds,
      user: mapMarkerType,
      page
    }))
  }

  return (
    <div className={styles.root}>
      {
        !selectedUser &&
        <div className={styles.userSwitch}>
          <UserSwitch
            checked={isUserSwitchChecked}
            onChange={onSwitchUser}
          />
        </div>
      }
      <div
        className={styles.sidebarUserItems}
        style={{ height: sidebarUserItemsHeight }}
      >
        <SidebarUserItem
          onCloseUserCard={onCloseUserCard}
          onClickSummaryUserCard={onClickSummaryUserCard}
        />
      </div>
      {
        showPagination &&
        <Stack spacing={2}>
          <Pagination
            className={styles.pagination}
            onChange={onChangePagination}
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
