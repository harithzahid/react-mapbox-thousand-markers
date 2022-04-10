import _ from 'lodash';
import { styled } from '@mui/system';

import { formatDate, objectToString } from 'src/utils';

const Address = styled('div')({
  fontSize: 13
});

const ProjectCardBig = ({ item }) => {
  const address = _.get(item, 'projectInfo.address') || {};
  const titleText = _.get(item, 'projectInfo.title');
  const descriptionText = _.get(item, 'projectInfo.description');
  const budgetText = _.get(item, 'projectInfo.budget') || 0;
  const startDate = _.get(item, 'projectInfo.startDate');
  const fullAddressText = objectToString(address, ', ');

  return (
    <>
      <h3>
        {titleText}
      </h3>
      <Address>
        {fullAddressText}
      </Address>
      <p>
        {descriptionText}
      </p>
      <div>
        Budget: ${budgetText}
      </div>
      <div>
        Start date: {formatDate(startDate)}
      </div>
    </>
  )
}

export default ProjectCardBig;
