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

import {
  selectUsers,
  selectUser,
  selectMapMarkerType,
  selectUserStatus,
  selectMapBounds,
  selectUsersStatus,
  selectPaginationInfo
} from 'src/store';
import { REQUEST_STATUS, USER_TYPE, FETCH_USER_CLEANUP } from 'src/constants';
import { fetchMapMarkers } from 'src/actions/map';
import { updateUserTypeActions, fetchUsers, fetchUser  } from 'src/actions/user';

import styles from './Sidebar.module.css';
import UserCardContainer from './UserCardContainer.jsx';

const SidebarUserItem = ({ onCloseCard, onClickListCard }) => {
  const markerType = useSelector(selectMapMarkerType);
  const usersStatus = useSelector(selectUsersStatus);
  const userStatus = useSelector(selectUserStatus);
  const user = useSelector(selectUser);
  const users = useSelector(selectUsers);
  const isListLoading = usersStatus !== REQUEST_STATUS.SUCCEEDED;
  const isUserLoading = userStatus !== REQUEST_STATUS.SUCCEEDED;
  const isContractorSelected = markerType === USER_TYPE.CONTRACTOR;

  if (user) {
    return (
      <UserCardContainer
        isLoading={isUserLoading}
        onClose={onCloseCard}
      >
        {
          isContractorSelected
          ? <ContractorCardBig item={user} />
          : <ProjectCardBig item={user} />
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
        onClick={onClickListCard}
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
  const { mainMap } = useMap();
  const dispatch = useDispatch();
  const users = useSelector(selectUsers);
  const currentBounds = useSelector(selectMapBounds);
  const user = useSelector(selectUser);
  const markerType = useSelector(selectMapMarkerType);
  const paginationInfo = useSelector(selectPaginationInfo);
  const isUserSwitchChecked = !markerType || markerType === USER_TYPE.CONTRACTOR;
  const sidebarUserItemsHeight = window.innerHeight - (paginationInfo.totalPages > 1 ? 116 : 70);
  const showPagination = paginationInfo.totalPages > 1 && !user;

  const onClickListCard = (id) => {
    dispatch(fetchUser(id));
  }

  const onCloseCard = () => {
    dispatch({
      type: FETCH_USER_CLEANUP
    })
  }

  const onSwitchUser = (event) => {
    const userType = event.target.checked
      ? USER_TYPE.CONTRACTOR
      : USER_TYPE.OWNER;
    dispatch(
      updateUserTypeActions(userType)
    );
  }

  const onChangePagination = (_, page) => {
    dispatch(
      fetchUsers(currentBounds, markerType, page)
    );
  }

  return (
    <div className={styles.root}>
      {
        !user &&
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
          onCloseCard={onCloseCard}
          onClickListCard={onClickListCard}
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
