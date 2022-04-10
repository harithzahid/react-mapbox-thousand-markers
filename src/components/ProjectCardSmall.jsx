import _ from 'lodash';
import { styled } from '@mui/system';

import maxChar from 'src/utils/maxChar';
import { formatDate } from 'src/utils';

const Root = styled('div')(`
  margin: 10px;
  display: flex;
  padding: 10px;
  border-radius: 10px;
  text-align: left;
  max-width: 400px;
  gap: 20px;
  background-color: white;
  align-items: center;
  box-shadow: rgb(0 0 0 / 20%) 0px 2px 1px -1px, rgb(0 0 0 / 14%) 0px 1px 1px 0px, rgb(0 0 0 / 12%) 0px 1px 3px 0px;
  cursor: pointer;
  flex-direction: column;
`);

const Title = styled('div')(`
  font-size: 16px;
  font-weight: 500;
`);

const Description = styled('p')(`
  font-size: 15px;
`);

const OtherDetailsContainer = styled('div')(`
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 100%;
  gap: 5px;
`)

const OtherDetails = styled('div')(props => `
  font-size: 11px;
  padding: 5px 10px;
  border-radius: 15px;
  text-transform: uppercase;
  background-color: rgb(233, 233, 233);
  width: ${props.width};
`);

const ProjectCardSmall = ({ item, onClick }) => {
  const address = _.get(item, 'projectInfo.address') || {};
  const titleText = _.get(item, 'projectInfo.title') || '';
  const budgetText = _.get(item, 'projectInfo.budget') || 0;
  const startDateText = _.get(item, 'projectInfo.startDate');
  const description = _.get(item, 'projectInfo.description') || '';
  const addressText = address.city + ', ' + address.state;
  const descText = maxChar(description, 150);

  return (
    <Root
      key={item.id}
      onClick={() => { onClick(item.id) }}
    >
      <div>
        <Title>
          {titleText}
        </Title>
        <Description>
          {descText}
        </Description>
      </div>
      <OtherDetailsContainer>
        <OtherDetails width="100%">
          {addressText}
        </OtherDetails>
        <OtherDetails width="calc(50% - 22.5px)">
          ${budgetText}
        </OtherDetails>
        <OtherDetails width="calc(50% - 22.5px)">
          {formatDate(startDateText)}
        </OtherDetails>
      </OtherDetailsContainer>
    </Root>
  )
};

export default ProjectCardSmall;
